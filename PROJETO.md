# PareDeJogar / Instituto ISTOP — Projeto

## Visão

Aplicação web **React + Vite** para o programa **PareDeJogar**, alinhado ao **Método ISTOP** (Interrupção, Sensibilização, Transformação, Organização, Prevenção) e à proposta do **Instituto ISTOP** de reorganização comportamental em torno do jogo problemático.

## Stack

- **React 19** + **Vite** + **Tailwind CSS** (`@tailwindcss/vite`)
- **React Router** (rotas SPA)
- **Supabase** (auth, tabelas, RLS, Edge Functions)
- **Google OAuth**
- **Mercado Pago** (Checkout Pro, pagamento por módulo)
- **Deploy:** Vercel (`vercel.json` com SPA rewrite)

## Repositório e infra

| Item | Valor |
|------|-------|
| **Repositório** | `softiahouse/paredejogar` (`main`) |
| **Domínio** | paredejogar.com |
| **Supabase** | `gybzuhopxhlbewhjihnd.supabase.co` |
| **Vercel** | deploy automático via push |

## Variáveis de ambiente

`.env.local` (não commitar):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_MP_PUBLIC_KEY`
- `MP_ACCESS_TOKEN` (sem VITE — só backend)

Supabase Secrets (Edge Functions):
- `MP_ACCESS_TOKEN`
- `SITE_URL=https://paredejogar.com`

---

## Estado actual — 14/04/2026

### Tabelas Supabase

| Tabela | Função |
|--------|--------|
| `progresso_usuario` | Módulos concluídos por user |
| `modulos_liberados` | Módulos pagos/desbloqueados por user |
| `pagamentos_mp` | Registo de pagamentos MP |
| `contratos` | Contratos de interrupção assinados |
| `leads` | Leads do formulário da landing |
| `emergencia_blocos_vistos` | Controla quais blocos de emergência o user já viu |

### Edge Functions (Supabase)

- `criar-preferencia-mp` — cria preferência no MP e devolve `init_point`
- `webhook-mp` — recebe notificação MP, grava em `pagamentos_mp` e insere em `modulos_liberados` quando `status === "approved"`

### Modelo de pagamento

| Módulo | Nome | Preço |
|--------|------|-------|
| 1 | Interrupção | R$ 29,90 |
| 2 | Sensibilização | R$ 49,90 |
| 3 | Autorregulação | R$ 89,90 |
| 4 | Reorganização | R$ 149,90 |
| 5 | Manutenção | R$ 199,90 |

- Pagamento sequencial obrigatório (só compra o 2 se tiver o 1, etc.)
- Módulo libera acesso por 120 dias
- Sócios com acesso permanente a todos os módulos (inserido directo no Supabase)

### Sócios com acesso permanente

Emails com todos os módulos liberados via SQL directo:
- `jose.r.paulo@hotmail.com`
- `joyce.pollet@gmail.com`
- `darosapaulomarcelo@gmail.com`
- `paulopaulosul@gmail.com`

Lógica no `Painel.jsx`: se `liberados.length === 5`, ignora restrição de sequência.

---

## Rotas activas

| Rota | Descrição |
|------|-----------|
| `/` | Landing |
| `/entrar`, `/cadastrar` | Auth |
| `/quiz`, `/quiz/familias`, `/resultado` | Quiz e resultado |
| `/painel` | Painel logado |
| `/modulo/:id` | Entrada do módulo |
| `/modulo/:moduloId/aula/:aulaId` | Aulas |
| `/contrato` | Contrato de Interrupção (Módulo 1) |
| `/auth/callback`, `/nova-senha` | OAuth e redefinição de senha |
| `/termos`, `/privacidade` | Termos de uso |
| `/certificado` | Certificado de conclusão |

---

## Componentes principais

| Ficheiro | Função |
|----------|--------|
| `Painel.jsx` | Painel logado — progresso, módulos, paywall, livros gratuitos |
| `AulaPage.jsx` | Aulas dinâmicas por rota |
| `Contrato.jsx` | Contrato de Interrupção com persistência Supabase |
| `BotaoEmergencia.jsx` | Botão de emergência com 5 blocos de 20 perguntas, respiração e mensagens |
| `LandingPage.jsx` | Landing completa com secção de familiares |
| `Footer.jsx` | Rodapé com mensagem para familiares |
| `Navbar.jsx` | Navbar com logo SVG Instituto ISTOP |
| `QuizResultPage.jsx` | Resultado do quiz com botão WhatsApp para familiares |
| `TermosPage.jsx` | Página de termos de uso e privacidade |

---

## Ficheiros públicos importantes

| Ficheiro | Local |
|----------|-------|
| Logo SVG | `public/logo-instituto-istop.svg` |
| Logo ícone | `public/logo-icon.png` |
| Favicon | `public/favicon.png` |
| Livro O Luto | `public/livros/o-luto.pdf` |
| Livro Jogo Online | `public/livros/jogo-online.pdf` |
| Capa O Luto | `public/imagens/capa-o-luto.png` |
| Capa Jogo Online | `public/imagens/capa-jogo-online.png` |
| Espaço da Escolha | `public/imagens/espaco-da-escolha.png` |
| Curva do Impulso | `public/imagens/curva-do-impulso.png` |
| Estratégias Enfrentamento | `public/imagens/estrategias-enfrentamento.png` |

---

## Botão de Emergência

- Localizado no `Painel.jsx` no cabeçalho (prop `inline={true}`)
- 5 blocos de 20 perguntas (um por módulo ISTOP)
- Mostra bloco não visto ainda (sequência aleatória sem repetição)
- Após concluir: guia de respiração 4-6-2 + mensagens de reforço
- Utilizadores sem Módulo 1: vê mensagem informativa
- Tabela Supabase: `emergencia_blocos_vistos`

---

## Conteúdo dos módulos (`src/data/modulosContent.js`)

- **Módulo 1** — 3 aulas completas + Contrato de Interrupção + 2 livros gratuitos
- **Módulo 2** — 5 aulas completas + Mapa de Gatilhos
- **Módulo 3** — 5 aulas completas + imagens (espaço da escolha, curva do impulso)
- **Módulo 4** — 5 aulas completas + Estrutura de Rotina
- **Módulo 5** — 5 aulas completas + Protocolo de Prevenção de Recaída + Certificado

---

## Próximas tarefas

- [ ] Testar pagamento MP ponta a ponta (webhook → `modulos_liberados`)
- [ ] Painel financeiro/admin (ver receita, utilizadores, pagamentos)
- [ ] Emails `@paredejogar.com` (Zoho Mail Lite R$25/mês para 5 contas)
- [ ] Verificar PDFs dos livros a abrir correctamente no Vercel
- [ ] Google Analytics ou similar
- [ ] Teste completo do fluxo: cadastro → pagamento → módulo → contrato → painel

---

## Regras importantes (nunca mudar)

- Nunca referenciar FIDE na UI
- PowerShell 5.1 no Windows — usar `Set-Clipboard`, evitar `&&`
- `external_reference` do MP tem formato: `user_{userId}_modulo_{moduloId}`
- Sócios com `liberados.length === 5` ignoram sequência de módulos
- Imagens sempre em `public/imagens/`, PDFs em `public/livros/`