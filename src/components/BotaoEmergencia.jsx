import { useState, useEffect, useRef } from "react";
import { LEGENDA_CURVA, LEGENDA_RESPIRACAO } from "../data/emergenciaLegendas";
import { supabase } from "../lib/supabaseClient";

const BLOCOS = [
  {
    id: 1, modulo: "Módulo 1 — Interrupção", cor: "#C0392B",
    perguntas: [
      { texto: "Estou sentindo um impulso forte agora mesmo.", tipo: "Sim/Não" },
      { texto: "Já tentei recuperar perdas apostando mais nas últimas 24 horas.", tipo: "V/F" },
      { texto: "Estou apostando escondido de alguém importante para mim.", tipo: "Sim/Não" },
      { texto: "Sinto que o jogo está controlando minhas decisões hoje.", tipo: "V/F" },
      { texto: "Já usei dinheiro que precisava para outras coisas essenciais.", tipo: "Sim/Não" },
      { texto: "Estou tentando provar algo para mim mesmo ou para outros através do jogo.", tipo: "V/F" },
      { texto: "Sinto ansiedade quando penso em não apostar agora.", tipo: "Sim/Não" },
      { texto: "Já menti sobre quanto tempo ou dinheiro gastei jogando.", tipo: "V/F" },
      { texto: "Estou jogando para fugir de um problema ou emoção difícil.", tipo: "Sim/Não" },
      { texto: "Acredito que \"desta vez vai ser diferente\".", tipo: "V/F" },
      { texto: "Estou sentindo culpa por minhas apostas recentes.", tipo: "Sim/Não" },
      { texto: "Já cancelei ou adiei compromissos importantes para jogar.", tipo: "V/F" },
      { texto: "Estou apostando valores cada vez maiores para sentir a mesma emoção.", tipo: "Sim/Não" },
      { texto: "Penso no jogo mesmo quando não estou jogando.", tipo: "V/F" },
      { texto: "Já pedi dinheiro emprestado para continuar jogando.", tipo: "Sim/Não" },
      { texto: "Sinto que perdi o controle sobre minhas apostas.", tipo: "V/F" },
      { texto: "Estou ignorando sinais de alerta que reconheço.", tipo: "Sim/Não" },
      { texto: "Já tentei parar e não consegui sozinho.", tipo: "V/F" },
      { texto: "Estou justificando o jogo como \"apenas diversão\" agora.", tipo: "Sim/Não" },
      { texto: "Preciso de uma pausa consciente de 15 minutos antes de qualquer ação.", tipo: "V/F" },
    ],
  },
  {
    id: 2, modulo: "Módulo 2 — Sensibilização", cor: "#D35400",
    perguntas: [
      { texto: "Consigo identificar qual emoção estou sentindo agora.", tipo: "Sim/Não" },
      { texto: "Estou apostando porque estou entediado.", tipo: "V/F" },
      { texto: "Estou apostando porque estou estressado.", tipo: "Sim/Não" },
      { texto: "Estou apostando porque me sinto sozinho.", tipo: "V/F" },
      { texto: "Estou apostando porque estou comemorando algo.", tipo: "Sim/Não" },
      { texto: "Estou apostando porque estou frustrado com algo.", tipo: "V/F" },
      { texto: "Recebi algum gatilho externo (propaganda, notificação) nos últimos 30 minutos.", tipo: "Sim/Não" },
      { texto: "Estou tentando aliviar uma tensão emocional através do jogo.", tipo: "V/F" },
      { texto: "Já identifiquei meus principais gatilhos emocionais.", tipo: "Sim/Não" },
      { texto: "Estou apostando para evitar pensar em algo difícil.", tipo: "V/F" },
      { texto: "Consigo nomear o que estou sentindo sem julgar.", tipo: "Sim/Não" },
      { texto: "Estou confundindo tédio com necessidade de jogar.", tipo: "V/F" },
      { texto: "Estou confundindo ansiedade com \"sorte próxima\".", tipo: "Sim/Não" },
      { texto: "Já mapeei quais horários do dia sou mais vulnerável.", tipo: "V/F" },
      { texto: "Estou apostando porque vi alguém falando sobre isso.", tipo: "Sim/Não" },
      { texto: "Reconheço que estou no pico da curva do impulso agora.", tipo: "V/F" },
      { texto: "Estou tentando preencher um vazio emocional com o jogo.", tipo: "Sim/Não" },
      { texto: "Já identifiquei padrões repetitivos no meu comportamento.", tipo: "V/F" },
      { texto: "Estou consciente de que o impulso vai passar naturalmente.", tipo: "Sim/Não" },
      { texto: "Preciso registrar este momento no meu Mapa de Gatilhos.", tipo: "V/F" },
    ],
  },
  {
    id: 3, modulo: "Módulo 3 — Autorregulação", cor: "#1A6B8A",
    perguntas: [
      { texto: "Já se passaram 15 minutos desde que senti o impulso?", tipo: "Sim/Não" },
      { texto: "Respirei profundamente 3 vezes antes de decidir.", tipo: "V/F" },
      { texto: "Consegui observar o impulso sem agir imediatamente.", tipo: "Sim/Não" },
      { texto: "Lembrei que o impulso tem pico e depois diminui.", tipo: "V/F" },
      { texto: "Usei alguma técnica de distração nos últimos 10 minutos.", tipo: "Sim/Não" },
      { texto: "Conversei com alguém sobre o que estou sentindo.", tipo: "V/F" },
      { texto: "Já tomei decisões diferentes em momentos semelhantes antes.", tipo: "Sim/Não" },
      { texto: "Sei que posso escolher não agir mesmo sentindo o impulso.", tipo: "V/F" },
      { texto: "Já pratiquei a pausa consciente hoje.", tipo: "Sim/Não" },
      { texto: "Consegui identificar a diferença entre impulso e decisão.", tipo: "V/F" },
      { texto: "Já usei o Contrato de Interrupção antes.", tipo: "Sim/Não" },
      { texto: "Estou disposto a esperar mais 15 minutos antes de decidir.", tipo: "V/F" },
      { texto: "Já fiz algo prático para me distrair (caminhar, ler, ligar).", tipo: "Sim/Não" },
      { texto: "Consegui \"surfar\" a onda do impulso sem me afogar.", tipo: "V/F" },
      { texto: "Lembrei das consequências negativas de agir por impulso.", tipo: "Sim/Não" },
      { texto: "Já validei que o impulso é temporário.", tipo: "V/F" },
      { texto: "Estou aplicando o que aprendi sobre autorregulação.", tipo: "Sim/Não" },
      { texto: "Consegui criar espaço entre o gatilho e a ação.", tipo: "V/F" },
      { texto: "Estou no controle da minha resposta, não do impulso.", tipo: "Sim/Não" },
      { texto: "Escolhi conscientemente não agir agora.", tipo: "V/F" },
    ],
  },
  {
    id: 4, modulo: "Módulo 4 — Organização", cor: "#1E7E34",
    perguntas: [
      { texto: "Tenho uma rotina estruturada hoje.", tipo: "Sim/Não" },
      { texto: "Já reservei tempo para atividades saudáveis hoje.", tipo: "V/F" },
      { texto: "Conversei com minha família sobre algo importante hoje.", tipo: "Sim/Não" },
      { texto: "Já cuidei das minhas finanças esta semana.", tipo: "V/F" },
      { texto: "Tenho metas claras que não envolvem jogo.", tipo: "Sim/Não" },
      { texto: "Já identifiquei atividades substitutas para fazer agora.", tipo: "V/F" },
      { texto: "Estou priorizando o que realmente importa para mim.", tipo: "Sim/Não" },
      { texto: "Já reorganizei meu ambiente para reduzir gatilhos.", tipo: "V/F" },
      { texto: "Tenho hábitos saudáveis estabelecidos.", tipo: "Sim/Não" },
      { texto: "Já planejei meu dia de forma consciente.", tipo: "V/F" },
      { texto: "Estou investindo tempo em reconstruir minha vida.", tipo: "Sim/Não" },
      { texto: "Já eliminei ou reduzi estímulos digitais que me prejudicam.", tipo: "V/F" },
      { texto: "Tenho pessoas de apoio na minha rotina.", tipo: "Sim/Não" },
      { texto: "Já estabeleci limites claros para mim mesmo.", tipo: "V/F" },
      { texto: "Estou reconstruindo minha relação com o tempo.", tipo: "Sim/Não" },
      { texto: "Já identifiquei o que realmente me traz satisfação.", tipo: "V/F" },
      { texto: "Estou organizando minhas prioridades de vida.", tipo: "Sim/Não" },
      { texto: "Já criei barreiras práticas contra o impulso.", tipo: "V/F" },
      { texto: "Tenho clareza sobre o que quero construir.", tipo: "Sim/Não" },
      { texto: "Estou substituindo padrões antigos por novos hábitos.", tipo: "V/F" },
    ],
  },
  {
    id: 5, modulo: "Módulo 5 — Prevenção", cor: "#5B2C8D",
    perguntas: [
      { texto: "Já identifiquei situações de alto risco para mim.", tipo: "Sim/Não" },
      { texto: "Tenho estratégias de enfrentamento definidas.", tipo: "V/F" },
      { texto: "Já reconheci meus sinais de alerta precoces.", tipo: "Sim/Não" },
      { texto: "Tenho um plano de ação para momentos de crise.", tipo: "V/F" },
      { texto: "Já construí sistemas de proteção ao meu redor.", tipo: "Sim/Não" },
      { texto: "Estou monitorando meu comportamento regularmente.", tipo: "V/F" },
      { texto: "Já fortaleci minha rede de apoio.", tipo: "Sim/Não" },
      { texto: "Tenho clareza sobre meus fatores de proteção.", tipo: "V/F" },
      { texto: "Já pratiquei estratégias de manutenção esta semana.", tipo: "Sim/Não" },
      { texto: "Estou consolidando minhas conquistas.", tipo: "V/F" },
      { texto: "Já aprendi com minhas experiências passadas.", tipo: "Sim/Não" },
      { texto: "Tenho autoeficácia para lidar com desafios.", tipo: "V/F" },
      { texto: "Já identifiquei o que me mantém estável.", tipo: "Sim/Não" },
      { texto: "Estou prevenindo recaídas de forma proativa.", tipo: "V/F" },
      { texto: "Já estabeleci limites saudáveis.", tipo: "Sim/Não" },
      { texto: "Tenho consciência de que a mudança é um processo.", tipo: "V/F" },
      { texto: "Já celebrei minhas vitórias recentes.", tipo: "Sim/Não" },
      { texto: "Estou fortalecendo minha capacidade de escolha.", tipo: "V/F" },
      { texto: "Já integrei o aprendizado em minha vida.", tipo: "Sim/Não" },
      { texto: "Estou comprometido com minha recuperação contínua.", tipo: "V/F" },
    ],
  },
];


