import { supabase } from "./supabaseClient";

/**
 * Regra de acesso (programa gratuito, sequencial):
 * - Módulo 1 sempre liberado para quem está logado.
 * - Módulo N libera quando o N-1 foi concluído.
 * - Quem já tinha módulos liberados na tabela antiga `modulos_liberados`
 *   (compras anteriores ou sócios com os 5) mantém esse acesso.
 */
export function moduloDisponivel(moduloId, concluidos = [], liberados = []) {
  if (moduloId === 1) return true;
  if (liberados.length >= 5) return true;
  if (liberados.includes(moduloId)) return true;
  if (concluidos.includes(moduloId)) return true;
  return concluidos.includes(moduloId - 1);
}

export async function carregarAcesso(userId) {
  const [{ data: prog }, { data: lib }] = await Promise.all([
    supabase.from("progresso_usuario").select("modulo_id").eq("user_id", userId),
    supabase.from("modulos_liberados").select("modulo_id").eq("user_id", userId),
  ]);
  return {
    concluidos: (prog || []).map((r) => r.modulo_id),
    liberados: (lib || []).map((r) => r.modulo_id),
  };
}

export async function verificarAcessoModulo(userId, moduloId) {
  if (moduloId === 1) return true;
  const { concluidos, liberados } = await carregarAcesso(userId);
  return moduloDisponivel(moduloId, concluidos, liberados);
}
