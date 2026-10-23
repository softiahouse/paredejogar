// src/pages/LandingPage.jsx — Portal PareDeJogar / Instituto ISTOP
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import '../portal.css'

/* ─────────────────────────────────────────────
   CONTEÚDO EDITÁVEL
   Preencha aqui quando o material chegar.
   ───────────────────────────────────────────── */

// ID do vídeo no YouTube (o trecho depois de "v=" no link). Vazio = "em breve".
const VIDEO_YOUTUBE_ID = ''

// Corpo docente. Adicione { nome, papel, bio, foto } — foto é opcional (ex.: '/imagens/docentes/marcelo.jpg').
const DOCENTES = [
  {
    nome: 'Marcelo R. Paulo',
    papel: 'Conteúdo do programa',
    bio: 'Autor do livro O Luto, material de apoio do Módulo 1.',
  },
]
const VAGAS_DOCENTES = 3 // quantos lugares "em breve" mostrar

// Depoimentos. Só publique relatos reais, com autorização.
const DEPOIMENTOS = {
  jogadores: {
    rotulo: 'Jogadores',
    itens: [
      'Comecei apostando por diversão, mas logo estava usando o dinheiro do aluguel tentando recuperar perdas.',
      'O jogo virou uma forma de fugir do estresse. Quando percebi, estava gastando parte do meu salário.',
      'Depois do divórcio comecei a apostar escondido à noite. Só percebi o problema quando vieram as dívidas.',
      'Eu acreditava que a sorte iria mudar. Mas na verdade estava presa no ciclo do jogo.',
    ],
    fonte: 'Histórias baseadas em casos reais descritos no livro Jogos Online, Vício de Bolso.',
  },
  familiares: {
    rotulo: 'Familiares',
    itens: [],
    vazio: 'Estamos reunindo relatos de mães, pais, cônjuges e filhos que acompanharam alguém nesse caminho.',
  },
  profissionais: {
    rotulo: 'Profissionais',
    itens: [],
    vazio: 'Psicólogos e psiquiatras que atuam com ludopatia vão compartilhar aqui o que observam no consultório.',
  },
}

const MODULOS = [
  { n: 1, l: 'I', nome: 'Interrupção', desc: 'Entender como o ciclo do jogo se instala e dar o primeiro passo para sair do piloto automático.', info: '3 aulas, Contrato de Interrupção e 2 livros' },
  { n: 2, l: 'S', nome: 'Sensibilização', desc: 'Identificar o que aciona o impulso: emoções, pensamentos e ambientes. O comportamento ganha nome e perde força.', info: '5 aulas e Mapa de Gatilhos ISTOP' },
  { n: 3, l: 'T', nome: 'Autorregulação', desc: 'Criar uma pausa entre o gatilho e a ação. Aqui começa o controle real, construído por você.', info: '5 aulas e Plano Pessoal de Manejo' },
  { n: 4, l: 'O', nome: 'Reorganização', desc: 'Substituir hábitos antigos por novos padrões e reconstruir a rotina para sustentar a mudança.', info: '5 aulas e Estrutura de Rotina' },
  { n: 5, l: 'P', nome: 'Prevenção de recaídas', desc: 'Consolidar o que mudou e montar estratégias para reduzir o risco de recaída ao longo do tempo.', info: '5 aulas, Protocolo de Prevenção e Certificado' },
]

const ISTOP = [
  ['I', 'Interrupção'], ['S', 'Sensibilização'], ['T', 'Transformação'], ['O', 'Organização'], ['P', 'Prevenção'],
]

const SINAIS = [
  'Só mais uma rodada para recuperar o que perdi.',
  'Jogo por diversão, mas às vezes fico horas sem perceber.',
  'Já menti para minha família sobre quanto gastei.',
  'Quando ganho, reinvisto tudo. Quando perco, dobro a aposta.',
  'Penso em apostas mesmo quando estou trabalhando.',
  'Tentei parar várias vezes. Mas sempre volto.',
]

