import { useState } from 'react'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const symptoms = [
  'Você tenta recuperar perdas apostando mais',
  'Sente culpa após jogar',
  'Esconde suas apostas da família',
  'Perde dinheiro que precisava para outras coisas',
  'Pensa em apostas mesmo quando não está jogando',
]

const steps = [
  { n: '1', title: 'Parar de Jogar', desc: 'Interromper o ciclo viciante com técnicas baseadas em neurociência', grad: 'linear-gradient(145deg, #1B3558, #264573)' },
  { n: '2', title: 'Elaborar Perdas', desc: 'Processar o sofrimento emocional e financeiro com acolhimento', grad: 'linear-gradient(145deg, #1A6B72, #2A8A93)' },
  { n: '3', title: 'Reconstruir Identidade', desc: 'Redescobrir quem você é além do jogo', grad: 'linear-gradient(145deg, #2E7D52, #3D9B6A)' },
  { n: '4', title: 'Manter Vínculos', desc: 'Reparar relacionamentos e construir uma rede de apoio', grad: 'linear-gradient(145deg, #E07B35, #C5631C)' },
]

const pillars = [
  { letter: 'I', title: 'Interrupção', desc: 'Parar o ciclo automático antes que ele se alimente de novo.', grad: 'linear-gradient(145deg, #E07B35, #C5631C)' },
  { letter: 'S', title: 'Sensibilização', desc: 'Perceber gatilhos, emoções e pensamentos que sustentam o jogo.', grad: 'linear-gradient(145deg, #F59E0B, #D97706)' },
  { letter: 'T', title: 'Transformação', desc: 'Substituir hábitos de forma gradual, com apoio e estrutura.', grad: 'linear-gradient(145deg, #34D399, #059669)' },
  { letter: 'O', title: 'Organização', desc: 'Reorganizar tempo, finanças e rotina no dia a dia.', grad: 'linear-gradient(145deg, #60A5FA, #2563EB)' },
  { letter: 'P', title: 'Prevenção', desc: 'Antecipar recaídas e manter vínculos que sustentam a mudança.', grad: 'linear-gradient(145deg, #A78BFA, #7C3AED)' },
]

const forWho = [
  'Quem sente que o jogo ocupa cada vez mais tempo e pensamento.',
  'Quem esconde apostas ou mente sobre dinheiro e tempo de tela.',
  'Quem tentou parar sozinho e caiu no ciclo de culpa e nova tentativa.',
  'Quem quer uma abordagem séria, com linguagem clara e sem julgamento.',
]

const resources = [
  { icon: '📊', title: 'Teste de Dependência', desc: 'Avalie seu nível de envolvimento com o jogo' },
  { icon: '📋', title: 'Contrato de Interrupção', desc: 'Faça um compromisso consigo mesmo pelo Método ISTOP' },
  { icon: '✅', title: 'Check-in Diário', desc: 'Monitore seu estado emocional e risco de recaída' },
  { icon: '👨‍👩‍👧', title: 'Apoio para Famílias', desc: 'Guia para familiares de pessoas com vício em jogo' },
]

const faqItems = [
  {
    q: 'O PareDeJogar substitui acompanhamento psicológico ou médico?',
    a: 'Não. O programa oferece educação e ferramentas de reorganização comportamental. Em casos de sofrimento intenso ou comorbidades, busque profissionais de saúde.',
  },
  {
    q: 'O que significa o acrônimo ISTOP?',
    a: 'Interrupção, Sensibilização, Transformação, Organização e Prevenção — as cinco frentes do método de reorganização.',
  },
  {
    q: 'O programa é gratuito?',
    a: 'O cadastro e o acesso inicial ao conteúdo base estão disponíveis gratuitamente; eventuais expansões futuras serão comunicadas com clareza.',
  },
  {
    q: 'Como funciona o contrato de interrupção?',
    a: 'É um compromisso consigo mesmo, registrado na plataforma, que formaliza sua decisão de interromper o ciclo do jogo e seguir as etapas do método.',
  },
]

const glassPanel = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.22)',
  borderRadius: 22,
  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
}

