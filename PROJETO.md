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
- `/painel`, `/contrato`, `/modulo/...` — Área logada  

---

*Documento gerado para alinhar desenvolvimento ao arquivo de referência `instituto-istop.html`.*