const FAQS = [
  { p: 'O programa é pago?', r: 'Não. Todo o programa é gratuito: basta criar sua conta e confirmar o e-mail. Os módulos seguem uma ordem, e o próximo é liberado quando você conclui o anterior, porque cada etapa prepara a seguinte.' },
  { p: 'O programa substitui tratamento psicológico?', r: 'Não. O programa é psicoeducacional e complementar. Em casos de dependência grave, o acompanhamento com profissional de saúde mental é fundamental, e o ISTOP pode ser feito em paralelo. No diretório você encontra especialistas na sua cidade.' },
  { p: 'Funciona para qualquer tipo de aposta?', r: 'Sim. O método foi desenvolvido para comportamentos compulsivos com apostas em geral, como esportes, cassinos online e jogos de azar, com foco especial nas bets.' },
  { p: 'Quanto tempo por dia preciso dedicar?', r: 'Cada aula leva entre 15 e 25 minutos, e as atividades práticas cerca de 3 minutos. O programa foi pensado para caber na rotina de quem trabalha.' },
  { p: 'Existe prazo para concluir?', r: 'Não. Você faz no seu ritmo, e o acesso continua disponível na sua conta.' },
  { p: 'Sou familiar. Posso usar a plataforma?', r: 'Sim. Comece pelo termômetro para familiares, que ajuda a entender o que você está observando. O blog e o diretório de especialistas também são abertos.' },
]

/* ───────── Ícones ───────── */
const IconArrow = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const IconClose = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" fill="rgba(255,255,255,.2)" /><path d="M5.5 9.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/* ───────── Folha (sheet estilo iOS) ───────── */
function Sheet({ titulo, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="pt-sheet-backdrop" onClick={onClose}>
      <div
        className="pt-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-sheet-grabber" />
        <div className="pt-sheet-head">
          <h2>{titulo}</h2>
          <button type="button" className="pt-close" onClick={onClose} aria-label="Fechar">
            <IconClose />
          </button>
        </div>
        <div className="pt-sheet-body">{children}</div>
      </div>
    </div>
  )
}

/* ───────── Termômetro (SVG) ───────── */
function Gauge() {
  return (
    <svg className="pt-gauge" viewBox="0 0 200 116" role="img" aria-label="Termômetro da relação com o jogo">
      <defs>
        <linearGradient id="ptg" x1="0" x2="1">
          <stop offset="0" stopColor="#7fbf4a" />
          <stop offset=".55" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#c8462e" />
        </linearGradient>
      </defs>
      <path d="M18 100a82 82 0 0 1 164 0" fill="none" stroke="rgba(21,38,28,.08)" strokeWidth="18" strokeLinecap="round" />
      <path d="M18 100a82 82 0 0 1 164 0" fill="none" stroke="url(#ptg)" strokeWidth="18" strokeLinecap="round" />
      <g className="pt-gauge-needle">
        <path d="M100 100L100 34" stroke="#15261c" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="100" r="9" fill="#15261c" />
      <circle cx="100" cy="100" r="3.5" fill="#fff" />
    </svg>
  )
}

