# PareDeJogar / Instituto ISTOP — Projeto

## Visão

Aplicação web **React + Vite** para o programa **PareDeJogar**, alinhado ao **Método ISTOP** (Interrupção, Sensibilização, Transformação, Organização, Prevenção) e à proposta do **Instituto ISTOP** de reorganização comportamental em torno do jogo problemático.

## Referência de layout e conteúdo

| Arquivo | Função |
|--------|--------|
| **`instituto-istop.html`** | Página estática de referência (HTML + CSS) com a **landing completa**: hero, sobre, pilares ISTOP, etapas, público-alvo, sinais, lutos, formulário, recursos, FAQ e CTA. Use como guia visual e de texto ao evoluir o React. |
| **`src/pages/LandingPage.jsx`** | Implementação React equivalente, integrada ao **React Router**, **LeadForm** (Supabase) e estilos globais (`src/index.css`). |

## Stack

- **React 19** + **Vite** + **Tailwind CSS** (`@tailwindcss/vite`)
- **React Router** (rotas SPA)
- **Supabase** (auth, `leads`, `contratos`, `progresso_usuario`, RLS)
- **Google OAuth** (app no Google Cloud — Instituto ISTOP)
- **Deploy:** Vercel (`vercel.json` com SPA rewrite)

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Variáveis de ambiente

Criar `.env.local` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (não commitar).

---

## Estado atual — 10/04/2026

**Handoff para a próxima sessão:** use esta secção como contexto inicial.

### Infra e repositório

| Item | Valor |
|------|--------|
| **Repositório** | [softiahouse/paredejogar](https://github.com/softiahouse/paredejogar) (`main`) |
| **Domínio** | paredejogar.com |
| **Supabase** | `gybzuhopxhlbewhjihnd.supabase.co` |

### Concluído (sessões recentes)

- **Painel.jsx** — 5 módulos ISTOP com progresso real do Supabase (`progresso_usuario`).
- **modulosContent.js** — conteúdo dos módulos **1–5** (aulas e metadados).
- **AulaPage.jsx** — aulas dinâmicas por rota; **scroll suave para o topo** ao mudar módulo/aula (`mId`, `aId`).
- **Contrato.jsx** — contrato com checkbox **CONTRATO PESSOAL**, cláusulas, persistência em Supabase; **marco de jornada** e **tela de conclusão** do Módulo 1 após assinar (antes de voltar ao painel).
- **QuizResultPage.jsx** — botão WhatsApp com texto humano; fluxo sem login duplicado; guia para familiares.
- **Navbar.jsx** — botão **Entrar** no lugar de “Ver o programa”.
- **LandingPage.jsx** — visual alinhado ao HTML de referência.
- **Supabase** — tabelas **`contratos`** e **`progresso_usuario`** com RLS.
- **Módulo 1 — aulas 1, 2 e 3** — texto reescrito e expandido em `modulosContent.js`.

### Rotas ativas

| Rota | Descrição |
|------|-----------|
| `/` | Landing |
| `/entrar`, `/cadastrar` | Auth |
| `/quiz`, `/quiz/familias`, `/resultado` | Quiz e resultado |
| `/painel` | Painel logado |
| `/modulo/:id` | Entrada do módulo (redireciona para primeira aula quando aplicável) |
| `/modulo/:moduloId/aula/:aulaId` | Aulas |
| `/contrato` | Contrato de Interrupção (Módulo 1) |
| `/auth/callback`, `/nova-senha` | OAuth e redefinição de senha |

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

## Fluxo completo — Módulo 1 (Interrupção)

Ordem esperada na navegação:

1. **`/painel`** — Lista de módulos; utilizador abre o Módulo 1.  
2. **`/modulo/1`** — Redireciona para a primeira aula (`ModuloEntry` → `/modulo/1/aula/1`).  
3. **`/modulo/1/aula/1`** … **`/modulo/1/aula/3`** — Aulas (`AulaPage` + `modulosContent.js`).  
4. **`/contrato`** — Contrato; após assinar, **tela de conclusão do Módulo 1** e depois **Ir para o painel**.  
5. **`/painel`** — Módulo 1 concluído no progresso.

Nota: as aulas usam sempre **`/modulo/:moduloId/aula/:aulaId`**.

### Após assinar o contrato (Supabase + painel)

1. **`Contrato.jsx`:** `INSERT` em **`contratos`**; `INSERT` em **`progresso_usuario`** com **`modulo_id: 1`** (duplicado `23505` ignorado).  
2. **`Painel.jsx`:** `SELECT` em **`progresso_usuario`** → módulos concluídos, bloqueios e barra `concluidos.length / 5`.

## Próximas tarefas (sugestão)

- [ ] Integrar **`/checkin`** ou outras peças ao progresso, se fizer sentido.
- [ ] Revisar copy/UX conforme feedback clínico ou do Instituto ISTOP.

---

*Documento de alinhamento ao `instituto-istop.html` e ao estado do repositório `paredejogar`.*
