# PareDeJogar / Instituto ISTOP — Projeto

## Visão

Aplicação web **React + Vite** para o programa **PareDeJogar**, alinhado ao **Método ISTOP** (Interrupção, Sensibilização, Transformação, Organização, Prevenção) e à proposta do **Instituto ISTOP** de reorganização comportamental em torno do jogo problemático.

## Referência de layout e conteúdo

| Arquivo | Função |
|--------|--------|
| **`instituto-istop.html`** | Página estática de referência (HTML + CSS) com a **landing completa**: hero, sobre, pilares ISTOP, etapas, público-alvo, sinais, lutos, formulário, recursos, FAQ e CTA. Use como guia visual e de texto ao evoluir o React. |
| **`src/pages/LandingPage.jsx`** | Implementação React equivalente, integrada ao **React Router**, **LeadForm** (Supabase) e estilos globais (`src/index.css`). |

## Stack

- React 19, Vite 8  
- React Router 6  
- Tailwind CSS 4 (`@tailwindcss/vite`)  
- Supabase (auth + tabela `leads`)  
- Deploy sugerido: Vercel (`vercel.json` com SPA rewrite)

## Estrutura da landing (ordem das seções)

1. **Hero** — Headline, subtítulo, CTAs (cadastrar / âncora método), painel glass com as 5 etapas ISTOP.  
2. **Sobre o Instituto ISTOP** — Missão e abordagem (ciência + acolhimento).  
3. **Os 5 pilares ISTOP** — Interrupção, Sensibilização, Transformação, Organização, Prevenção.  
4. **4 etapas do caminho** — Parar, elaborar perdas, reconstruir identidade, manter vínculos (`#metodo`).  
5. **Para quem é** — Público-alvo em cards.  
6. **Sinais de alerta** — Lista em cards glass.  
7. **Além do dinheiro** — Lutos + **LeadForm** (contato).  
8. **Recursos gratuitos** — Grid de ferramentas (`#recursos`).  
9. **FAQ** — Perguntas frequentes (`#faq`).  
10. **CTA final** — Cadastro / login.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Variáveis de ambiente

Criar `.env.local` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (não commitar).

## Rotas principais

- `/` — Landing  
- `/entrar`, `/cadastrar` — Auth  
- `/esqueci-senha`, `/auth/callback`, `/nova-senha` — Recuperação de senha e callback OAuth  
- `/painel`, `/contrato`, `/modulo/...` — Área logada  

## Fluxo completo — Módulo 1 (Interrupção)

Ordem esperada na navegação (URLs reais da app):

1. **`/painel`** — Lista de módulos; utilizador abre o Módulo 1.  
2. **`/modulo/1`** — Redireciona automaticamente para a primeira aula (`ModuloEntry` → `Navigate` para `/modulo/1/aula/1`).  
3. **`/modulo/1/aula/1`** — Aula 1 (`AulaPage` + conteúdo em `modulosContent.js`).  
4. **`/modulo/1/aula/2`** — Aula 2.  
5. **`/modulo/1/aula/3`** — Aula 3; botão “próximo” leva ao contrato (`proximoPasso.rota` em `modulosContent.js`).  
6. **`/contrato`** — Contrato de Interrupção (`Contrato.jsx`); após assinar, volta ao painel.  
7. **`/painel`** — Jornada do Módulo 1 concluída (mensagem de sucesso no contrato referencia o fecho do módulo).

Nota: não existem rotas soltas `/aula/2` ou `/aula/3`; as aulas são sempre **`/modulo/:moduloId/aula/:aulaId`**.

### Após assinar o contrato (Supabase + painel)

1. **Assinatura em `/contrato`** (`Contrato.jsx`):  
   - `INSERT` em **`contratos`** (nome, cláusulas aceites).  
   - `INSERT` em **`progresso_usuario`** com **`modulo_id: 1`** (duplicado `23505` ignorado se já existir).  
   - **Tela de sucesso** (“Compromisso firmado…”).

2. **Ao voltar ao `/painel`** (`Painel.jsx` → `carregarProgresso`):  
   - `SELECT` em **`progresso_usuario`** por `user_id` → por exemplo **`concluidos: [1]`**.  
   - **`moduloAtual`** = maior `modulo_id` concluído + 1 → com só o módulo 1 feito, fica **2**.  
   - **Módulo 1**: estado **concluído** (✓ verde).  
   - **Módulo 2**: **Disponível** (é o atual).  
   - **Módulos 3–5**: bloqueados até o utilizador completar o anterior.  
   - **Barra de progresso**: `concluidos.length / 5` → com um módulo feito = **20%**.

## Estado atual (10/04/2026)

### Concluído

- Landing page Instituto ISTOP (design creme, PARE/VIVA, 5 círculos)
- Navbar com botão "Entrar" (Google OAuth via `signInWithOAuth`)
- `src/lib/supabaseClient.js` configurado
- `src/pages/AuthCallback.jsx` com `onAuthStateChange` (detecta `PASSWORD_RECOVERY`)
- `src/pages/NovaSenha.jsx` — formulário de redefinição de senha
- `src/pages/Painel.jsx` — módulos ISTOP, progresso via **`progresso_usuario`** (Supabase)
- `src/pages/Contrato.jsx` — assinatura grava **`contratos`** + **`progresso_usuario`** (módulo 1)
- `src/hooks/useAuth.jsx` — função `resetPassword` com `redirectTo`
- Rotas: `/auth/callback`, `/nova-senha`, `/painel` registradas no `App.jsx`
- Build funcionando (`npm run build`)

### Próximas tarefas

- [ ] Conteúdo e rotas dos **módulos 2–5** (aulas em `modulosContent.js`, etc.)
- [ ] Integrar **`/checkin`** ou outras peças ao progresso, se fizer sentido

---

*Documento gerado para alinhar desenvolvimento ao arquivo de referência `instituto-istop.html`.*
