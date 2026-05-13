import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MP_API = "https://api.mercadopago.com/checkout/preferences";

// URLs canonicas — o servidor e a fonte da verdade. Nunca confia no cliente.
const SITE_URL =
  Deno.env.get("SITE_URL")?.replace(/\/$/, "") ??
  "https://www.paredejogar.com";
const WEBHOOK_URL =
  Deno.env.get("MP_WEBHOOK_URL") ??
  "https://gybzuhopxhlbewhjihnd.supabase.co/functions/v1/webhook-mp";

// Catalogo oficial de precos. O cliente nao pode passar precos arbitrarios.
const PRECOS_OFICIAIS: Record<
  number,
  { titulo: string; preco: number }
> = {
  1: { titulo: "Modulo 1 — Interrupcao", preco: 29.9 },
  2: { titulo: "Modulo 2 — Sensibilizacao", preco: 49.9 },
  3: { titulo: "Modulo 3 — Autorregulacao", preco: 89.9 },
  4: { titulo: "Modulo 4 — Reorganizacao", preco: 149.9 },
  5: { titulo: "Modulo 5 — Manutencao", preco: 199.9 },
};

type Body = {
  modulo_id?: number;
  // Mantido por compatibilidade — se vier sem modulo_id, tenta extrair daqui.
  external_reference?: string;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const accessToken = Deno.env.get("MP_ACCESS_TOKEN");
  if (!accessToken) {
    return new Response(
      JSON.stringify({ error: "MP_ACCESS_TOKEN nao configurado" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Nao autorizado" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const jwt = authHeader.replace("Bearer ", "");

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(jwt);

  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Sessao invalida" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: "JSON invalido" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Determina o modulo: prioriza modulo_id explicito; fallback no external_reference legado.
  const moduloId = (() => {
    if (typeof body.modulo_id === "number") return body.modulo_id;
    const m = body.external_reference?.match(/_modulo_(\d+)$/);
    return m ? parseInt(m[1], 10) : NaN;
  })();

  if (!PRECOS_OFICIAIS[moduloId]) {
    return new Response(
      JSON.stringify({ error: "Modulo invalido" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // GATE DE SEQUENCIA SERVER-SIDE.
  // Para comprar M(n) e preciso ter PAGADO e CONCLUIDO M(n-1).
  // M1 e o ponto de entrada (sem pre-requisito).
  if (moduloId > 1) {
    const anteriorId = moduloId - 1;

    const [
      { data: pagoAnterior },
      { data: concluidoAnterior },
    ] = await Promise.all([
      supabase
        .from("modulos_liberados")
        .select("modulo_id")
        .eq("user_id", user.id)
        .eq("modulo_id", anteriorId)
        .maybeSingle(),
      supabase
        .from("progresso_usuario")
        .select("modulo_id")
        .eq("user_id", user.id)
        .eq("modulo_id", anteriorId)
        .maybeSingle(),
    ]);

    if (!pagoAnterior) {
      return new Response(
        JSON.stringify({
          error: `Voce precisa comprar o Modulo ${anteriorId} antes do Modulo ${moduloId}.`,
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!concluidoAnterior) {
      return new Response(
        JSON.stringify({
          error: `Voce precisa concluir o Modulo ${anteriorId} antes de comprar o Modulo ${moduloId}.`,
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  }

  // Evita compra duplicada do mesmo modulo.
  const { data: jaPago } = await supabase
    .from("modulos_liberados")
    .select("modulo_id")
    .eq("user_id", user.id)
    .eq("modulo_id", moduloId)
    .maybeSingle();

  if (jaPago) {
    return new Response(
      JSON.stringify({
        error: `Voce ja tem acesso ao Modulo ${moduloId}.`,
      }),
      {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const { titulo, preco } = PRECOS_OFICIAIS[moduloId];

  // Payload sob controle do servidor. Cliente nao decide preco nem URLs.
  const payload = {
    items: [
      {
        title: titulo,
        quantity: 1,
        unit_price: preco,
        currency_id: "BRL",
      },
    ],
    external_reference: `user_${user.id}_modulo_${moduloId}`,
    metadata: { supabase_user_id: user.id, modulo_id: moduloId },
    back_urls: {
      success: `${SITE_URL}/painel?pagamento=sucesso&modulo=${moduloId}`,
      failure: `${SITE_URL}/painel?pagamento=falha&modulo=${moduloId}`,
      pending: `${SITE_URL}/painel?pagamento=pendente&modulo=${moduloId}`,
    },
    auto_return: "approved",
    notification_url: WEBHOOK_URL,
  };

  const mpRes = await fetch(MP_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const mpData = await mpRes.json().catch(() => ({}));

  if (!mpRes.ok) {
    console.error("Mercado Pago preferences error:", mpRes.status, mpData);
    return new Response(
      JSON.stringify({
        error: "Falha ao criar preferencia",
        details: mpData,
      }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  return new Response(
    JSON.stringify({
      id: mpData.id,
      init_point: mpData.init_point,
      sandbox_init_point: mpData.sandbox_init_point,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