const fonte = "DM Sans, sans-serif";
const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/* Áudio com legenda sincronizada */
function AudioLegendado({ src, legenda, cor = "#1E4D2B" }) {
  const ref = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    // Tenta iniciar sozinho (o toque no botão de emergência conta como interação).
    a.play().catch(() => {});
    return () => a.pause();
  }, [src]);

  const atual = legenda.find(([ini, fimC]) => tempo >= ini - 0.15 && tempo <= fimC + 0.6);
  const alternar = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  };

  return (
    <div style={{ background: "#F3F7EF", border: "1px solid #DCE7D2", borderRadius: 18, padding: "0.9rem 1rem", marginTop: "0.9rem" }}>
      <audio
        ref={ref}
        src={src}
        preload="auto"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onEnded={() => setTocando(false)}
        onTimeUpdate={(e) => setTempo(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={alternar}
          aria-label={tocando ? "Pausar áudio" : "Ouvir áudio"}
          style={{ flex: "none", width: 46, height: 46, borderRadius: "50%", border: "none", background: cor, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}
        >
          {tocando ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.5" /><rect x="14" y="4" width="4" height="16" rx="1.5" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={duracao || 0}
          step={0.1}
          value={tempo}
          onChange={(e) => { if (ref.current) ref.current.currentTime = Number(e.target.value); }}
          aria-label="Posição do áudio"
          style={{ flex: 1, accentColor: cor }}
        />
        <span style={{ fontFamily: fonte, fontSize: "0.78rem", color: "#5F6B62", minWidth: 74, textAlign: "right" }}>
          {fmt(tempo)} / {fmt(duracao)}
        </span>
      </div>
      <p
        aria-live="polite"
        style={{ fontFamily: fonte, fontSize: "1.02rem", fontWeight: 600, color: "#15261C", lineHeight: 1.45, textAlign: "center", minHeight: "3.2em", margin: "0.8rem 0 0.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {atual ? atual[2] : tocando ? "" : "Toque no play para ouvir."}
      </p>
    </div>
  );
}

/* Círculo de respiração 4-6-2 */
function CirculoRespiracao() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const ini = Date.now();
    const id = setInterval(() => setT(((Date.now() - ini) / 1000) % 12), 100);
    return () => clearInterval(id);
  }, []);
  let fase, escala, seg;
  if (t < 4) { fase = "Inspire pelo nariz"; escala = 0.55 + 0.45 * (t / 4); seg = Math.ceil(t + 0.001); }
  else if (t < 10) { fase = "Segure"; escala = 1; seg = Math.ceil(t - 4 + 0.001); }
  else { fase = "Solte pela boca"; escala = 1 - 0.45 * ((t - 10) / 2); seg = Math.ceil(t - 10 + 0.001); }
  return (
    <div style={{ display: "grid", placeItems: "center", padding: "0.5rem 0 0.25rem" }}>
      <div style={{ position: "relative", width: 210, height: 210, display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px dashed #BFD9C5" }} />
        <div style={{
          width: 210, height: 210, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #CFE8BC, #7FB86A 55%, #3B6D11)",
          transform: `scale(${escala})`, transition: "transform 0.1s linear",
          boxShadow: "0 18px 40px -18px rgba(30,77,43,.6)",
        }} />
        <div style={{ position: "absolute", textAlign: "center", color: "#fff", fontFamily: fonte, textShadow: "0 1px 6px rgba(0,0,0,.25)" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1 }}>{seg}</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, marginTop: 4 }}>{fase}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", fontFamily: fonte, fontSize: "0.78rem", fontWeight: 700 }}>
        {[["4s", "Inspire", t < 4], ["6s", "Segure", t >= 4 && t < 10], ["2s", "Solte", t >= 10]].map(([d, n, on]) => (
          <span key={n} style={{ padding: "0.3rem 0.7rem", borderRadius: 99, background: on ? "#1E4D2B" : "#EEF3EA", color: on ? "#fff" : "#5F6B62" }}>{n} {d}</span>
        ))}
      </div>
    </div>
  );
}

const ETAPAS = [
  { id: "curva", titulo: "A curva do impulso" },
  { id: "respiracao", titulo: "Respiração guiada" },
  { id: "questionario", titulo: "Reflexão" },
];

function Etapas({ atual }) {
  const idx = ETAPAS.findIndex((e) => e.id === atual);
  return (
    <div style={{ marginBottom: "1rem", paddingRight: "2rem" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: "0.6rem" }}>
        {ETAPAS.map((e, i) => (
          <span key={e.id} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= idx ? "#3B6D11" : "#E3E8DF" }} />
        ))}
      </div>
      <p style={{ fontFamily: fonte, fontSize: "0.78rem", color: "#6F7D73", margin: 0 }}>
        Etapa {idx + 1} de {ETAPAS.length}
      </p>
      <h2 style={{ fontFamily: fonte, fontWeight: 800, fontSize: "1.35rem", color: "#15261C", margin: "0.1rem 0 0" }}>
        {ETAPAS[idx].titulo}
      </h2>
    </div>
  );
}

