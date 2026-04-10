import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { modulos } from "../data/modulosContent";

export default function AulaPage() {
  const { moduloId, aulaId } = useParams();
  const navigate = useNavigate();

  const mId = parseInt(moduloId);
  const aId = parseInt(aulaId);
  const modulo = modulos[mId];
  const aula = modulo?.aulas.find((a) => a.id === aId);
  const totalAulas = modulo?.aulas.length || 0;
  const isUltimaAula = aId === totalAulas;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/entrar");
    });
  }, [navigate]);

  if (!modulo || !aula) {
    return (
      <div style={styles.centro}>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: "#999" }}>
          Aula não encontrada.
        </p>
        <Link to="/painel" style={styles.linkVerde}>
          Voltar ao painel
        </Link>
      </div>
    );
  }

  function irParaProxima() {
    if (isUltimaAula && modulo.proximoPasso) {
      navigate(modulo.proximoPasso.rota);
    } else {
      navigate(`/modulo/${mId}/aula/${aId + 1}`);
    }
  }

  function irParaAnterior() {
    if (aId === 1) {
      navigate("/painel");
    } else {
      navigate(`/modulo/${mId}/aula/${aId - 1}`);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0" }}>
      {/* Topbar */}
      <div style={styles.topbar}>
        <button onClick={() => navigate("/painel")} style={styles.btnVoltar}>
          ← Painel
        </button>

        <div style={styles.progressoWrap}>
          <span style={styles.progressoLabel}>
            Módulo {mId} · {modulo.nome}
          </span>
          <div style={styles.progressoBarOuter}>
            {modulo.aulas.map((a) => (
              <div
                key={a.id}
                style={{
                  ...styles.progressoSegmento,
                  background: a.id <= aId ? "#3B6D11" : "#E8E4DC",
                }}
              />
            ))}
          </div>
          <span style={styles.progressoCount}>
            {aId}/{totalAulas}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div style={styles.container}>
        {/* Cabeçalho da aula */}
        <div style={{ marginBottom: "2rem" }}>
          <span style={styles.labelAula}>Aula {aId}</span>
          <h1 style={styles.tituloAula}>{aula.titulo}</h1>
          <span style={styles.duracao}>⏱ {aula.duracao} de leitura</span>
        </div>

        {/* Blocos de conteúdo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {aula.conteudo.map((bloco, i) => {
            if (bloco.tipo === "intro") {
              return (
                <p key={i} style={styles.intro}>
                  {bloco.texto}
                </p>
              );
            }
            if (bloco.tipo === "titulo") {
              return (
                <h2 key={i} style={styles.subtitulo}>
                  {bloco.texto}
                </h2>
              );
            }
            if (bloco.tipo === "paragrafo") {
              return (
                <p key={i} style={styles.paragrafo}>
                  {bloco.texto}
                </p>
              );
            }
            if (bloco.tipo === "destaque") {
              return (
                <div key={i} style={styles.destaque}>
                  <p style={styles.destaqueTexto}>{bloco.texto}</p>
                </div>
              );
            }
            if (bloco.tipo === "lista") {
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {bloco.itens.map((item, j) => (
                    <div key={j} style={styles.itemLista}>
                      <strong style={styles.itemTitulo}>{item.titulo}</strong>
                      <p style={styles.itemDescricao}>{item.descricao}</p>
                    </div>
                  ))}
                </div>
              );
            }
            if (bloco.tipo === "reflexao") {
              return (
                <div key={i} style={styles.reflexao}>
                  <span style={styles.reflexaoLabel}>{bloco.pergunta}</span>
                  <p style={styles.reflexaoTexto}>{bloco.texto}</p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Navegação entre aulas */}
        <div style={styles.navAulas}>
          <button onClick={irParaAnterior} style={styles.btnSecundario}>
            ← {aId === 1 ? "Painel" : `Aula ${aId - 1}`}
          </button>

          <button onClick={irParaProxima} style={styles.btnPrimario}>
            {isUltimaAula && modulo.proximoPasso
              ? modulo.proximoPasso.label + " →"
              : `Aula ${aId + 1} →`}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  centro: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    background: "#F7F5F0",
  },
  linkVerde: {
    color: "#3B6D11",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.9rem",
  },
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #E8E4DC",
    padding: "0.9rem 2rem",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  btnVoltar: {
    background: "none",
    border: "none",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.85rem",
    color: "#777",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  progressoWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  progressoLabel: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.78rem",
    color: "#999",
    flexShrink: 0,
  },
  progressoBarOuter: {
    flex: 1,
    display: "flex",
    gap: 4,
  },
  progressoSegmento: {
    flex: 1,
    height: 6,
    borderRadius: 99,
    transition: "background 0.3s",
  },
  progressoCount: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.78rem",
    color: "#3B6D11",
    fontWeight: 600,
    flexShrink: 0,
  },
  container: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "2.5rem 1.5rem 4rem",
  },
  labelAula: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.72rem",
    color: "#3B6D11",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
    display: "block",
    marginBottom: "0.4rem",
  },
  tituloAula: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "2rem",
    color: "#1a1a1a",
    marginBottom: "0.5rem",
    lineHeight: 1.2,
  },
  duracao: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.8rem",
    color: "#aaa",
  },
  intro: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1.2rem",
    color: "#333",
    lineHeight: 1.6,
    fontStyle: "italic",
  },
  subtitulo: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1.25rem",
    color: "#1a1a1a",
    marginTop: "0.5rem",
  },
  paragrafo: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "1rem",
    color: "#444",
    lineHeight: 1.75,
  },
  destaque: {
    background: "#EFF5E8",
    border: "1px solid #C8DFB0",
    borderLeft: "4px solid #3B6D11",
    borderRadius: 10,
    padding: "1.25rem 1.5rem",
  },
  destaqueTexto: {
    fontFamily: "DM Serif Display, serif",
    fontSize: "1.05rem",
    color: "#2A5009",
    lineHeight: 1.55,
    margin: 0,
  },
  itemLista: {
    background: "#fff",
    border: "1px solid #E8E4DC",
    borderRadius: 10,
    padding: "1rem 1.25rem",
  },
  itemTitulo: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.9rem",
    color: "#1a1a1a",
    display: "block",
    marginBottom: "0.25rem",
  },
  itemDescricao: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.88rem",
    color: "#666",
    lineHeight: 1.55,
    margin: 0,
  },
  reflexao: {
    background: "#FFF8F0",
    border: "1px solid #F0DFC0",
    borderRadius: 10,
    padding: "1.25rem 1.5rem",
  },
  reflexaoLabel: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.72rem",
    color: "#B07030",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 600,
    display: "block",
    marginBottom: "0.5rem",
  },
  reflexaoTexto: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.95rem",
    color: "#664420",
    lineHeight: 1.6,
    margin: 0,
  },
  navAulas: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #E8E4DC",
    gap: "1rem",
  },
  btnPrimario: {
    background: "#3B6D11",
    color: "#fff",
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.7rem 1.5rem",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },
  btnSecundario: {
    background: "#fff",
    color: "#555",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.9rem",
    padding: "0.7rem 1.25rem",
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
  },
};
