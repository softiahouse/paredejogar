// src/pages/Contrato.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const itensContrato = [
  "Reconheço que o jogo online pode gerar perda de controle e prejuízos financeiros, emocionais e familiares.",
  "Reconheço que tentar recuperar perdas apostando novamente costuma aprofundar o problema.",
  "Reconheço que interromper o ciclo exige consciência, prática e apoio.",
  "Estou disposto a observar meu comportamento de jogo com honestidade.",
  "Estou disposto a aprender novas estratégias para recuperar o controle.",
  "Estou disposto a interromper o impulso de apostar quando perceber sinais de risco.",
  "Estou disposto a utilizar as ferramentas do programa para apoiar minha mudança.",
  "Quando sentir vontade intensa de apostar, me comprometo a fazer uma pausa mínima de 15 minutos antes de qualquer decisão.",
];

export default function Contrato() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nomeAssinatura, setNomeAssinatura] = useState("");
  const [concordo, setConcordo] = useState(false);
  const [assinado, setAssinado] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate("/entrar"); return; }
      setUser(data.user);
      const primeiroNome = data.user.user_metadata?.full_name?.split(" ")[0] || "";
      setNomeAssinatura(primeiroNome);
    });
  }, []);

  const tudoOk = concordo && nomeAssinatura.trim().length >= 2;

  async function assinar() {
    if (!tudoOk) return;
    if (!user) { alert("Sessão não encontrada. Faça login novamente."); return; }
    setSalvando(true);

    const { error: erroContrato } = await supabase.from("contratos").insert({
      user_id: user.id,
      nome_assinatura: nomeAssinatura.trim(),
      clausulas_aceitas: itensContrato.map((_, i) => i),
    });

    if (erroContrato) {
      console.error("Erro ao salvar contrato:", erroContrato.message);
      alert("Não foi possível registrar o contrato. Tente novamente.");
      setSalvando(false);
      return;
    }

    const { error: erroProgresso } = await supabase
      .from("progresso_usuario")
      .insert({ user_id: user.id, modulo_id: 1 });

    if (erroProgresso && erroProgresso.code !== "23505") {
      console.error("Erro ao salvar progresso:", erroProgresso.message);
    }

    setAssinado(true);
    setSalvando(false);
  }

  if (assinado) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F5F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={s.cardCentral}>
          <div style={s.iconeSucesso}>✓</div>
          <h1 style={s.tituloSucesso}>Compromisso firmado.</h1>
          <p style={s.textoSucesso}>
            {nomeAssinatura}, você deu um passo real hoje. Guarde esta data: <strong>{dataHoje}</strong>.
          </p>
          <p style={{ ...s.textoSucesso, marginTop: "0.5rem" }}>
            O Módulo 1 está concluído. O próximo passo é o Módulo 2 — Sensibilização.
          </p>
          <button onClick={() => navigate("/painel")} style={s.btnPrimario}>
            Voltar ao painel →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0" }}>
      {/* Topbar */}
      <div style={s.topbar}>
        <button onClick={() => navigate("/modulo/1/aula/3")} style={s.btnVoltar}>
          ← Aula 3
        </button>
        <span style={s.topbarLabel}>Módulo 1 · Interrupção</span>
      </div>

      <div style={s.container}>
        {/* Cabeçalho */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={s.labelEtapa}>Contrato de Interrupção</span>
          <h1 style={s.titulo}>Um compromisso consigo mesmo.</h1>
        </div>

        {/* Texto introdutório */}
        <div style={s.blocoIntro}>
          <p style={s.introTexto}>
            Antes de iniciar o processo de mudança, é importante reconhecer algo fundamental:
          </p>
          <p style={{ ...s.introTexto, marginTop: "1rem" }}>
            O jogo online pode criar um ciclo de impulsos, perdas e tentativas de recuperação que muitas vezes ocorre de forma automática. Interromper esse ciclo exige mais do que informação. Exige uma decisão consciente de recuperar o controle da própria vida.
          </p>
          <p style={{ ...s.introTexto, marginTop: "1rem", fontWeight: 600 }}>
            Este contrato não é uma obrigação externa. Ele é um compromisso consigo mesmo.
          </p>
        </div>

        {/* Lista de itens do contrato */}
        <div style={{ marginBottom: "2rem" }}>
          {itensContrato.map((item, i) => (
            <div key={i} style={s.itemContrato}>
              <span style={s.checkVerde}>✔</span>
              <span style={s.itemTexto}>{item}</span>
            </div>
          ))}
        </div>

        {/* Compromisso de pausa — destaque */}
        <div style={s.blocoDestaque}>
          <p style={s.destaqueTexto}>
            Essa pausa de 15 minutos ativa o córtex pré-frontal e reduz a impulsividade.
          </p>
        </div>

        {/* Compromisso com o processo */}
        <div style={s.blocoNeutro}>
          <p style={s.neutroTexto}>
            Mudanças de comportamento não acontecem de forma imediata. Recaídas ou dificuldades podem ocorrer, e fazem parte do processo de aprendizagem. O importante é continuar buscando recuperar o controle.
          </p>
        </div>

        {/* Declaração final */}
        <div style={s.declaracaoFinal}>
          <p style={s.declaracaoTexto}>
            Eu reconheço que este é um momento de mudança na minha vida e estou disposto a iniciar o processo de interrupção do ciclo do jogo.
          </p>
        </div>

        {/* Campo de nome */}
        <div style={s.campoNome}>
          <label style={s.labelNome}>Seu nome (como aparecerá no contrato)</label>
          <input
            type="text"
            value={nomeAssinatura}
            onChange={(e) => setNomeAssinatura(e.target.value)}
            placeholder="Digite seu nome"
            style={s.input}
          />
        </div>

        {/* Checkbox CONTRATO PESSOAL */}
        <button
          onClick={() => setConcordo(!concordo)}
          style={{
            ...s.checkboxArea,
            borderColor: concordo ? "#3B6D11" : "#ddd",
            background: concordo ? "#EFF5E8" : "#fff",
          }}
        >
          <div style={{
            ...s.checkbox,
            background: concordo ? "#3B6D11" : "#fff",
            borderColor: concordo ? "#3B6D11" : "#ccc",
          }}>
            {concordo && <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>✓</span>}
          </div>
          <div style={{ textAlign: "left" }}>
            <span style={s.checkboxTitulo}>CONTRATO PESSOAL</span>
            <p style={s.checkboxDescricao}>
              Concordo com todos os compromissos acima e declaro que estou pronto para iniciar o processo de interrupção do ciclo do jogo.
            </p>
          </div>
        </button>

        {/* Preview assinatura */}
        {nomeAssinatura.trim().length >= 2 && concordo && (
          <div style={s.previewContrato}>
            <p style={s.previewTexto}>
              Eu, <strong>{nomeAssinatura}</strong>, declaro que reconheço o ciclo do jogo e me comprometo a interrompê-lo com consciência e prática.
            </p>
            <div style={s.assinaturaLinha}>
              <span style={s.assinaturaNome}>{nomeAssinatura}</span>
              <span style={s.assinaturaData}>{dataHoje}</span>
            </div>
          </div>
        )}

        {/* Botão assinar */}
        <button
          onClick={assinar}
          disabled={!tudoOk || salvando}
          style={{
            ...s.btnAssinar,
            opacity: tudoOk && !salvando ? 1 : 0.4,
            cursor: tudoOk && !salvando ? "pointer" : "not-allowed",
          }}
        >
          {salvando ? "Registrando..." : "Aceito iniciar o processo →"}
        </button>

        {!tudoOk && (
          <p style={s.avisoIncompleto}>
            Marque o contrato pessoal e informe seu nome para assinar.
          </p>
        )}
      </div>
    </div>
  );
}

