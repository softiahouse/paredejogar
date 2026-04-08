import { useState } from 'react'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'
import '../landing-instituto.css'

const faqItems = [
  {
    q: 'O PareDeJogar substitui acompanhamento psicológico ou médico?',
    a: 'Não. O programa oferece educação e ferramentas de reorganização comportamental. Em casos de sofrimento intenso ou comorbidades, busque profissionais de saúde.',
  },
  {
    q: 'O que significa o acrônimo ISTOP?',
    aJsx: (
      <p>
        <strong>I</strong>nterrupção, <strong>S</strong>ensibilização, <strong>T</strong>ransformação, <strong>O</strong>rganização e <strong>P</strong>revenção — as cinco frentes do método de reorganização.
      </p>
    ),
  },
  {
    q: 'O programa é gratuito?',
    a: 'O cadastro e acesso inicial ao conteúdo base estão disponíveis gratuitamente; eventuais expansões futuras serão comunicadas com clareza.',
  },
  {
    q: 'Como funciona o contrato de interrupção?',
    a: 'É um compromisso consigo mesmo, registrado na plataforma, que formaliza sua decisão de interromper o ciclo do jogo e seguir as etapas do método.',
  },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0)

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <div className="landing-page-root">
      <header className="hero-creme">
        <div className="hero-inner">
          <div>
            <div className="badge">
              <strong>MÉTODO ISTOP</strong>
              <span style={{ color: 'rgba(27,53,88,0.55)' }}>Instituto · Reorganização Comportamental</span>
            </div>
            <h1>
              <span className="hero-title-pare">PARE</span> de apostar. <span className="hero-title-viva">VIVA</span> de novo.
            </h1>
            <p>
              Um caminho para parar de apostar, elaborar suas perdas e reconstruir sua vida — com base em ciência e acolhimento humano, na linha do <strong>Instituto ISTOP</strong>.
            </p>
            <div className="hero-ctas">
              <a href="#contato" className="btn-primary">
                Começar agora — gratuito
              </a>
              <a href="#metodo" className="btn-secondary">
                Conhecer o método
              </a>
            </div>
          </div>
          <aside className="istop-panel">
            <h2>ISTOP</h2>
            <p className="sub">Método de Reorganização</p>
            <div className="istop-row">
              <div className="istop-icon" style={{ background: 'linear-gradient(145deg, rgba(224,123,53,0.25), rgba(224,123,53,0.1))' }}>
                🛑
              </div>
              <div>
                <strong>Interrupção</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Parar o ciclo</small>
              </div>
            </div>
            <div className="istop-row">
              <div className="istop-icon" style={{ background: 'linear-gradient(145deg, rgba(245,158,11,0.25), rgba(245,158,11,0.1))' }}>
                🧠
              </div>
              <div>
                <strong>Sensibilização</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Tomar consciência</small>
              </div>
            </div>
            <div className="istop-row">
              <div className="istop-icon" style={{ background: 'linear-gradient(145deg, rgba(52,211,153,0.25), rgba(52,211,153,0.1))' }}>
                💪
              </div>
              <div>
                <strong>Transformação</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Mudar hábitos</small>
              </div>
            </div>
            <div className="istop-row">
              <div className="istop-icon" style={{ background: 'linear-gradient(145deg, rgba(96,165,250,0.25), rgba(96,165,250,0.1))' }}>
                📅
              </div>
              <div>
                <strong>Organização</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Nova rotina</small>
              </div>
            </div>
            <div className="istop-row">
              <div className="istop-icon" style={{ background: 'linear-gradient(145deg, rgba(167,139,250,0.25), rgba(167,139,250,0.1))' }}>
                🛡️
              </div>
              <div>
                <strong>Prevenção</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Evitar recaída</small>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="sobre" className="section anchor">
          <div className="container">
            <h2>Sobre o Instituto ISTOP</h2>
            <p>
              O <strong>Instituto ISTOP</strong> reúne práticas de <strong>reorganização comportamental</strong> voltadas a pessoas que vivenciam perda de controle com jogos e apostas online. O programa <strong>PareDeJogar</strong> traduz esse método em ferramentas acessíveis: educação em neurociência do hábito, contrato de interrupção, acompanhamento por módulos e check-in de risco.
            </p>
          </div>
        </section>

        <section id="pilares" className="section anchor">
          <div className="container">
            <h2 className="section-title">Os 5 pilares do método ISTOP</h2>
            <p className="section-sub">Cada letra orienta uma fase da sua jornada.</p>
            <div className="grid">
              <article className="pillar-card">
                <div className="letter" style={{ background: 'linear-gradient(145deg, #E07B35, #C5631C)' }}>
                  I
                </div>
                <h3>Interrupção</h3>
                <p>Parar o ciclo automático antes que ele se alimente de novo.</p>
              </article>
              <article className="pillar-card">
                <div className="letter" style={{ background: 'linear-gradient(145deg, #F59E0B, #D97706)' }}>
                  S
                </div>
                <h3>Sensibilização</h3>
                <p>Perceber gatilhos, emoções e pensamentos que sustentam o jogo.</p>
              </article>
              <article className="pillar-card">
                <div className="letter" style={{ background: 'linear-gradient(145deg, #34D399, #059669)' }}>
                  T
                </div>
                <h3>Transformação</h3>
                <p>Substituir hábitos de forma gradual, com apoio e estrutura.</p>
              </article>
              <article className="pillar-card">
                <div className="letter" style={{ background: 'linear-gradient(145deg, #60A5FA, #2563EB)' }}>
                  O
                </div>
                <h3>Organização</h3>
                <p>Reorganizar tempo, finanças e rotina no dia a dia.</p>
              </article>
              <article className="pillar-card">
                <div className="letter" style={{ background: 'linear-gradient(145deg, #A78BFA, #7C3AED)' }}>
                  P
                </div>
                <h3>Prevenção</h3>
                <p>Antecipar recaídas e manter vínculos que sustentam a mudança.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="metodo" className="section anchor">
          <div className="container">
            <h2 className="section-title">4 etapas para recuperar o controle</h2>
            <p className="section-sub">O caminho da recuperação no programa PareDeJogar.</p>
            <div className="steps">
              <article className="step-card">
                <div className="bar" style={{ background: 'linear-gradient(90deg, #1B3558, #264573)' }} />
                <div className="num" style={{ background: 'linear-gradient(145deg, #1B3558, #264573)' }}>
                  1
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", color: 'var(--lp-navy)', marginBottom: 8 }}>Parar de jogar</h3>
                <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem' }}>Interromper o ciclo com técnicas baseadas em neurociência.</p>
              </article>
              <article className="step-card">
                <div className="bar" style={{ background: 'linear-gradient(90deg, #1A6B72, #2A8A93)' }} />
                <div className="num" style={{ background: 'linear-gradient(145deg, #1A6B72, #2A8A93)' }}>
                  2
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", color: 'var(--lp-navy)', marginBottom: 8 }}>Elaborar perdas</h3>
                <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem' }}>Processar impacto emocional e financeiro com acolhimento.</p>
              </article>
              <article className="step-card">
                <div className="bar" style={{ background: 'linear-gradient(90deg, #2E7D52, #3D9B6A)' }} />
                <div className="num" style={{ background: 'linear-gradient(145deg, #2E7D52, #3D9B6A)' }}>
                  3
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", color: 'var(--lp-navy)', marginBottom: 8 }}>Reconstruir identidade</h3>
                <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem' }}>Redescobrir quem você é além do jogo.</p>
              </article>
              <article className="step-card">
                <div className="bar" style={{ background: 'linear-gradient(90deg, #E07B35, #C5631C)' }} />
                <div className="num" style={{ background: 'linear-gradient(145deg, #E07B35, #C5631C)' }}>
                  4
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display',serif", color: 'var(--lp-navy)', marginBottom: 8 }}>Manter vínculos</h3>
                <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem' }}>Reparar relacionamentos e rede de apoio.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="para-quem" className="section anchor">
          <div className="container">
            <h2 className="section-title">Para quem é este programa</h2>
            <p className="section-sub">Você não precisa estar no fundo do poço para pedir ajuda.</p>
            <div className="grid">
              <div className="for-card glass-card">
                <p>
                  Quem sente que o jogo <strong>ocupa</strong> cada vez mais tempo e pensamento.
                </p>
              </div>
              <div className="for-card glass-card">
                <p>
                  Quem <strong>esconde</strong> apostas ou mente sobre dinheiro e tempo de tela.
                </p>
              </div>
              <div className="for-card glass-card">
                <p>
                  Quem tentou parar sozinho e <strong>caiu no ciclo</strong> de culpa e nova tentativa.
                </p>
              </div>
              <div className="for-card glass-card">
                <p>
                  Quem quer uma <strong>abordagem séria</strong>, com linguagem clara e sem julgamento.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="sinais" className="section anchor">
          <div className="container">
            <h2 className="section-title">Talvez o jogo já esteja afetando sua vida</h2>
            <p className="section-sub">Reconheça os sinais. Você não está sozinho.</p>
            <div className="grid">
              <div className="glass-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span>⚠️</span> Você tenta recuperar perdas apostando mais.
              </div>
              <div className="glass-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span>⚠️</span> Sente culpa após jogar.
              </div>
              <div className="glass-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span>⚠️</span> Esconde suas apostas da família.
              </div>
              <div className="glass-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span>⚠️</span> Perde dinheiro que precisava para outras coisas.
              </div>
              <div className="glass-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span>⚠️</span> Pensa em apostas mesmo quando não está jogando.
              </div>
            </div>
            <p
              style={{
                textAlign: 'center',
                marginTop: '2.5rem',
                fontFamily: "'DM Serif Display',serif",
                fontSize: '1.35rem',
                background: 'linear-gradient(135deg, var(--teal), var(--navy))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Você não está sozinho. É possível sair desse ciclo.
            </p>
          </div>
        </section>

        <section id="lutos" className="section anchor">
          <div className="container">
            <div className="grid">
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.75rem,3vw,2.25rem)', marginBottom: '1.25rem' }}>
                  Além do dinheiro, o jogo deixa outros lutos.
                </h2>
                <ul id="lutos-list" style={{ listStyle: 'none' }}>
                  <li>● Perda de dinheiro e segurança financeira</li>
                  <li>● Perda de confiança — de si mesmo e dos outros</li>
                  <li>● Perda de autoestima e dignidade</li>
                  <li>● Perda de relacionamentos importantes</li>
                </ul>
              </div>
              <div id="contato" className="form-contact-card">
                <h3>Dê o primeiro passo</h3>
                <p className="lead">Fale conosco. Receba orientação gratuita.</p>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <section id="recursos" className="section anchor">
          <div className="container">
            <h2 className="section-title">Recursos gratuitos</h2>
            <p className="section-sub">Ferramentas para apoiar sua recuperação.</p>
            <div className="grid">
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>📊</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-navy)', marginBottom: 8 }}>Teste de dependência</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)' }}>Avalie seu nível de envolvimento com o jogo.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>📋</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-navy)', marginBottom: 8 }}>Contrato de interrupção</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)' }}>Compromisso consigo pelo método ISTOP.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>✅</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-navy)', marginBottom: 8 }}>Check-in diário</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)' }}>Monitore estado emocional e risco de recaída.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>👨‍👩‍👧</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--lp-navy)', marginBottom: 8 }}>Apoio para famílias</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)' }}>Guia para familiares de pessoas com jogo problemático.</p>
              </div>
            </div>
            <div className="recursos-quiz-btns">
              <Link to="/quiz" className="btn-primary">
                Fazer o teste
              </Link>
              <Link to="/quiz/familias" className="btn-secondary">
                Teste para familiares
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="section anchor">
          <div className="container">
            <h2 className="section-title">Perguntas frequentes</h2>
            <p className="section-sub">Transparência sobre o programa e o método ISTOP.</p>
            <div style={{ marginTop: '2rem' }}>
              {faqItems.map((item, i) => (
                <div key={item.q} className="faq-item">
                  <button type="button" className="faq-q" onClick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
                    <span>{item.q}</span>
                    <span aria-hidden>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (item.aJsx ?? <p>{item.a}</p>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta-final" className="anchor">
          <h2>Dê o primeiro passo para uma nova vida.</h2>
          <p>O processo de mudança começa com uma decisão consciente. Estamos aqui para ajudar.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cadastrar" className="btn-primary">
              Começar pelo Módulo 1
            </Link>
            <a href="#sobre" className="btn-secondary">
              Conhecer o instituto
            </a>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© Instituto ISTOP · PareDeJogar — Método de reorganização comportamental.</p>
      </footer>
    </div>
  )
}
