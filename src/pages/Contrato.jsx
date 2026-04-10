import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const clausulas = [
  "Reconheço que o jogo online pode gerar perda de controle e prejuízos financeiros, emocionais e familiares.",
  "Reconheço que tentar recuperar perdas apostando novamente costuma aprofundar o problema.",
  "Estou disposto a observar meu comportamento de jogo com honestidade.",
  "Quando sentir vontade intensa de apostar, me comprometo a fazer uma pausa mínima de 15 minutos antes de qualquer decisão.",
  "Entendo que recaídas podem ocorrer e fazem parte do processo — o importante é continuar.",
];

export default function Contrato() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nomeAssinatura, setNomeAssinatura] = useState("");
  const [aceitos, setAceitos] = useState([]);
  const [assinado, setAssinado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/entrar");
        return;
      }
      setUser(data.user);
      const primeiroNome =
        data.user.user_metadata?.full_name?.split(" ")[0] || "";
      setNomeAssinatura(primeiroNome);
    });
  }, [navigate]);

  function toggleClausula(i) {
    setAceitos((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  const tudoAceito =
    aceitos.length === clausulas.length && nomeAssinatura.trim().length >= 2;

  async function assinar() {
    if (!tudoAceito) return;
    if (!user) {
      alert("Sessão não encontrada. Faça login novamente.");
      return;
    }
    setSalvando(true);

    // 1. Salvar contrato
    const { error: erroContrato } = await supabase.from("contratos").insert({
      user_id: user.id,
      nome_assinatura: nomeAssinatura.trim(),
      clausulas_aceitas: aceitos,
    });

    if (erroContrato) {
      console.error("Erro ao salvar contrato:", erroContrato.message);
      alert("Não foi possível registrar o contrato. Tente novamente.");
      setSalvando(false);
      return;
    }

    // 2. Marcar módulo 1 como concluído
    const { error: erroProgresso } = await supabase
      .from("progresso_usuario")
      .insert({ user_id: user.id, modulo_id: 1 });

    if (erroProgresso && erroProgresso.code !== "23505") {
      // 23505 = unique violation (já tinha sido marcado antes) — ignoramos
      console.error("Erro ao salvar progresso:", erroProgresso.message);
    }

    setAssinado(true);
    setSalvando(false);
  }

  if (assinado) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F5F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={styles.cardCentral}>
          <div style={styles.iconeSucesso}>✓</div>
          <h1 style={styles.tituloSucesso}>Compromisso firmado.</h1>
          <p style={styles.textoSucesso}>
            {nomeAssinatura}, você deu um passo real hoje. Guarde esta data:{" "}
            <strong>{dataHoje}</strong>.
          </p>
          <p style={{ ...styles.textoSucesso, marginTop: "0.5rem" }}>
            O Módulo 1 está concluído. O próximo passo é o Módulo 2 — Sensibilização.
          </p>
          <button
            onClick={() => navigate("/painel")}
            style={styles.btnPrimario}
          >
            Voltar ao painel →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0" }}>
      {/* Topbar */}
      <div style={styles.topbar}>
        <button
          onClick={() => navigate("/modulo/1/aula/3")}
          style={styles.btnVoltar}
        >
          ← Aula 3
        </button>
        <span style={styles.topbarLabel}>Módulo 1 · Interrupção</span>
      </div>

      <div style={styles.container}>
        {/* Cabeçalho */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={styles.labelEtapa}>Contrato de Interrupção</span>
          <h1 style={styles.titulo}>Um compromisso consigo mesmo.</h1>
          <p style={styles.subtitulo}>
            Este não é um documento externo. É uma declaração que você faz para
            você — e que marca o início consciente da mudança.
          </p>
        </div>

        {/* Bloco introdutório */}
        <div style={styles.blocoIntro}>
          <p style={styles.introTexto}>
            Antes de assinar, leia com atenção. Interromper o ciclo do jogo
            exige mais do que informação — exige uma decisão. Esta é ela.
          </p>
        </div>

        {/* Cláusulas */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {clausulas.map((c, i) => {
            const marcado = aceitos.includes(i);
            return (
              <button
                type="button"
                key={i}
                onClick={() => toggleClausula(i)}
                style={{
                  ...styles.clausula,
                  borderColor: marcado ? "#3B6D11" : "#E8E4DC",
                  background: marcado ? "#EFF5E8" : "#fff",
                }}
              >
                <div
                  style={{
                    ...styles.check,
                    background: marcado ? "#3B6D11" : "#fff",
                    borderColor: marcado ? "#3B6D11" : "#ccc",
                  }}
                >
                  {marcado && (
                    <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>
                      ✓
                    </span>
                  )}
                </div>
                <span style={{ ...styles.clausulaTexto, color: marcado ? "#2A5009" : "#444" }}>
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        {/* Campo de nome */}
        <div style={styles.campoNome}>
          <label style={styles.labelNome}>Seu nome (como aparecerá no contrato)</label>
          <input
            type="text"
            value={nomeAssinatura}
            onChange={(e) => setNomeAssinatura(e.target.value)}
            placeholder="Digite seu nome"
            style={styles.input}
          />
        </div>

        {/* Preview do contrato */}
        {nomeAssinatura.trim().length >= 2 && (
          <div style={styles.previewContrato}>
            <p style={styles.previewTexto}>
              Eu, <strong>{nomeAssinatura}</strong>, declaro que reconheço o
              ciclo do jogo e me comprometo a interrompê-lo com consciência e
              prática.
            </p>
            <div style={styles.assinaturaLinha}>
              <span style={styles.assinaturaNome}>{nomeAssinatura}</span>
              <span style={styles.assinaturaData}>{dataHoje}</span>
            </div>
          </div>
        )}

        {/* Botão de assinar */}
        <button
          type="button"
          onClick={assinar}
          disabled={!tudoAceito || salvando}
          style={{
            ...styles.btnAssinar,
            opacity: tudoAceito && !salvando ? 1 : 0.45,
            cursor: tudoAceito && !salvando ? "pointer" : "not-allowed",
          }}
        >
          {salvando ? "Registrando..." : "Aceito iniciar o processo →"}
        </button>

        {!tudoAceito && (
          <p style={styles.avisoIncompleto}>
            Marque todos os itens e informe seu nome para assinar.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #E8E4DC",
    padding: "0.9rem 2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  btnVoltar: {
    background: "none",
    border: "none",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.85rem",
    color: "#777",
    cursor: "pointer",
    padding: 0,
  },
  topbarLabel: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.78rem",
    color: "#aaa",
  },
  container: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "2.5rem 1.5rem 5rem",
  },
  labelEtapa: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.72rem",
    color: "#3B6D11",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
    display: "block",
    marginBottom: "0.6rem",
  },
  titulo: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "2rem",
    color: "#1a1a1a",
    marginBottom: "0.75rem",
  },
  subtitulo: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "1rem",
    color: "#666",
    lineHeight: 1.65,
    maxWidth: 500,
    margin: "0 auto",
  },
  blocoIntro: {
    background: "#fff",
    border: "1px solid #E8E4DC",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
  },
  introTexto: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1rem",
    color: "#444",
    lineHeight: 1.65,
    fontStyle: "italic",
    margin: 0,
  },
  clausula: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.9rem",
    padding: "1rem 1.25rem",
    borderRadius: 10,
    border: "1px solid #E8E4DC",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
    width: "100%",
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: "2px solid #ccc",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    marginTop: 1,
  },
  clausulaTexto: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  campoNome: {
    marginBottom: "1.5rem",
  },
  labelNome: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.8rem",
    color: "#777",
    display: "block",
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    color: "#1a1a1a",
    outline: "none",
    boxSizing: "border-box",
  },
  previewContrato: {
    background: "#fff",
    border: "1px solid #C8DFB0",
    borderRadius: 12,
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  previewTexto: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1rem",
    color: "#333",
    lineHeight: 1.65,
    marginBottom: "1.25rem",
  },
  assinaturaLinha: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTop: "1px solid #E8E4DC",
    paddingTop: "0.75rem",
  },
  assinaturaNome: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1.1rem",
    color: "#1a1a1a",
    fontStyle: "italic",
  },
  assinaturaData: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.78rem",
    color: "#aaa",
  },
  btnAssinar: {
    width: "100%",
    background: "#3B6D11",
    color: "#fff",
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "0.9rem",
    borderRadius: 12,
    border: "none",
    transition: "opacity 0.2s",
    display: "block",
    marginBottom: "0.75rem",
  },
  avisoIncompleto: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.78rem",
    color: "#aaa",
    textAlign: "center",
  },
  cardCentral: {
    background: "#fff",
    borderRadius: 16,
    padding: "3rem 2rem",
    textAlign: "center",
    maxWidth: 480,
    border: "1px solid #C8DFB0",
  },
  iconeSucesso: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#3B6D11",
    color: "#fff",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },
  tituloSucesso: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1.75rem",
    color: "#1a1a1a",
    marginBottom: "0.75rem",
  },
  textoSucesso: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: 1.6,
    margin: 0,
  },
  btnPrimario: {
    background: "#3B6D11",
    color: "#fff",
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.75rem 1.5rem",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    marginTop: "1.75rem",
    display: "inline-block",
  },
};