/* ───────── Vídeo ───────── */
function Video() {
  const [tocando, setTocando] = useState(false)
  const temVideo = Boolean(VIDEO_YOUTUBE_ID)

  if (temVideo && tocando) {
    return (
      <div className="pt-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_YOUTUBE_ID}?autoplay=1&rel=0`}
          title="Por que tratar a ludopatia"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      className="pt-video-frame"
      onClick={() => setTocando(true)}
      disabled={!temVideo}
      aria-label={temVideo ? 'Assistir ao vídeo' : 'Vídeo em breve'}
    >
      {temVideo && <img src={`https://i.ytimg.com/vi/${VIDEO_YOUTUBE_ID}/hqdefault.jpg`} alt="" />}
      <span className="pt-play">
        <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>
      </span>
      {!temVideo && <span className="pt-video-soon">Vídeo em breve</span>}
    </button>
  )
}

/* ───────── Página ───────── */
export default function LandingPage() {
  const [logado, setLogado] = useState(false)
  const [posts, setPosts] = useState([])
  const [folha, setFolha] = useState(null) // 'programa' | 'sinais' | 'depoimentos' | 'docentes' | 'duvidas'
  const [aba, setAba] = useState('jogadores')
  const [faqAberto, setFaqAberto] = useState(0)
  const [quoteIdx, setQuoteIdx] = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setLogado(Boolean(data.user)))
    supabase
      .from('blog_posts')
      .select('id, titulo, slug, categoria')
      .eq('publicado', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data || []))
  }, [])

  const fechar = () => setFolha(null)
  const grupo = DEPOIMENTOS[aba]
  const quote = grupo.itens.length ? grupo.itens[quoteIdx % grupo.itens.length] : null
  const cta = logado
    ? { to: '/painel', label: 'Continuar meu programa' }
    : { to: '/cadastrar', label: 'Criar conta grátis' }

  return (
    <div className="pt">
      <div className="pt-sky" aria-hidden="true"><span className="s1" /><span className="s2" /><span className="s3" /><span className="s4" /></div>

      {/* NAV */}
      <header className="pt-nav">
        <div className="pt-nav-bar pt-glass">
          <Link to="/" className="pt-nav-logo" aria-label="Instituto ISTOP, início">
            <img src="/logo-instituto-istop.svg" alt="Instituto ISTOP" />
          </Link>
          <nav className="pt-nav-links" aria-label="Seções">
            <button type="button" onClick={() => setFolha('programa')}>Programa</button>
            <Link to="/quiz">Termômetro</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/especialistas">Especialistas</Link>
          </nav>
          <div className="pt-nav-actions">
            {logado ? (
              <Link to="/painel" className="pt-btn pt-btn--solid pt-btn--sm">Meu painel</Link>
            ) : (
              <>
                <Link to="/entrar" className="pt-btn pt-btn--ghost pt-btn--sm">Entrar</Link>
                <Link to="/cadastrar" className="pt-btn pt-btn--solid pt-btn--sm">Criar conta</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-main">
        <div className="pt-grid">
          {/* HERO */}
          <section className="pt-glass pt-tile pt-hero pt-span-7" aria-labelledby="pt-hero-t">
            <h1 className="pt-hero-word" id="pt-hero-t">
              <span className="pare">PARE</span>
              <span className="viva">VIVA</span>
            </h1>
            <p className="pt-hero-quote">Quando o jogo deixa de ser diversão e começa a controlar sua vida.</p>
            <p className="pt-hero-desc">
              Um programa gratuito para parar de apostar, elaborar as perdas e reconstruir a vida,
              com base científica e acolhimento.
            </p>
            <div className="pt-tile-foot">
              <Link to={cta.to} className="pt-btn pt-btn--solid">{cta.label}</Link>
              <Link to="/quiz" className="pt-btn pt-btn--glass">Fazer o termômetro</Link>
            </div>
            {!logado && <p className="pt-hero-note">Sem custo. Você só precisa de um e-mail.</p>}
          </section>

          {/* VÍDEO */}
          <section className="pt-glass pt-glass--dark pt-tile pt-video pt-span-5" aria-labelledby="pt-video-t">
            <Video />
            <div className="pt-video-meta">
              <h2 className="pt-tile-title" id="pt-video-t">Por que tratar a ludopatia</h2>
              <p className="pt-tile-text" style={{ marginBottom: 0 }}>
                Marcelo R. Paulo explica, em um minuto, por que o vício em apostas é uma questão de saúde e tem saída.
              </p>
            </div>
          </section>

          {/* PROGRAMA */}
          <section className="pt-glass pt-tile pt-span-5" aria-labelledby="pt-prog-t">
            <h2 className="pt-tile-title" id="pt-prog-t">O programa ISTOP</h2>
            <p className="pt-tile-text">Cinco módulos em sequência, 23 aulas curtas e ferramentas práticas para usar no dia a dia.</p>
            <ul className="pt-istop pt-istop-wrap">
              {ISTOP.map(([l, n]) => (
                <li key={l}><b>{l}</b><small>{n}</small></li>
              ))}
            </ul>
            <div className="pt-tile-foot">
              <button type="button" className="pt-more" onClick={() => setFolha('programa')}>
                Ver os 5 módulos <IconArrow />
              </button>
            </div>
          </section>

          {/* TERMÔMETRO */}
          <section className="pt-glass pt-tile pt-span-4" aria-labelledby="pt-term-t">
            <h2 className="pt-tile-title" id="pt-term-t">Termômetro</h2>
            <p className="pt-tile-text">12 perguntas sobre a relação com o jogo. O resultado sai na hora.</p>
            <Gauge />
            <div className="pt-tile-foot" style={{ marginTop: 14 }}>
              <Link to="/quiz" className="pt-btn pt-btn--solid pt-btn--sm">Fazer para mim</Link>
              <Link to="/quiz/familias" className="pt-btn pt-btn--glass pt-btn--sm">Para um familiar</Link>
            </div>
            <div style={{ marginTop: 12 }}>
              <button type="button" className="pt-more" onClick={() => setFolha('sinais')}>
                Sinais de alerta <IconArrow />
              </button>
            </div>
          </section>

          {/* CTA GRÁTIS */}
          <section className="pt-glass pt-tile pt-cta pt-span-3" aria-labelledby="pt-cta-t">
            <h2 className="pt-tile-title" id="pt-cta-t">Tudo gratuito</h2>
            <ul className="pt-cta-list">
              <li><IconCheck />Os 5 módulos completos</li>
              <li><IconCheck />2 livros para baixar</li>
              <li><IconCheck />Botão de emergência para os momentos de impulso</li>
              <li><IconCheck />Certificado ao concluir</li>
            </ul>
            <div className="pt-tile-foot">
              <Link to={cta.to} className="pt-btn pt-btn--light pt-btn--sm">{logado ? 'Abrir meu painel' : 'Começar agora'}</Link>
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <section className="pt-glass pt-tile pt-span-7" aria-labelledby="pt-depo-t">
            <h2 className="pt-tile-title" id="pt-depo-t">Quem passou por isso</h2>
            <div className="pt-seg" role="group" aria-label="Tipo de depoimento" style={{ marginTop: 8 }}>
              {Object.entries(DEPOIMENTOS).map(([k, g]) => (
                <button key={k} type="button" aria-pressed={aba === k} onClick={() => { setAba(k); setQuoteIdx(0) }}>
                  {g.rotulo}
                </button>
              ))}
            </div>
            {quote ? (
              <>
                <blockquote className="pt-quote">“{quote}”</blockquote>
                <p className="pt-quote-src">{grupo.fonte}</p>
              </>
            ) : (
              <p className="pt-soon">{grupo.vazio} Em breve.</p>
            )}
            <div className="pt-tile-foot">
              {grupo.itens.length > 1 && (
                <button type="button" className="pt-btn pt-btn--glass pt-btn--sm" onClick={() => setQuoteIdx((i) => i + 1)}>
                  Próximo relato
                </button>
              )}
              <button type="button" className="pt-more" onClick={() => setFolha('depoimentos')}>
                Ler todos os relatos <IconArrow />
              </button>
            </div>
          </section>

          {/* CORPO DOCENTE */}
          <section className="pt-glass pt-tile pt-span-5" aria-labelledby="pt-doc-t">
            <h2 className="pt-tile-title" id="pt-doc-t">Corpo docente</h2>
            <p className="pt-tile-text">Quem escreve e revisa o conteúdo do programa.</p>
            <div className="pt-faces">
              {DOCENTES.map((d) => (
                <span key={d.nome} className="pt-face" title={d.nome}>
                  {d.foto ? <img src={d.foto} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : d.nome.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </span>
              ))}
              {Array.from({ length: VAGAS_DOCENTES }).map((_, i) => (
                <span key={i} className="pt-face pt-face--soon" aria-hidden="true">?</span>
              ))}
            </div>
            <div className="pt-tile-foot">
              <button type="button" className="pt-more" onClick={() => setFolha('docentes')}>
                Conhecer a equipe <IconArrow />
              </button>
            </div>
          </section>

          {/* BLOG */}
          <section className="pt-glass pt-tile pt-span-4" aria-labelledby="pt-blog-t">
            <h2 className="pt-tile-title" id="pt-blog-t">Blog</h2>
            {posts.length > 0 ? (
              <div style={{ marginBottom: 14 }}>
                {posts.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="pt-post">
                    <small>{p.categoria}</small>
                    <span>{p.titulo}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="pt-tile-text">Artigos gratuitos para entender o ciclo do jogo, sem precisar de cadastro.</p>
            )}
            <div className="pt-tile-foot">
              <Link to="/blog" className="pt-more">Ver todos os artigos <IconArrow /></Link>
            </div>
          </section>

          {/* ESPECIALISTAS */}
          <section className="pt-glass pt-tile pt-span-4" aria-labelledby="pt-esp-t">
            <h2 className="pt-tile-title" id="pt-esp-t">Especialistas</h2>
            <p className="pt-tile-text">
              Diretório nacional de psicólogos e psiquiatras que tratam a dependência de apostas, presencial ou online.
            </p>
            <div className="pt-tile-foot">
              <Link to="/especialistas" className="pt-btn pt-btn--solid pt-btn--sm">Buscar na minha cidade</Link>
              <Link to="/especialistas?aba=cadastro" className="pt-btn pt-btn--ghost pt-btn--sm">Sou profissional</Link>
            </div>
          </section>

          {/* DÚVIDAS */}
          <section className="pt-glass pt-tile pt-span-4" aria-labelledby="pt-faq-t">
            <h2 className="pt-tile-title" id="pt-faq-t">Dúvidas</h2>
            <ul className="pt-qlist">
              {FAQS.slice(0, 3).map((f) => <li key={f.p}>{f.p}</li>)}
            </ul>
            <div className="pt-tile-foot">
              <button type="button" className="pt-more" onClick={() => setFolha('duvidas')}>
                Ver respostas <IconArrow />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="pt-foot">
        <div className="pt-foot-inner pt-glass">
          <span>© {new Date().getFullYear()} Instituto ISTOP</span>
          <nav aria-label="Rodapé">
            <Link to="/termos">Termos de uso</Link>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/especialistas">Especialistas</Link>
          </nav>
          <span className="pt-crise">Em crise? Ligue 188 (CVV), 24 horas, gratuito.</span>
        </div>
      </footer>

      {/* FOLHAS */}
      {folha === 'programa' && (
        <Sheet titulo="O programa ISTOP" onClose={fechar}>
          <p>Cada módulo prepara o seguinte. Você conclui um e o próximo é liberado, no seu ritmo.</p>
          <div className="pt-stack" style={{ marginTop: 18 }}>
            {MODULOS.map((m) => (
              <div key={m.n} className="pt-card pt-mod">
                <span className="pt-mod-letter" aria-hidden="true">{m.l}</span>
                <div>
                  <h4>Módulo {m.n}: {m.nome}</h4>
                  <p>{m.desc}</p>
                  <small>{m.info}</small>
                </div>
              </div>
            ))}
          </div>
          <h3>Por que o método funciona</h3>
          <p>O ISTOP foi desenvolvido com base em evidências de psicologia comportamental e neurociência aplicada à dependência.</p>
          <div className="pt-cols" style={{ margin: '14px 0 16px' }}>
            {[
              ['85%', 'dos apostadores compulsivos nunca buscam ajuda por não saber por onde começar'],
              ['6 em 10', 'pessoas que completam programas psicoeducacionais reduzem ou cessam o comportamento'],
              ['15 min', 'é o tempo médio de um impulso intenso, se você não agir sobre ele'],
            ].map(([n, d]) => (
              <div key={n} className="pt-card pt-stat"><b>{n}</b><span>{d}</span></div>
            ))}
          </div>
          <div className="pt-chips">
            {['Terapia Cognitivo-Comportamental', 'Neurociência da dependência', 'Prevenção de recaída', 'Regulação emocional', 'Psicoeducação'].map((b) => (
              <span key={b} className="pt-chip">{b}</span>
            ))}
          </div>
          <div className="pt-sheet-cta">
            <Link to={cta.to} className="pt-btn pt-btn--solid">{cta.label}</Link>
          </div>
        </Sheet>
      )}

      {folha === 'sinais' && (
        <Sheet titulo="Você se reconhece?" onClose={fechar}>
          <p>Milhões de pessoas vivem esse ciclo em silêncio. Estes pensamentos são comuns em quem já perdeu o controle das apostas:</p>
          <div className="pt-cols" style={{ marginTop: 16 }}>
            {SINAIS.map((s) => <div key={s} className="pt-card">“{s}”</div>)}
          </div>
          <p style={{ marginTop: 20 }}>Esses pensamentos não são fraqueza. São sinais de um ciclo que pode ser interrompido.</p>
          <div className="pt-sheet-cta">
            <Link to="/quiz" className="pt-btn pt-btn--solid">Fazer o termômetro</Link>
            <Link to="/quiz/familias" className="pt-btn pt-btn--glass">Termômetro para familiares</Link>
          </div>
        </Sheet>
      )}

      {folha === 'depoimentos' && (
        <Sheet titulo="Quem passou por isso" onClose={fechar}>
          {Object.entries(DEPOIMENTOS).map(([k, g]) => (
            <div key={k}>
              <h3>{g.rotulo}</h3>
              {g.itens.length ? (
                <>
                  <div className="pt-cols">
                    {g.itens.map((t) => <div key={t} className="pt-card">“{t}”</div>)}
                  </div>
                  {g.fonte && <p style={{ fontSize: 14, marginTop: 10 }}>{g.fonte}</p>}
                </>
              ) : (
                <p className="pt-soon">{g.vazio} Em breve.</p>
              )}
            </div>
          ))}
        </Sheet>
      )}

      {folha === 'docentes' && (
        <Sheet titulo="Corpo docente" onClose={fechar}>
          <p>Profissionais e autores responsáveis pelo conteúdo do Método ISTOP.</p>
          <div className="pt-cols" style={{ marginTop: 16 }}>
            {DOCENTES.map((d) => (
              <div key={d.nome} className="pt-card">
                <span className="pt-face" style={{ marginBottom: 12 }}>{d.nome.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
                <h4 style={{ margin: '0 0 2px', font: '700 18px var(--f-display)' }}>{d.nome}</h4>
                <small style={{ color: 'var(--folha)', fontWeight: 600 }}>{d.papel}</small>
                <p style={{ margin: '8px 0 0', fontSize: 15 }}>{d.bio}</p>
              </div>
            ))}
            <div className="pt-soon" style={{ margin: 0 }}>Novos nomes do corpo docente serão apresentados em breve.</div>
          </div>
        </Sheet>
      )}

      {folha === 'duvidas' && (
        <Sheet titulo="Dúvidas frequentes" onClose={fechar}>
          {FAQS.map((f, i) => (
            <div key={f.p} className="pt-faq" data-open={faqAberto === i}>
              <button type="button" aria-expanded={faqAberto === i} onClick={() => setFaqAberto(faqAberto === i ? null : i)}>
                {f.p} <IconPlus />
              </button>
              {faqAberto === i && <p>{f.r}</p>}
            </div>
          ))}
        </Sheet>
      )}
    </div>
  )
}
