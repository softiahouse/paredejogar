import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const BLOCOS = [
  {
    id: 1,
    modulo: "Módulo 1 — Interrupção",
    cor: "#C0392B",
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
      { texto: 'Acredito que "desta vez vai ser diferente".', tipo: "V/F" },
      { texto: "Estou sentindo culpa por minhas apostas recentes.", tipo: "Sim/Não" },
      { texto: "Já cancelei ou adiei compromissos importantes para jogar.", tipo: "V/F" },
      { texto: "Estou apostando valores cada vez maiores para sentir a mesma emoção.", tipo: "Sim/Não" },
      { texto: "Penso no jogo mesmo quando não estou jogando.", tipo: "V/F" },
      { texto: "Já pedi dinheiro emprestado para continuar jogando.", tipo: "Sim/Não" },
      { texto: "Sinto que perdi o controle sobre minhas apostas.", tipo: "V/F" },
      { texto: "Estou ignorando sinais de alerta que reconheço.", tipo: "Sim/Não" },
      { texto: "Já tentei parar e não consegui sozinho.", tipo: "V/F" },
      { texto: 'Estou justificando o jogo como "apenas diversão" agora.', tipo: "Sim/Não" },
      { texto: "Preciso de uma pausa consciente de 15 minutos antes de qualquer ação.", tipo: "V/F" },
    ],
  },
  {
    id: 2,
    modulo: "Módulo 2 — Sensibilização",
    cor: "#D35400",
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
      { texto: 'Estou confundindo ansiedade com "sorte próxima".', tipo: "Sim/Não" },
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
    id: 3,
    modulo: "Módulo 3 — Autorregulação",
    cor: "#1A6B8A",
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
      { texto: 'Consegui "surfar" a onda do impulso sem me afogar.', tipo: "V/F" },
      { texto: "Lembrei das consequências negativas de agir por impulso.", tipo: "Sim/Não" },
      { texto: "Já validei que o impulso é temporário.", tipo: "V/F" },
      { texto: "Estou aplicando o que aprendi sobre autorregulação.", tipo: "Sim/Não" },
      { texto: "Consegui criar espaço entre o gatilho e a ação.", tipo: "V/F" },
      { texto: "Estou no controle da minha resposta, não do impulso.", tipo: "Sim/Não" },
      { texto: "Escolhi conscientemente não agir agora.", tipo: "V/F" },
    ],
  },
  {
    id: 4,
    modulo: "Módulo 4 — Organização",
    cor: "#1E7E34",
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
    id: 5,
    modulo: "Módulo 5 — Prevenção",
    cor: "#5B2C8D",
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

export default function BotaoEmergencia({ modulosLiberados = [] }) {
  const [aberto, setAberto] = useState(false);
  const [blocoAtual, setBlocoAtual] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [concluido, setConcluido] = useState(false);
  const temAcesso = modulosLiberados.length > 0;

  useEffect(() => {}, []);

  async function handleAbrir() {
    setAberto(true);
    if (!temAcesso) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: vistos } = await supabase
      .from("emergencia_blocos_vistos")
      .select("bloco_id")
      .eq("user_id", user.id);

    const idsVistos = vistos ? vistos.map((v) => v.bloco_id) : [];
    const naoVistos = BLOCOS.filter((b) => !idsVistos.includes(b.id));
    const pool = naoVistos.length > 0 ? naoVistos : BLOCOS;
    const escolhido = pool[Math.floor(Math.random() * pool.length)];
    setBlocoAtual(escolhido);
    setRespostas({});
    setConcluido(false);
  }

  async function handleConcluir() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
  }

  const totalRespondidas = Object.keys(respostas).length;
  const todasRespondidas = blocoAtual && totalRespondidas === blocoAtual.perguntas.length;

  return (
    <>
      <button
        onClick={handleAbrir}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 1000,
          background: "#C0392B",
          color: "#fff",
          border: "none",
          borderRadius: 50,
          padding: "0.75rem 1.25rem",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 700,
          fontSize: "0.88rem",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(192,57,43,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        🆘 Emergência
      </button>

      {aberto && (
        <div
          onClick={handleFechar}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              maxWidth: 560,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "2rem",
              position: "relative",
            }}
          >
            <button
              onClick={handleFechar}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                color: "#888",
              }}
            >
              ✕
            </button>

            {!temAcesso ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🆘</div>
                <h2
                  style={{
                    fontFamily: "DM Serif Display, serif",
                    fontSize: "1.3rem",
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                  }}
                >
                  Ferramenta de Emergência
                </h2>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    color: "#555",
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  Esta ferramenta de reflexão guiada está disponível para quem já iniciou o programa. Ela te
                  ajuda a atravessar momentos de crise com perguntas que ativam a consciência e criam uma pausa
                  antes da ação.
                </p>
                <div
                  style={{
                    background: "#FFF8F0",
                    border: "1px solid #FFD8A8",
                    borderRadius: 10,
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    fontSize: "0.88rem",
                    color: "#7A4500",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Disponível a partir do <strong>Módulo 1 — Interrupção</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a
                    href="/painel"
                    style={{
                      background: "#3B6D11",
                      color: "#fff",
                      padding: "0.75rem",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textAlign: "center",
                    }}
                  >
                    Começar o programa →
                  </a>
                  <p style={{ fontSize: "0.78rem", color: "#888", fontFamily: "DM Sans, sans-serif" }}>
                    Em crise agora? Ligue para o CVV: <strong>188</strong> (24h)
                  </p>
                </div>
              </div>
            ) : concluido ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
                <h2
                  style={{
                    fontFamily: "DM Serif Display, serif",
                    fontSize: "1.3rem",
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                  }}
                >
                  Reflexão concluída
                </h2>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    color: "#555",
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    marginBottom: "1.5rem",
                  }}
                >
                  Você acabou de atravessar um momento difícil com consciência. Isso é autorregulação em ação.
                  Espere 15 minutos antes de tomar qualquer decisão.
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#888",
                    fontFamily: "DM Sans, sans-serif",
                    marginBottom: "1.25rem",
                  }}
                >
                  Em crise agora? CVV: <strong>188</strong> (24h gratuito)
                </p>
                <button
                  onClick={handleFechar}
                  style={{
                    background: "#3B6D11",
                    color: "#fff",
                    border: "none",
                    padding: "0.75rem 2rem",
                    borderRadius: 8,
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                  }}
                >
                  Fechar
                </button>
              </div>
            ) : blocoAtual ? (
              <>
                <div
                  style={{
                    display: "inline-block",
                    background: `${blocoAtual.cor}15`,
                    color: blocoAtual.cor,
                    padding: "0.25rem 0.75rem",
                    borderRadius: 99,
                    fontSize: "0.72rem",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {blocoAtual.modulo}
                </div>
                <h2
                  style={{
                    fontFamily: "DM Serif Display, serif",
                    fontSize: "1.2rem",
                    color: "#1a1a1a",
                    marginBottom: "0.25rem",
                  }}
                >
                  Reflexão de emergência
                </h2>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.82rem",
                    color: "#888",
                    marginBottom: "1.5rem",
                  }}
                >
                  Responda com sinceridade. Não há respostas certas ou erradas. ({totalRespondidas}/
                  {blocoAtual.perguntas.length})
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {blocoAtual.perguntas.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#F7F5F0",
                        borderRadius: 10,
                        padding: "0.9rem 1rem",
                        border: respostas[i] ? `1px solid ${blocoAtual.cor}40` : "1px solid #E8E4DC",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.88rem",
                          color: "#333",
                          marginBottom: "0.6rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {i + 1}. {p.texto}
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {(p.tipo === "Sim/Não" ? ["Sim", "Não"] : ["Verdadeiro", "Falso"]).map((op) => (
                          <button
                            key={op}
                            onClick={() => setRespostas((r) => ({ ...r, [i]: op }))}
                            style={{
                              padding: "0.3rem 0.9rem",
                              borderRadius: 6,
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              background: respostas[i] === op ? blocoAtual.cor : "#fff",
                              color: respostas[i] === op ? "#fff" : "#555",
                              transition: "all 0.15s",
                            }}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {todasRespondidas && (
                  <button
                    onClick={handleConcluir}
                    style={{
                      width: "100%",
                      background: blocoAtual.cor,
                      color: "#fff",
                      border: "none",
                      padding: "0.9rem",
                      borderRadius: 10,
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                    }}
                  >
                    Concluir reflexão
                  </button>
                )}

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#aaa",
                    fontFamily: "DM Sans, sans-serif",
                    marginTop: "1rem",
                  }}
                >
                  CVV: 188 · SAMU: 192 (24h)
                </p>
              </>
            ) : (
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#888", textAlign: "center" }}>Carregando...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