const btnPrincipal = { width: "100%", background: "#1E4D2B", color: "#fff", border: "none", padding: "0.95rem", borderRadius: 999, fontFamily: fonte, fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginTop: "1rem" };

export default function BotaoEmergencia({ modulosLiberados = [], inline = false }) {
  const [modulosState, setModulosState] = useState(modulosLiberados || []);
  const temModulo = modulosState && modulosState.length > 0;
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState("curva");
  const [blocoAtual, setBlocoAtual] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [concluido, setConcluido] = useState(false);
  const caixaRef = useRef(null);

  useEffect(() => {
    async function carregarModulos() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Programa gratuito: todo usuário logado tem o Módulo 1.
      setModulosState([1]);
    }
    if (!modulosLiberados || modulosLiberados.length === 0) {
      carregarModulos();
    }
  }, []);

  useEffect(() => {
    if (caixaRef.current) caixaRef.current.scrollTop = 0;
  }, [etapa, concluido]);

  async function handleAbrir() {
    setAberto(true);
    setEtapa("curva");
    setRespostas({});
    setConcluido(false);
    if (!temModulo) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: vistos } = await supabase
      .from("emergencia_blocos_vistos")
      .select("bloco_id")
      .eq("user_id", user.id);
    const idsVistos = vistos ? vistos.map(v => v.bloco_id) : [];
    const naoVistos = BLOCOS.filter(b => !idsVistos.includes(b.id));
    const pool = naoVistos.length > 0 ? naoVistos : BLOCOS;
    const escolhido = pool[Math.floor(Math.random() * pool.length)];
    setBlocoAtual(escolhido);
  }

  async function handleConcluir() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !blocoAtual) return;
    await supabase.from("emergencia_blocos_vistos").upsert(
      { user_id: user.id, bloco_id: blocoAtual.id, visto_em: new Date().toISOString() },
      { onConflict: "user_id,bloco_id" }
    );
    setConcluido(true);
  }

  function handleFechar() {
    setAberto(false);
    setBlocoAtual(null);
    setRespostas({});
    setConcluido(false);
    setEtapa("curva");
  }

  const totalRespondidas = Object.keys(respostas).length;
  const todasRespondidas = blocoAtual && totalRespondidas === blocoAtual.perguntas.length;

  return (
    <>
      {/* BOTÃO FLUTUANTE — aparece sempre no canto direito */}
      {!inline && (
        <div
          style={{
            position: "fixed",
            right: "1.25rem",
            bottom: "1.75rem",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <button
            onClick={handleAbrir}
            title="Botão de Emergência"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #e74c3c, #922b21)",
              border: "3px solid rgba(255,255,255,0.3)",
              boxShadow: "0 0 0 0 rgba(231,76,60,0.7)",
              animation: "pulseHeart 1.4s ease-in-out infinite",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5 L90 20 L90 55 C90 78 72 96 50 105 C28 96 10 78 10 55 L10 20 Z" fill="none" stroke="url(#g)" strokeWidth="6" strokeLinejoin="round"/>
              <rect x="38" y="30" width="9" height="45" rx="4" fill="url(#g)"/>
              <rect x="53" y="30" width="9" height="45" rx="4" fill="url(#g)"/>
              <defs>
                <linearGradient id="g" x1="10" y1="5" x2="90" y2="105" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8"/>
                  <stop offset="100%" stopColor="#34d399"/>
                </linearGradient>
              </defs>
            </svg>
          </button>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#922b21", letterSpacing: "0.05em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.2 }}>
            Emergência
          </span>
        </div>
      )}

      {/* MODAL — fluxo em 3 etapas */}
      {aberto && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(12,28,18,0.55)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div ref={caixaRef} role="dialog" aria-modal="true" aria-label="Botão de emergência" style={{ background: "#fff", borderRadius: 24, padding: "1.5rem 1.25rem", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={handleFechar} aria-label="Fechar" style={{ position: "absolute", top: "0.9rem", right: "0.9rem", width: 34, height: 34, borderRadius: "50%", background: "#F0F2EE", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#555", lineHeight: 1 }}>×</button>

            {concluido ? (
                  <div style={{ padding: "0.5rem 0" }}>
                    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                      <h2 style={{ fontFamily: "DM Serif Display, serif", fontSize: "1.2rem", color: "#1a1a1a", marginBottom: "0.4rem" }}>
                        Você observou o impulso sem agir.
                      </h2>
                      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", color: "#555", lineHeight: 1.6 }}>
                        Isso é Interrupção. O ciclo automático perdeu força.
                      </p>
                    </div>
                    <div style={{ background: "#F0F7FF", border: "1px solid #BFD9F5", borderRadius: 14, padding: "1.25rem", marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A6B8A", marginBottom: "1rem" }}>
                        Respiração regulada — ativando o freio natural do corpo
                      </p>
                      {[
                        { num: "1️⃣", titulo: "PREPARE-SE", itens: ["Sente-se confortavelmente ou fique em pé com os pés no chão", "Coloque uma mão no peito e outra na barriga", "Feche os olhos ou mantenha o olhar suave em um ponto fixo"] },
                        { num: "2️⃣", titulo: "INSPIRE PELO NARIZ (4 segundos)", itens: ["Conte mentalmente: 1... 2... 3... 4", "Sinta a barriga expandir (não só o peito)", "Imagine que está enchendo um balão suave dentro de você"] },
                        { num: "3️⃣", titulo: "SEGURE LEVEMENTE (6 segundos)", itens: ["Conte: 1... 2... 3... 4... 5... 6", "Não force — apenas pause naturalmente", "Observe a sensação de plenitude"] },
                        { num: "4️⃣", titulo: "EXPIRE PELA BOCA (2 segundos)", itens: ["Solte o ar suavemente, como se estivesse assoprando uma vela sem apagar", "Conte: 1... 2", "Sinta a barriga voltar ao lugar"] },
                        { num: "🔁", titulo: "REPITA 5 a 10 CICLOS", itens: ["Tempo total: 2 a 3 minutos", "Se distrair, volte gentilmente para a contagem"] },
                      ].map((passo, i) => (
                        <div key={i} style={{ marginBottom: "0.9rem" }}>
                          <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1A6B8A", marginBottom: "0.3rem" }}>
                            {passo.num} {passo.titulo}
                          </p>
                          {passo.itens.map((item, j) => (
                            <p key={j} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55, paddingLeft: "1.2rem", margin: "0.15rem 0" }}>• {item}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                    {[
                      { texto: "O impulso tem pico... e depois passa.\nVocê não precisa fazer nada agora.\nSó respirar.", bg: "#F5F0FF", border: "#D4C5F5", cor: "#4A2D8D" },
                      { texto: "Seu \"freio natural\" foi ativado.\nO nervo vago respondeu.\nSeu corpo está mais calmo.\nSua mente, mais clara.", bg: "#F0FFF4", border: "#C3E6CB", cor: "#1E5C2E" },
                    ].map((msg, i) => (
                      <div key={i} style={{ background: msg.bg, border: `1px solid ${msg.border}`, borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "0.75rem", fontFamily: "DM Serif Display, serif", fontSize: "0.95rem", color: msg.cor, lineHeight: 1.7, whiteSpace: "pre-line", textAlign: "center" }}>
                        {msg.texto}
                      </div>
                    ))}
                    <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#aaa", fontFamily: "DM Sans, sans-serif", marginBottom: "1rem" }}>
                      Em crise? CVV: <strong>188</strong> · SAMU: <strong>192</strong>
                    </p>
                    <button onClick={handleFechar} style={{ width: "100%", background: "#3B6D11", color: "#fff", border: "none", padding: "0.9rem", borderRadius: 10, fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
                      Fechar
                    </button>
                  </div>
            ) : etapa === "curva" ? (
              <>
                <Etapas atual="curva" />
                <a href="/imagens/curva-do-impulso-hd.jpg" target="_blank" rel="noopener noreferrer" title="Abrir imagem ampliada"><img src="/imagens/curva-do-impulso-hd.jpg" alt="Gráfico da curva do impulso: ativação, aumento, pico e declínio natural ao longo dos minutos" style={{ width: "100%", borderRadius: 14, display: "block" }} /></a>
                <p style={{ fontFamily: fonte, fontSize: "0.75rem", color: "#6F7D73", textAlign: "center", margin: "0.4rem 0 0" }}>Toque na imagem para ampliar</p>
                <AudioLegendado key="a1" src="/audios/curva-do-impulso.m4a" legenda={LEGENDA_CURVA} />
                <button type="button" onClick={() => setEtapa("respiracao")} style={btnPrincipal}>
                  Continuar para a respiração
                </button>
              </>
            ) : etapa === "respiracao" ? (
              <>
                <Etapas atual="respiracao" />
                <CirculoRespiracao />
                <AudioLegendado key="a2" src="/audios/respiracao-guiada.m4a" legenda={LEGENDA_RESPIRACAO} />
                <details style={{ marginTop: "0.9rem", fontFamily: fonte }}>
                  <summary style={{ cursor: "pointer", fontWeight: 700, color: "#3B6D11", fontSize: "0.9rem" }}>Ver o guia escrito</summary>
                  <div style={{ fontSize: "0.85rem", color: "#333", lineHeight: 1.6, marginTop: "0.6rem" }}>
                    <p style={{ margin: "0 0 0.5rem" }}>A técnica de respiração 4-6-2 é uma ferramenta fisiológica baseada em evidências científicas que ativa o sistema nervoso parassimpático através da estimulação do nervo vago, promovendo redução imediata da ativação fisiológica associada ao impulso de jogar.</p>
                    <p style={{ margin: "0 0 0.3rem" }}><strong>Fase 1, inspiração (4 segundos):</strong> inspire lentamente pelo nariz contando 1... 2... 3... 4. A barriga deve expandir.</p>
                    <p style={{ margin: "0 0 0.3rem" }}><strong>Fase 2, retenção (6 segundos):</strong> segure o ar suavemente contando 1... 2... 3... 4... 5... 6. Não force.</p>
                    <p style={{ margin: "0 0 0.5rem" }}><strong>Fase 3, expiração (2 segundos):</strong> solte o ar pela boca contando 1... 2. Sinta a barriga voltando ao lugar.</p>
                    <p style={{ margin: 0 }}><strong>Quando usar:</strong> no momento do impulso; antes de situações de risco; após uma recaída, para retomar o controle sem autocrítica; e na prevenção diária.</p>
                  </div>
                </details>
                <button type="button" onClick={() => setEtapa("questionario")} style={btnPrincipal}>
                  Continuar para a reflexão
                </button>
                <button type="button" onClick={() => setEtapa("curva")} style={{ display: "block", margin: "0.6rem auto 0", background: "none", border: "none", color: "#6F7D73", fontFamily: fonte, fontSize: "0.85rem", cursor: "pointer" }}>
                  Voltar
                </button>
              </>
            ) : temModulo && blocoAtual ? (
              <>
                <Etapas atual="questionario" />
                    <div style={{ display: "inline-block", background: blocoAtual.cor + "15", color: blocoAtual.cor, padding: "0.25rem 0.75rem", borderRadius: 99, fontSize: "0.72rem", fontFamily: "DM Sans, sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {blocoAtual.modulo}
                    </div>
                    <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "#888", marginBottom: "1.5rem" }}>
                      Responda com sinceridade. Não há respostas certas ou erradas. ({totalRespondidas}/{blocoAtual.perguntas.length})
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                      {blocoAtual.perguntas.map((p, i) => (
                        <div key={i} style={{ background: "#F7F5F0", borderRadius: 10, padding: "0.9rem 1rem", border: respostas[i] ? `1px solid ${blocoAtual.cor}40` : "1px solid #E8E4DC" }}>
                          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem", color: "#333", marginBottom: "0.6rem", lineHeight: 1.5 }}>
                            {i + 1}. {p.texto}
                          </p>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            {(p.tipo === "Sim/Não" ? ["Sim", "Não"] : ["Verdadeiro", "Falso"]).map(op => (
                              <button key={op} onClick={() => setRespostas(r => ({ ...r, [i]: op }))} style={{
                                padding: "0.3rem 0.9rem", borderRadius: 6, border: "none", cursor: "pointer",
                                fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600,
                                background: respostas[i] === op ? blocoAtual.cor : "#fff",
                                color: respostas[i] === op ? "#fff" : "#555",
                              }}>
                                {op}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {todasRespondidas && (
                      <button onClick={handleConcluir} style={{ width: "100%", background: blocoAtual.cor, color: "#fff", border: "none", padding: "0.9rem", borderRadius: 10, fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
                        Concluir reflexão
                      </button>
                    )}
                    <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#aaa", fontFamily: "DM Sans, sans-serif", marginTop: "1rem" }}>
                      CVV: 188 · SAMU: 192 (24h)
                    </p>
              </>
            ) : temModulo ? (
              <p style={{ fontFamily: fonte, color: "#888", textAlign: "center" }}>Carregando...</p>
            ) : (
              <>
                <Etapas atual="questionario" />
                <div style={{ background: "#F7F5F0", borderRadius: 16, padding: "1.1rem 1.2rem", fontFamily: fonte }}>
                  <p style={{ fontWeight: 700, color: "#3B6D11", margin: "0 0 0.6rem" }}>Responda para você mesmo, com honestidade:</p>
                  {["O que aconteceu antes dessa vontade aparecer?", "O que você vai sentir se jogar agora?", "O que você vai sentir se resistir?"].map((q) => (
                    <p key={q} style={{ color: "#444", margin: "0 0 0.45rem", fontSize: "0.95rem" }}>{q}</p>
                  ))}
                </div>
                <p style={{ fontFamily: fonte, color: "#555", fontSize: "0.9rem", lineHeight: 1.6, margin: "1rem 0 0" }}>
                  Crie sua conta grátis para responder a reflexão completa, com perguntas que mudam a cada uso, e acompanhar seu progresso no programa.
                </p>
                <a href="/cadastrar" style={{ ...btnPrincipal, display: "block", textAlign: "center", textDecoration: "none" }}>
                  Criar conta grátis
                </a>
                <button type="button" onClick={handleFechar} style={{ display: "block", margin: "0.6rem auto 0", background: "none", border: "none", color: "#6F7D73", fontFamily: fonte, fontSize: "0.85rem", cursor: "pointer" }}>
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Animação pulso coração */}
      <style>{`
        @keyframes pulseHeart {
          0% { box-shadow: 0 0 0 0 rgba(231,76,60,0.7); transform: scale(1); }
          50% { box-shadow: 0 0 0 14px rgba(231,76,60,0); transform: scale(1.08); }
          100% { box-shadow: 0 0 0 0 rgba(231,76,60,0); transform: scale(1); }
        }
      `}</style>
    </>
  );
}
