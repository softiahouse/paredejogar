import { Link, Navigate, useParams } from "react-router-dom";

/** Redireciona `/modulo/1` para a primeira aula; demais módulos ainda sem rotas de aula. */
export default function ModuloEntry() {
  const { id } = useParams();
  const n = Number(id);

  if (n === 1) {
    return <Navigate to="/modulo/1/aula/1" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F5F0",
        padding: "120px 24px",
        textAlign: "center",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      <h2 style={{ fontFamily: "DM Serif Display, serif", color: "#1a1a1a" }}>
        Módulo {id}
      </h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Conteúdo em breve.
      </p>
      <Link
        to="/painel"
        style={{ color: "#3B6D11", fontWeight: 600, textDecoration: "none" }}
      >
        ← Voltar ao painel
      </Link>
    </div>
  );
}