const s = {
  topbar: {
    background: "#fff", borderBottom: "1px solid #E8E4DC",
    padding: "0.9rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem",
  },
  btnVoltar: {
    background: "none", border: "none", fontFamily: "DM Sans, sans-serif",
    fontSize: "0.85rem", color: "#777", cursor: "pointer", padding: 0,
  },
  topbarLabel: { fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "#aaa" },
  container: { maxWidth: 640, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" },
  labelEtapa: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.72rem", color: "#3B6D11",
    textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600,
    display: "block", marginBottom: "0.6rem",
  },
  titulo: {
    fontFamily: "DM Serif Display, serif", fontSize: "2rem",
    color: "#1a1a1a", marginBottom: "0.75rem",
  },
  blocoIntro: {
    background: "#fff", border: "1px solid #E8E4DC",
    borderRadius: 12, padding: "1.5rem", marginBottom: "1.75rem",
  },
  introTexto: {
    fontFamily: "DM Serif Display, serif", fontSize: "1rem",
    color: "#444", lineHeight: 1.7, fontStyle: "italic", margin: 0,
  },
  itemContrato: {
    display: "flex", alignItems: "flex-start", gap: "0.75rem",
    padding: "0.85rem 0", borderBottom: "1px solid #E8E4DC",
  },
  checkVerde: { color: "#3B6D11", fontWeight: 700, fontSize: "1rem", flexShrink: 0, marginTop: 2 },
  itemTexto: { fontFamily: "DM Sans, sans-serif", fontSize: "0.92rem", color: "#444", lineHeight: 1.6 },
  blocoDestaque: {
    background: "#EFF5E8", border: "1px solid #C8DFB0",
    borderLeft: "4px solid #3B6D11", borderRadius: 10,
    padding: "1.25rem 1.5rem", margin: "1.5rem 0",
  },
  destaqueTexto: {
    fontFamily: "DM Serif Display, serif", fontSize: "1rem",
    color: "#2A5009", lineHeight: 1.55, margin: 0,
  },
  blocoNeutro: {
    background: "#fff", border: "1px solid #E8E4DC",
    borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1.5rem",
  },
  neutroTexto: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
    color: "#666", lineHeight: 1.7, margin: 0,
  },
  declaracaoFinal: {
    background: "#FFF8F0", border: "1px solid #F0DFC0",
    borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1.75rem",
  },
  declaracaoTexto: {
    fontFamily: "DM Serif Display, serif", fontSize: "1rem",
    color: "#664420", lineHeight: 1.65, margin: 0, fontStyle: "italic",
  },
  campoNome: { marginBottom: "1.25rem" },
  labelNome: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem",
    color: "#777", display: "block", marginBottom: "0.4rem",
  },
  input: {
    width: "100%", padding: "0.75rem 1rem",
    fontFamily: "DM Sans, sans-serif", fontSize: "1rem",
    border: "1px solid #ddd", borderRadius: 10,
    background: "#fff", color: "#1a1a1a", outline: "none", boxSizing: "border-box",
  },
  checkboxArea: {
    display: "flex", alignItems: "flex-start", gap: "0.9rem",
    padding: "1.1rem 1.25rem", borderRadius: 12,
    border: "1px solid #ddd", background: "#fff",
    cursor: "pointer", textAlign: "left", width: "100%",
    marginBottom: "1.5rem", transition: "all 0.2s",
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, border: "2px solid #ccc",
    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", marginTop: 2,
  },
  checkboxTitulo: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem",
    color: "#3B6D11", fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", display: "block", marginBottom: "0.3rem",
  },
  checkboxDescricao: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem",
    color: "#555", lineHeight: 1.55, margin: 0,
  },
  previewContrato: {
    background: "#fff", border: "1px solid #C8DFB0",
    borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem",
  },
  previewTexto: {
    fontFamily: "DM Serif Display, serif", fontSize: "1rem",
    color: "#333", lineHeight: 1.65, marginBottom: "1.25rem",
  },
  assinaturaLinha: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
    borderTop: "1px solid #E8E4DC", paddingTop: "0.75rem",
  },
  assinaturaNome: {
    fontFamily: "DM Serif Display, serif", fontSize: "1.1rem",
    color: "#1a1a1a", fontStyle: "italic",
  },
  assinaturaData: { fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "#aaa" },
  btnAssinar: {
    width: "100%", background: "#3B6D11", color: "#fff",
    fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "1rem",
    padding: "0.9rem", borderRadius: 12, border: "none",
    transition: "opacity 0.2s", display: "block", marginBottom: "0.75rem",
  },
  avisoIncompleto: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem",
    color: "#aaa", textAlign: "center",
  },
  cardCentral: {
    background: "#fff", borderRadius: 16, padding: "3rem 2rem",
    textAlign: "center", maxWidth: 480, border: "1px solid #C8DFB0",
  },
  iconeSucesso: {
    width: 60, height: 60, borderRadius: "50%", background: "#3B6D11",
    color: "#fff", fontSize: "1.5rem", display: "flex",
    alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem",
  },
  tituloSucesso: {
    fontFamily: "DM Serif Display, serif", fontSize: "1.75rem",
    color: "#1a1a1a", marginBottom: "0.75rem",
  },
  textoSucesso: {
    fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem",
    color: "#555", lineHeight: 1.6, margin: 0,
  },
  btnPrimario: {
    background: "#3B6D11", color: "#fff", fontFamily: "DM Sans, sans-serif",
    fontWeight: 600, fontSize: "0.9rem", padding: "0.75rem 1.5rem",
    borderRadius: 10, border: "none", cursor: "pointer", marginTop: "1.75rem",
  },
};
