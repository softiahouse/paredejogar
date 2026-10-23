import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { modulos } from "../data/modulosContent";
import { verificarAcessoModulo } from "../lib/acesso";

/** Redireciona `/modulo/:id` para a primeira aula quando o módulo existe e
 *  o usuário tem acesso (módulo anterior concluído). Caso contrário, manda de volta
 *  ao painel com aviso de bloqueio. */
export default function ModuloEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const n = Number(id);

  // null = checando | true = liberado | false = bloqueado
  const [liberado, setLiberado] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/entrar");
        return;
      }
      setLiberado(await verificarAcessoModulo(data.user.id, n));
    })();
  }, [n, navigate]);

  if (liberado === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F5F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "DM Sans, sans-serif",
          color: "#999",
        }}
      >
        Carregando módulo...
      </div>
    );
  }

  if (!liberado) {
    return <Navigate to={`/painel?bloqueado=modulo_${n}`} replace />;
  }

  if (modulos[n]?.aulas?.length) {
    return <Navigate to={`/modulo/${n}/aula/1`} replace />;
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