const anchor = { scrollMarginTop: 88 }

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(160deg, #0a1628 0%, #1B3558 42%, #152a45 100%)',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '8%', right: '12%', width: 280, height: 180, borderRadius: 24, ...glassPanel, opacity: 0.55 }} className="hero-float-card hidden-mobile" />
        <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: 200, height: 120, borderRadius: 20, ...glassPanel, opacity: 0.4, animationDelay: '-2s' }} className="hero-float-card hidden-mobile" />
        <div style={{ position: 'absolute', top: '35%', right: '25%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,123,53,0.35) 0%, transparent 70%)', filter: 'blur(8px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 50% at 70% 20%, rgba(26,107,114,0.25) 0%, transparent 55%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 56, alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', padding: '8px 18px', borderRadius: 100, marginBottom: 28, backdropFilter: 'blur(12px)', flexWrap: 'wrap' }}>
              <span style={{ color: '#F4A862', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em' }}>MÉTODO ISTOP</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>Instituto · Reorganização Comportamental</span>
            </div>
            <h1 className="hero-title-gradient" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(38px, 5.5vw, 62px)', lineHeight: 1.08, marginBottom: 24, animation: 'fadeUp 0.75s ease both', fontWeight: 600 }}>
              Quando o jogo deixa de ser diversão e começa a controlar sua vida.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.75, marginBottom: 36, maxWidth: 540, animation: 'fadeUp 0.75s 0.08s ease both' }}>
              Um caminho para parar de apostar, elaborar suas perdas e reconstruir sua vida — com base em ciência e acolhimento humano, na linha do <strong style={{ color: 'rgba(255,255,255,0.92)' }}>Instituto ISTOP</strong>.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fadeUp 0.75s 0.16s ease both' }}>
              <Link to="/cadastrar" className="btn-primary" style={{ fontSize: 16, padding: '15px 28px' }}>Começar Agora — Gratuito</Link>
              <a href="#contato" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.12)', fontSize: 16, padding: '15px 28px' }}>Fale conosco</a>
              <a href="#metodo" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.08)', fontSize: 16, padding: '15px 28px' }}>Conhecer o Método</a>
            </div>
          </div>

          <div style={{ ...glassPanel, padding: '32px 26px', minWidth: 300, maxWidth: 340 }} className="hidden-mobile">
            <div style={{ fontFamily: 'DM Serif Display', fontSize: 26, color: 'white', textAlign: 'center', marginBottom: 4, fontWeight: 600 }}>ISTOP</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textAlign: 'center', marginBottom: 22, letterSpacing: '0.04em' }}>Método de Reorganização</div>
            {[
              { name: 'Interrupção', sub: 'Parar o Ciclo', color: '#E07B35', icon: '🛑' },
              { name: 'Sensibilização', sub: 'Tomar Consciência', color: '#F59E0B', icon: '🧠' },
              { name: 'Transformação', sub: 'Mudar os Hábitos', color: '#34D399', icon: '💪' },
              { name: 'Organização', sub: 'Nova Rotina', color: '#60A5FA', icon: '📅' },
              { name: 'Prevenção', sub: 'Evitar Recaída', color: '#A78BFA', icon: '🛡️' },
            ].map((step, i) => (
              <div key={step.name} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(145deg, ${step.color}35, ${step.color}18)`, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{step.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE INSTITUTO */}
      <section id="sobre" className="section" style={{ ...anchor, background: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--navy)', marginBottom: 20 }}>Sobre o Instituto ISTOP</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px, 2vw, 18px)', maxWidth: 720, margin: '0 auto', lineHeight: 1.8 }}>
            O <strong style={{ color: 'var(--navy)' }}>Instituto ISTOP</strong> reúne práticas de <strong>reorganização comportamental</strong> voltadas a pessoas que vivenciam perda de controle com jogos e apostas online.
            O programa <strong>PareDeJogar</strong> traduz esse método em ferramentas acessíveis: educação em neurociência do hábito, contrato de interrupção, acompanhamento por módulos e check-in de risco.
          </p>
        </div>
      </section>

      {/* 5 PILARES */}
      <section id="pilares" className="section" style={{ ...anchor, background: 'transparent', paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(28px, 4vw, 38px)', color: 'var(--navy)', marginBottom: 12 }}>Os 5 pilares do método ISTOP</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 48 }}>Cada letra orienta uma fase da sua jornada.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
            {pillars.map((p) => (
              <div key={p.letter} className="card" style={{ textAlign: 'center', borderRadius: 22, padding: '26px 20px' }}>
                <div style={{ width: 52, height: 52, margin: '0 auto 14px', borderRadius: '50%', background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DM Serif Display', fontSize: 22, fontWeight: 700, boxShadow: '0 8px 22px rgba(0,0,0,0.15)' }}>{p.letter}</div>
                <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 18, color: 'var(--navy)', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ETAPAS */}
      <section id="metodo" className="section" style={{ ...anchor, background: 'transparent', paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(27,53,88,0.08)', color: 'var(--navy)', padding: '8px 18px', borderRadius: 100, fontSize: 11, fontWeight: 600, marginBottom: 20, letterSpacing: '0.08em', border: '1px solid rgba(0,0,0,0.06)' }}>O CAMINHO DA RECUPERAÇÃO</div>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(32px, 4vw, 42px)', color: 'var(--navy)', marginBottom: 12 }}>4 etapas para recuperar o controle</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 52 }}>O Método ISTOP guia você por uma jornada estruturada de mudança</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
            {steps.map((step) => (
              <div key={step.n} className="card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden', borderRadius: 22, padding: '28px 22px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: step.grad, borderRadius: '22px 22px 0 0' }} />
                <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 18px', background: step.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                  <span style={{ fontFamily: 'DM Serif Display', fontSize: 22, color: 'white', fontWeight: 600 }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 21, color: 'var(--navy)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section id="para-quem" className="section" style={{ ...anchor, background: 'transparent', paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(28px, 4vw, 38px)', color: 'var(--navy)', marginBottom: 12 }}>Para quem é este programa</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 40 }}>Você não precisa estar no fundo do poço para pedir ajuda.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, textAlign: 'left' }}>
            {forWho.map((text, i) => (
              <div key={i} className="glass-card" style={{ padding: '22px 22px', borderRadius: 20 }}>
                <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SINAIS */}
      <section id="sinais" className="section" style={{ ...anchor, background: 'transparent', paddingTop: 0 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(30px, 4vw, 40px)', color: 'var(--navy)', marginBottom: 12 }}>Talvez o jogo já esteja afetando sua vida</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 48 }}>Reconheça os sinais. Você não está sozinho.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 40 }}>
            {symptoms.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'center', textAlign: 'left', borderRadius: 20 }}>
                <div className="icon-circle" style={{ width: 44, height: 44, fontSize: 18 }}>⚠️</div>
                <span style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'DM Serif Display', fontSize: 24, background: 'linear-gradient(135deg, var(--teal), var(--navy))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Você não está sozinho. É possível sair desse ciclo.
          </p>
        </div>
      </section>

      {/* LUTOS + CONTATO */}
      <section id="lutos" className="section" style={{ ...anchor, background: 'linear-gradient(165deg, #152a45 0%, #1B3558 50%, #0f1f35 100%)', borderRadius: 0 }}>
        <div id="contato" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(32px, 4vw, 40px)', color: 'white', lineHeight: 1.2, marginBottom: 24 }}>Além do dinheiro, o jogo deixa outros lutos.</h2>
            {['Perda de dinheiro e segurança financeira', 'Perda de confiança — de si mesmo e dos outros', 'Perda de autoestima e dignidade', 'Perda de relacionamentos importantes'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
                <div className="icon-circle" style={{ width: 36, height: 36, fontSize: 14, background: 'linear-gradient(145deg, rgba(224,123,53,0.35), rgba(224,123,53,0.1))', border: '1px solid rgba(255,255,255,0.2)' }}>●</div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, lineHeight: 1.55 }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 22, padding: '36px 32px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 26, color: 'white', marginBottom: 8 }}>Dê o primeiro passo</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 24, fontSize: 14 }}>Fale conosco. Receba orientação gratuita.</p>
            <LeadForm dark />
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="section" style={{ ...anchor, background: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(32px, 4vw, 42px)', color: 'var(--navy)', marginBottom: 12 }}>Recursos Gratuitos</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 48 }}>Ferramentas para apoiar sua recuperação</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {resources.map((r, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', borderRadius: 22, padding: '28px 22px' }}>
                <div className="icon-circle" style={{ margin: '0 auto 18px', width: 56, height: 56, fontSize: 26 }}>{r.icon}</div>
                <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 19, color: 'var(--navy)', marginBottom: 8 }}>{r.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            <Link to="/quiz" className="btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>
              Fazer o teste
            </Link>
            <Link
              to="/quiz/familias"
              className="btn-secondary"
              style={{ fontSize: 16, padding: '14px 28px', borderColor: 'rgba(27,53,88,0.2)', color: 'var(--navy)', background: 'rgba(255,255,255,0.95)' }}
            >
              Teste para familiares
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" style={{ ...anchor, background: 'transparent', paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(28px, 4vw, 38px)', color: 'var(--navy)', marginBottom: 12, textAlign: 'center' }}>Perguntas frequentes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 36, textAlign: 'center' }}>Transparência sobre o programa e o método ISTOP.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqItems.map((item, i) => (
              <div key={i} className="card" style={{ padding: 0, borderRadius: 18, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '18px 22px',
                    background: openFaq === i ? 'rgba(99,102,241,0.06)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: 15,
                    color: 'var(--navy)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {item.q}
                  <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p style={{ padding: '0 22px 18px', color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section" style={{ background: 'linear-gradient(145deg, #1a5c62 0%, #1B3558 55%, #0f2240 100%)', textAlign: 'center', borderRadius: 0 }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(34px, 5vw, 44px)', color: 'white', marginBottom: 16, lineHeight: 1.15 }}>Dê o primeiro passo para uma nova vida.</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 18, marginBottom: 36, lineHeight: 1.65 }}>O processo de mudança começa com uma decisão consciente. Estamos aqui para ajudar.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cadastrar" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px' }}>Começar pelo Módulo 1</Link>
            <Link to="/entrar" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', background: 'rgba(255,255,255,0.12)', fontSize: 17, padding: '15px 32px' }}>Já tenho conta</Link>
            <a href="#sobre" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', background: 'transparent', fontSize: 17, padding: '15px 32px' }}>Sobre o Instituto</a>
          </div>
        </div>
      </section>
    </div>
  )
}
