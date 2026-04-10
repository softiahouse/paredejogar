import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const modulos = [
  {
    id: 1,
    etapa: "I",
    nome: "Interrupção",
    descricao:
      "Você começa entendendo como o ciclo do jogo se instala — e dá o primeiro passo para sair do piloto automático.",
    aulas: 3,
    ferramenta: "Contrato de Interrupção",
    cor: "#3B6D11",
  },
  {
    id: 2,
    etapa: "S",
    nome: "Compreendendo os Gatilhos do Jogo",
    descricao:
      "Identifique os momentos e emoções que despertam o impulso de apostar.",
    aulas: 5,
    ferramenta: "Mapa de Gatilhos ISTOP",
    cor: "#3B6D11",
  },
  {
    id: 3,
    etapa: "T",
    nome: "Autorregulação",
    descricao:
      "Você aprende a criar uma pausa entre o gatilho e a ação. Aqui começa o controle real — construído por você, para você.",
    aulas: 5,
    ferramenta: "Plano Pessoal de Manejo",
    cor: "#3B6D11",
  },
  {
    id: 4,
    etapa: "O",
    nome: "Reorganização comportamental e consolidação de novos padrões",
    descricao:
      "Compreenda como hábitos se formam e aprenda a reorganizar rotinas e padrões comportamentais para consolidar mudanças duradouras.",
    aulas: 5,
    ferramenta: "Estrutura de Rotina",
    cor: "#3B6D11",
  },
  {
    id: 5,
    etapa: "P",
    nome: "Manutenção da Mudança e Prevenção de Recaídas",
    descricao:
      "Consolide as mudanças comportamentais iniciadas no programa e desenvolva estratégias estruturadas para reduzir o risco de recaída ao longo do tempo.",
    aulas: 5,
    ferramenta: "Protocolo de Prevenção de Recaída",
    cor: "#3B6D11",
  },
];

