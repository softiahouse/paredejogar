import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type MpWebhookBody = {
  action?: string;
  type?: string;
  data?: { id?: string };
  api_version?: string;
};

async function fetchPayment(
  paymentId: string,
  accessToken: string,
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return res.json().catch(() => ({}));
}

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
    console.error("webhook-mp: MP_ACCESS_TOKEN ausente");
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: MpWebhookBody;
  try {
    const text = await req.text();
    body = text ? (JSON.parse(text) as MpWebhookBody) : {};
  } catch {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const topic =
    body.type ??
    new URL(req.url).searchParams.get("topic") ??
    new URL(req.url).searchParams.get("type");
  const resourceId =
    body.data?.id ??
    new URL(req.url).searchParams.get("id") ??
    new URL(req.url).searchParams.get("data.id");

  console.log("webhook-mp:", { topic, action: body.action, resourceId });

  if (
    (topic === "payment" || body.type === "payment") &&
    resourceId &&
    String(resourceId).length > 0
  ) {
    const payment = await fetchPayment(String(resourceId), accessToken);
    const status = payment.status;
    const extRef = payment.external_reference;
    console.log("webhook-mp payment:", {
      id: resourceId,
      status,
      external_reference: extRef,
    });

    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (serviceKey && extRef && typeof extRef === "string") {
      try {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          serviceKey,
        );
        const { error } = await supabase.from("pagamentos_mp").upsert(
          {
            mp_payment_id: String(resourceId),
            user_id: extRef,
            status: status ?? "unknown",
            raw: payment,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "mp_payment_id" },
        );
        if (error) {
          console.error("webhook-mp pagamentos_mp:", error.message);
        }
      } catch (e) {
        console.error("webhook-mp persistência:", e);
      }
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