export default function Painel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progresso, setProgresso] = useState({ moduloAtual: 1, concluidos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/entrar");
        return;
      }
      setUser(data.user);
      carregarProgresso(data.user.id);
    });
  }, []);

  async function carregarProgresso(userId) {
    const { data, error } = await supabase
      .from("progresso_usuario")
      .select("modulo_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Erro ao carregar progresso:", error.message);
      setProgresso({ moduloAtual: 1, concluidos: [] });
    } else {
      const concluidos = data.map((r) => r.modulo_id);
      // Próximo módulo = maior concluído + 1, mínimo 1
      const moduloAtual = concluidos.length > 0 ? Math.max(...concluidos) + 1 : 1;
      setProgresso({ moduloAtual, concluidos });
    }

    setLoading(false);
  }

  function statusModulo(id) {
    if (progresso.concluidos.includes(id)) return "concluido";
    if (id === progresso.moduloAtual) return "disponivel";
    return "bloqueado";
  }

  const nome = user?.user_metadata?.full_name?.split(" ")[0] || "bem-vindo";
  const avatar = user?.user_metadata?.avatar_url;
  const totalConcluidos = progresso.concluidos.length;
  const percentual = Math.round((totalConcluidos / 5) * 100);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F5F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontFamily: "DM Sans, sans-serif", color: "#3B6D11" }}>
          Carregando...
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0" }}>
      {/* Header do painel */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E8E4DC",
          padding: "1.25rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "DM Serif Display, serif",
            fontSize: "1.25rem",
            color: "#3B6D11",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Instituto ISTOP
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {avatar && (
            <img
              src={avatar}
              alt={nome}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            {nome}
          </span>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/");
            }}
            style={{
              background: "none",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.3rem 0.75rem",
              fontSize: "0.8rem",
              fontFamily: "DM Sans, sans-serif",
              color: "#777",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        {/* Boas-vindas + progresso */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid #E8E4DC",
          }}
        >
          <h1
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "1.75rem",
              color: "#1a1a1a",
              marginBottom: "0.25rem",
            }}
          >
            Olá, {nome}.
          </h1>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#666",
              fontSize: "0.95rem",
              marginBottom: "1.5rem",
            }}
          >
            {totalConcluidos === 0
              ? "Sua jornada começa aqui. Cada módulo é um passo real."
              : `Você concluiu ${totalConcluidos} de 5 módulos. Continue.`}
          </p>

          {/* Barra de progresso */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "#E8E4DC",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percentual}%`,
                  background: "#3B6D11",
                  borderRadius: 99,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
                color: "#3B6D11",
                fontWeight: 600,
                minWidth: 40,
              }}
            >
              {percentual}%
            </span>
          </div>

          {/* Etapas ISTOP visuais */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {modulos.map((m) => {
              const s = statusModulo(m.id);
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 99,
                    background:
                      s === "concluido"
                        ? "#3B6D11"
                        : s === "disponivel"
                        ? "#EFF5E8"
                        : "#F0EFE9",
                    border: `1px solid ${
                      s === "concluido"
                        ? "#3B6D11"
                        : s === "disponivel"
                        ? "#3B6D11"
                        : "#DDD"
                    }`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Serif Display, serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color:
                        s === "concluido"
                          ? "#fff"
                          : s === "disponivel"
                          ? "#3B6D11"
                          : "#aaa",
                    }}
                  >
                    {m.etapa}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.75rem",
                      color:
                        s === "concluido"
                          ? "#fff"
                          : s === "disponivel"
                          ? "#3B6D11"
                          : "#aaa",
                    }}
                  >
                    {m.nome}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid de módulos */}
        <h2
          style={{
            fontFamily: "DM Serif Display, serif",
            fontSize: "1.2rem",
            color: "#1a1a1a",
            marginBottom: "1rem",
          }}
        >
          Módulos do Programa
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {modulos.map((m) => {
            const s = statusModulo(m.id);
            const bloqueado = s === "bloqueado";

            return (
              <div
                key={m.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: `1px solid ${
                    s === "disponivel" ? "#3B6D11" : "#E8E4DC"
                  }`,
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.25rem",
                  opacity: bloqueado ? 0.55 : 1,
                  transition: "box-shadow 0.2s",
                  boxShadow:
                    s === "disponivel"
                      ? "0 2px 12px rgba(59,109,17,0.08)"
                      : "none",
                }}
              >
                {/* Círculo da letra */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background:
                      s === "concluido"
                        ? "#3B6D11"
                        : s === "disponivel"
                        ? "#EFF5E8"
                        : "#F0EFE9",
                    border: `2px solid ${
                      s === "concluido"
                        ? "#3B6D11"
                        : s === "disponivel"
                        ? "#3B6D11"
                        : "#ddd"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {s === "concluido" ? (
                    <span style={{ color: "#fff", fontSize: "1.2rem" }}>✓</span>
                  ) : (
                    <span
                      style={{
                        fontFamily: "DM Serif Display, serif",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        color: s === "disponivel" ? "#3B6D11" : "#bbb",
                      }}
                    >
                      {m.etapa}
                    </span>
                  )}
                </div>

                {/* Conteúdo */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.72rem",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Módulo {m.id}
                    </span>
                    {s === "concluido" && (
                      <span
                        style={{
                          background: "#EFF5E8",
                          color: "#3B6D11",
                          fontSize: "0.68rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: 99,
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Concluído
                      </span>
                    )}
                    {s === "disponivel" && (
                      <span
                        style={{
                          background: "#3B6D11",
                          color: "#fff",
                          fontSize: "0.68rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: 99,
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Disponível
                      </span>
                    )}
                    {s === "bloqueado" && (
                      <span
                        style={{
                          background: "#F0EFE9",
                          color: "#aaa",
                          fontSize: "0.68rem",
                          padding: "0.15rem 0.5rem",
                          borderRadius: 99,
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        🔒 Bloqueado
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "DM Serif Display, serif",
                      fontSize: "1.15rem",
                      color: "#1a1a1a",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {m.nome}
                  </h3>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.88rem",
                      color: "#666",
                      lineHeight: 1.55,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {m.descricao}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.78rem",
                        color: "#888",
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <span>📖 {m.aulas} aulas</span>
                      <span>🛠 {m.ferramenta}</span>
                    </div>

                    {!bloqueado && (
                      <Link
                        to={`/modulo/${m.id}`}
                        style={{
                          background:
                            s === "concluido" ? "#EFF5E8" : "#3B6D11",
                          color: s === "concluido" ? "#3B6D11" : "#fff",
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          padding: "0.45rem 1.1rem",
                          borderRadius: 8,
                          textDecoration: "none",
                          border:
                            s === "concluido"
                              ? "1px solid #3B6D11"
                              : "none",
                        }}
                      >
                        {s === "concluido" ? "Revisar" : "Iniciar módulo →"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé do painel */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.78rem",
            color: "#bbb",
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          Instituto ISTOP — Método científico de interrupção do ciclo do jogo
        </p>
      </div>
    </div>
  );
}
