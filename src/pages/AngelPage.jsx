import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ── CSS ───────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --bg:      #060E03;
  --bg2:     #0C1A07;
  --card:    rgba(255,255,255,0.04);
  --card-b:  rgba(255,255,255,0.08);
  --green:   #7DC742;
  --green-d: #3B6D11;
  --green-g: #4A8F18;
  --text:    #F4F4F2;
  --text2:   rgba(244,244,242,0.55);
  --text3:   rgba(244,244,242,0.30);
  --r:       28px;
  --r-sm:    18px;
  --ff-t:    'DM Serif Display', Georgia, serif;
  --ff-b:    'DM Sans', system-ui, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.ap { font-family: var(--ff-b); background: var(--bg); color: var(--text);
  overflow-x: hidden; min-height: 100vh; }

/* scrollbar */
.ap::-webkit-scrollbar { width: 4px; }
.ap::-webkit-scrollbar-track { background: var(--bg); }
.ap::-webkit-scrollbar-thumb { background: var(--green-d); border-radius: 99px; }

/* header */
.ap-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; height: 60px;
  background: rgba(6,14,3,0.85); backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ap-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.ap-logo img { height: 30px; }
.ap-logo-text { font-family: var(--ff-t); font-size: 1rem; color: var(--green); }
.ap-header-tag {
  font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--text3); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px; padding: 4px 12px;
}

/* nav dots */
.ap-nav {
  position: fixed; right: 20px; top: 50%; transform: translateY(-50%);
  z-index: 100; display: flex; flex-direction: column; gap: 8px;
}
.ap-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.2); cursor: pointer;
  transition: background .3s, transform .3s;
}
.ap-dot.active { background: var(--green); transform: scale(1.4); }
@media(max-width:640px){ .ap-nav { display: none; } }

/* slide base */
.ap-slide {
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center; padding: 100px 24px 64px;
}
.ap-inner { max-width: 640px; margin: 0 auto; width: 100%; }

/* fade-in */
.ap-fade { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
.ap-fade.visible { opacity: 1; transform: translateY(0); }

/* kicker */
.ap-kicker {
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--green); font-weight: 600; margin-bottom: 16px;
  display: flex; align-items: center; gap: 8px;
}
.ap-kicker::before { content:''; display:block; width:20px; height:1.5px; background:var(--green); }

/* titles */
.ap-h1 { font-family: var(--ff-t); font-size: clamp(38px, 8vw, 72px);
  font-weight: 400; line-height: 1.1; }
.ap-h2 { font-family: var(--ff-t); font-size: clamp(28px, 5vw, 48px);
  font-weight: 400; line-height: 1.2; margin-bottom: 8px; }
.ap-sub { font-size: 16px; color: var(--text2); line-height: 1.7; margin-top: 16px; max-width: 520px; }

/* card */
.ap-card {
  background: var(--card); border: 1px solid var(--card-b);
  border-radius: var(--r); padding: 28px 26px;
  transition: border-color .3s;
}
.ap-card:hover { border-color: rgba(125,199,66,0.25); }

/* grid */
.ap-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.ap-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
@media(max-width:520px){
  .ap-grid-2, .ap-grid-3 { grid-template-columns: 1fr; }
}

/* big stat */
.ap-stat-num {
  font-family: var(--ff-t); font-size: clamp(36px,7vw,60px);
  color: var(--green); line-height: 1; margin-bottom: 8px;
}
.ap-stat-desc { font-size: 13px; color: var(--text2); line-height: 1.55; }

/* divider */
.ap-divider { width: 40px; height: 1.5px; background: var(--green); margin: 20px 0; opacity: .4; }

/* tag */
.ap-tag {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(125,199,66,0.1); border: 1px solid rgba(125,199,66,0.2);
  border-radius: 99px; padding: 4px 12px;
  font-size: 12px; color: var(--green); font-weight: 600;
}

/* check item */
.ap-check { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05); }
.ap-check:last-child { border-bottom: none; }
.ap-check-icon { color: var(--green); font-size: 14px; margin-top: 1px; flex-shrink: 0; }
.ap-check-text { font-size: 15px; color: var(--text2); line-height: 1.5; }
.ap-check-text strong { color: var(--text); }

/* pricing ladder */
.ap-price-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.ap-price-row:last-child { border-bottom: none; }
.ap-price-label { font-size: 14px; color: var(--text2); }
.ap-price-val { font-family: var(--ff-t); font-size: 20px; color: var(--green); }
.ap-price-bar-wrap { flex: 1; margin: 0 16px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 99px; }
.ap-price-bar { height: 100%; background: var(--green); border-radius: 99px; opacity: .7; }

/* market circles */
.ap-market { display: flex; flex-direction: column; gap: 14px; }
.ap-market-row { display: flex; align-items: center; gap: 16px; }
.ap-market-circle {
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; border: 1.5px solid rgba(125,199,66,0.3);
  font-family: var(--ff-t); font-size: 13px; color: var(--green); text-align: center;
  line-height: 1.2;
}
.ap-market-info h4 { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
.ap-market-info p { font-size: 13px; color: var(--text2); }

/* use of funds bar */
.ap-fund { margin-bottom: 12px; }
.ap-fund-header { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; }
.ap-fund-pct { color: var(--green); font-weight: 700; font-family: var(--ff-t); font-size: 18px; }
.ap-fund-bar-wrap { height: 8px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
.ap-fund-bar { height: 100%; border-radius: 99px; }

/* timeline projections */
.ap-timeline { position: relative; }
.ap-timeline::before { content:''; position:absolute; left:20px; top:0; bottom:0; width:1.5px; background:rgba(125,199,66,0.2); }
.ap-tl-row { display: flex; gap: 20px; padding: 16px 0; align-items: flex-start; }
.ap-tl-dot { width: 41px; flex-shrink: 0; display: flex; justify-content: center; margin-top: 2px; }
.ap-tl-dot-inner { width: 9px; height: 9px; border-radius: 50%; background: var(--green); border: 2px solid var(--bg); outline: 1.5px solid var(--green); }
.ap-tl-body h4 { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
.ap-tl-body p { font-size: 13px; color: var(--text2); }
.ap-tl-val { font-family: var(--ff-t); font-size: 22px; color: var(--green); margin-top: 4px; }

/* CTA final */
.ap-cta-card {
  background: linear-gradient(135deg, rgba(59,109,17,0.3), rgba(74,143,24,0.15));
  border: 1px solid rgba(125,199,66,0.25);
  border-radius: var(--r); padding: 44px 36px; text-align: center;
}
.ap-btn-primary {
  display: inline-block; background: var(--green); color: #050C02;
  padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700;
  font-family: var(--ff-b); text-decoration: none; transition: opacity .2s;
  margin-top: 28px; cursor: pointer; border: none;
}
.ap-btn-primary:hover { opacity: .88; }
.ap-btn-ghost {
  display: inline-block; background: transparent; color: var(--text2);
  padding: 14px 32px; border-radius: 14px; font-size: 15px;
  border: 1px solid rgba(255,255,255,0.12); text-decoration: none;
  margin-top: 12px; transition: border-color .2s, color .2s; cursor: pointer;
}
.ap-btn-ghost:hover { border-color: var(--green); color: var(--green); }

/* comparison table */
.ap-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ap-table th { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--text3);
  padding: 10px 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); }
.ap-table td { padding: 12px 12px; border-bottom: 1px solid rgba(255,255,255,0.04);
  color: var(--text2); vertical-align: middle; }
.ap-table td:first-child { color: var(--text); font-weight: 500; }
.ap-table td.yes { color: var(--green); font-weight: 700; }
.ap-table td.no { color: rgba(255,255,255,0.2); }
.ap-table tr.highlight td { background: rgba(125,199,66,0.05); }

/* hero slide */
.ap-hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center; padding: 100px 24px 80px;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,109,17,0.18) 0%, transparent 70%); }
.ap-hero-inner { max-width: 580px; }
.ap-hero-label { font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--green); opacity: .7; margin-bottom: 32px; }
.ap-hero-title { font-family: var(--ff-t); font-size: clamp(40px,9vw,80px);
  font-weight: 400; line-height: 1.05; margin-bottom: 24px; }
.ap-hero-title em { color: var(--green); font-style: normal; }
.ap-hero-sub { font-size: 17px; color: var(--text2); line-height: 1.7; margin-bottom: 40px; }
.ap-hero-pills { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
.ap-hero-pill {
  border: 1px solid rgba(255,255,255,0.1); border-radius: 99px;
  padding: 6px 16px; font-size: 13px; color: var(--text2);
}
.ap-scroll-hint { font-size: 12px; color: var(--text3); letter-spacing: .08em;
  animation: ap-bounce 2s ease-in-out infinite; }
@keyframes ap-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

/* slide alternância de bg */
.ap-bg-alt { background: var(--bg2); }

@media(max-width:640px){
  .ap-slide { padding: 80px 18px 48px; }
  .ap-cta-card { padding: 32px 20px; }
}
`;

/* ── Hook de scroll para fade-in ───────────────────────────────── */
function useFade(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function Fade({ children, delay = 0, tag: Tag = "div", className = "", ...props }) {
  const ref = useRef();
  useFade(ref);
  return (
    <Tag ref={ref} className={`ap-fade${className ? " " + className : ""}`}
      style={{ transitionDelay: `${delay}ms` }} {...props}>
      {children}
    </Tag>
  );
}

/* ── Slides ────────────────────────────────────────────────────── */
const SLIDES = [
  { id: "hero",       label: "Início" },
  { id: "problema",   label: "Problema" },
  { id: "solucao",    label: "Solução" },
  { id: "tracao",     label: "Tração" },
  { id: "modelo",     label: "Modelo" },
  { id: "mercado",    label: "Mercado" },
  { id: "agora",      label: "Por que agora" },
  { id: "recursos",   label: "Recursos" },
  { id: "projecoes",  label: "Projeções" },
  { id: "vantagem",   label: "Vantagem" },
  { id: "ask",        label: "Proposta" },
];

/* ── Componente principal ─────────────────────────────────────── */
export default function AngelPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = SLIDES.map(s => document.getElementById(s.id));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = sections.indexOf(e.target);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="ap">
      <style>{css}</style>

      {/* Header fixo */}
      <header className="ap-header">
        <Link to="/" className="ap-logo">
          <img src="/logo-icon.png" alt="ISTOP" />
          <span className="ap-logo-text">Instituto ISTOP</span>
        </Link>
        <span className="ap-header-tag">Investor Deck · 2026</span>
      </header>

      {/* Nav dots lateral */}
      <nav className="ap-nav" aria-label="Navegação">
        {SLIDES.map((s, i) => (
          <button key={s.id} title={s.label}
            className={`ap-dot${active === i ? " active" : ""}`}
            onClick={() => goTo(s.id)} />
        ))}
      </nav>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section id="hero" className="ap-hero">
        <div className="ap-hero-inner">
          <Fade><p className="ap-hero-label">Instituto ISTOP · Pitch para Investidores</p></Fade>
          <Fade delay={100}>
            <h1 className="ap-hero-title">
              O Brasil legalizou as bets.<br />
              Nós tratamos o que vem <em>depois.</em>
            </h1>
          </Fade>
          <Fade delay={200}>
            <p className="ap-hero-sub">
              Plataforma digital de tratamento da ludopatia baseada em TCC. Dois países, um método clínico validado, usuários pagantes desde o dia 1.
            </p>
          </Fade>
          <Fade delay={300}>
            <div className="ap-hero-pills">
              <span className="ap-hero-pill">🇧🇷 paredejogar.com</span>
              <span className="ap-hero-pill">🌎 dejadejugar.com</span>
              <span className="ap-hero-pill">US$500K pre-money</span>
              <span className="ap-hero-pill">10% equity</span>
            </div>
          </Fade>
          <Fade delay={400}>
            <p className="ap-scroll-hint">↓ scroll para ver o deck</p>
          </Fade>
        </div>
      </section>

      {/* ── 2. PROBLEMA ──────────────────────────────────────── */}
      <section id="problema" className="ap-slide ap-bg-alt">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">O Problema</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Uma crise de saúde pública sem solução acessível.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-grid-2" style={{ marginTop: 32, gap: 12 }}>
              {[
                ["13M", "brasileiros com comportamento compulsivo de apostas"],
                ["45M", "apostadores problemáticos no mundo hispânico"],
                ["85%", "nunca buscam ajuda — não sabem por onde começar"],
                ["R$2.400", "perdidos por mês pelo apostador compulsivo médio"],
              ].map(([n, d]) => (
                <div key={n} className="ap-card">
                  <div className="ap-stat-num">{n}</div>
                  <div className="ap-stat-desc">{d}</div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={240}>
            <div className="ap-card" style={{ marginTop: 14, background: "rgba(125,199,66,0.05)", borderColor: "rgba(125,199,66,0.15)" }}>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, fontStyle: "italic" }}>
                "Em 2025, o Brasil regulamentou as apostas esportivas. Em 6 meses, os casos de ludopatia nos CAPS aumentaram 340%. O SUS não tem estrutura para absorver essa demanda."
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 3. SOLUÇÃO ───────────────────────────────────────── */}
      <section id="solucao" className="ap-slide">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">A Solução</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Método ISTOP — psicoeducação digital baseada em evidências.</h2>
            <p className="ap-sub">5 módulos sequenciais com base em TCC. Acessível 24h, no celular, sem espera. Preço de entrada: R$29,90.</p>
          </Fade>
          <Fade delay={180}>
            <div className="ap-grid-2" style={{ marginTop: 32 }}>
              <div className="ap-card" style={{ borderColor: "rgba(125,199,66,0.25)" }}>
                <div style={{ marginBottom: 14 }}>
                  <span className="ap-tag">🇧🇷 Português</span>
                </div>
                <h3 style={{ fontFamily: "var(--ff-t)", fontSize: 22, marginBottom: 8 }}>paredejogar.com</h3>
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 16 }}>
                  Plataforma ativa, vendendo, com alunos completando módulos.
                </p>
                <div className="ap-divider" />
                <p style={{ fontSize: 12, color: "var(--green)" }}>✓ Ao vivo · 17 usuários cadastrados</p>
              </div>
              <div className="ap-card" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <div style={{ marginBottom: 14 }}>
                  <span className="ap-tag" style={{ opacity: .7 }}>🌎 Espanhol</span>
                </div>
                <h3 style={{ fontFamily: "var(--ff-t)", fontSize: 22, marginBottom: 8 }}>dejadejugar.com</h3>
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 16 }}>
                  Mesmo método adaptado para México, Argentina, Colômbia, Chile.
                </p>
                <div className="ap-divider" />
                <p style={{ fontSize: 12, color: "var(--text3)" }}>⏳ Em desenvolvimento — 45M usuários potenciais</p>
              </div>
            </div>
          </Fade>
          <Fade delay={260}>
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["TCC Validada", "Sem espera", "Celular e desktop", "Certificado de conclusão", "Diretório de especialistas"].map(t => (
                <span key={t} className="ap-tag">{t}</span>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 4. TRAÇÃO ────────────────────────────────────────── */}
      <section id="tracao" className="ap-slide ap-bg-alt">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Tração</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Não estamos pedindo para construir.<br />Estamos pedindo para escalar.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-card" style={{ marginTop: 32 }}>
              {[
                ["Plataforma 100% funcional", "React + Supabase + Mercado Pago em produção"],
                ["Primeiros alunos pagantes", "Módulos 1 e 2 sendo concluídos por usuários reais"],
                ["Pagamento por Pix e cartão", "Gateway integrado com webhook de liberação automática"],
                ["Diretório Nacional lançado", "Especialistas em ludopatia podem se cadastrar gratuitamente"],
                ["Blog com SEO ativo", "Conteúdo clínico indexado no Google"],
                ["4 sócios fundadores", "Acesso permanente ao produto, skin in the game"],
              ].map(([t, d]) => (
                <div key={t} className="ap-check">
                  <span className="ap-check-icon">✓</span>
                  <div className="ap-check-text"><strong>{t}</strong> — {d}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 5. MODELO ────────────────────────────────────────── */}
      <section id="modelo" className="ap-slide">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Modelo de Negócio</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Três fontes. LTV de R$619,50 por aluno completo.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-card" style={{ marginTop: 32 }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text3)", marginBottom: 20 }}>Programa B2C — funil sequencial obrigatório</p>
              {[
                ["Módulo 1 — Interrupção",     "R$29,90",  5],
                ["Módulo 2 — Sensibilização",  "R$49,90",  9],
                ["Módulo 3 — Autorregulação",  "R$89,90",  15],
                ["Módulo 4 — Reorganização",   "R$149,90", 24],
                ["Módulo 5 — Manutenção",      "R$199,90", 33],
              ].map(([l, v, w]) => (
                <div key={l} className="ap-price-row">
                  <span className="ap-price-label">{l}</span>
                  <div className="ap-price-bar-wrap"><div className="ap-price-bar" style={{ width: `${w * 3}%` }} /></div>
                  <span className="ap-price-val">{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "12px 0 0", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--text3)" }}>LTV total por aluno</span>
                <span style={{ fontFamily: "var(--ff-t)", fontSize: 28, color: "var(--green)" }}>R$619,50</span>
              </div>
            </div>
          </Fade>
          <Fade delay={240}>
            <div className="ap-grid-2" style={{ marginTop: 14 }}>
              <div className="ap-card">
                <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>Diretório B2B (futuro)</p>
                <p style={{ fontFamily: "var(--ff-t)", fontSize: 24, color: "var(--green)", marginBottom: 6 }}>R$89/mês</p>
                <p style={{ fontSize: 13, color: "var(--text2)" }}>Plano premium para especialistas verificados</p>
              </div>
              <div className="ap-card">
                <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>Licenciamento B2B2C</p>
                <p style={{ fontFamily: "var(--ff-t)", fontSize: 24, color: "var(--green)", marginBottom: 6 }}>Corporativo</p>
                <p style={{ fontSize: 13, color: "var(--text2)" }}>Planos de saúde e clínicas integrando o ISTOP</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 6. MERCADO ───────────────────────────────────────── */}
      <section id="mercado" className="ap-slide ap-bg-alt">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Tamanho de Mercado</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Mercado de US$2,3B sem solução digital consolidada.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-market" style={{ marginTop: 36 }}>
              {[
                { size: 88, label: "TAM", title: "US$2,3 bilhões / ano", desc: "Brasil + LATAM: ~58M apostadores compulsivos", color: "rgba(125,199,66,0.15)" },
                { size: 68, label: "SAM", title: "US$115 milhões / ano", desc: "~5% dispostos a pagar por solução digital = 2,9M usuários", color: "rgba(125,199,66,0.10)" },
                { size: 52, label: "SOM", title: "R$1,8M ARR — Ano 1", desc: "0,1% do SAM: 2.900 usuários completos", color: "rgba(125,199,66,0.06)" },
              ].map(m => (
                <Fade key={m.label} delay={200} className="">
                  <div className="ap-market-row">
                    <div className="ap-market-circle" style={{ width: m.size, height: m.size, background: m.color, fontSize: 11 }}>
                      {m.label}
                    </div>
                    <div className="ap-market-info">
                      <h4>{m.title}</h4>
                      <p>{m.desc}</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 7. POR QUE AGORA ─────────────────────────────────── */}
      <section id="agora" className="ap-slide">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Por que Agora</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Três forças convergindo em 2025–2026.</h2>
          </Fade>
          <Fade delay={160}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              {[
                {
                  n: "01",
                  title: "Regulação brasileira",
                  desc: "A Lei 14.790/2023 obriga plataformas de bet a financiar programas de conscientização sobre dependência. Janela de parceria/financiamento compulsório aberta agora.",
                },
                {
                  n: "02",
                  title: "Boom das apostas",
                  desc: "1 novo app de apostas instalado a cada 4 segundos no Brasil em 2024. A onda de dependência ainda está crescendo — e chega ao pico em 2026–2027.",
                },
                {
                  n: "03",
                  title: "Saúde mental digital consolidada",
                  desc: "Cresceu 280% pós-pandemia. O consumidor já aceita tratamento online como legítimo. Barreira cultural eliminada.",
                },
              ].map(item => (
                <div key={item.n} className="ap-card" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--ff-t)", fontSize: 32, color: "var(--green)", opacity: .4, lineHeight: 1, flexShrink: 0 }}>{item.n}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 8. USO DOS RECURSOS ──────────────────────────────── */}
      <section id="recursos" className="ap-slide ap-bg-alt">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Uso dos Recursos</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">US$50.000 com foco cirúrgico em aquisição.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-card" style={{ marginTop: 32 }}>
              {[
                { label: "Marketing & Aquisição", pct: 70, val: "US$35.000", color: "#7DC742", desc: "Meta Ads (persona familiar), Google Search, influenciadores saúde mental" },
                { label: "Time", pct: 25, val: "US$12.500", color: "#4A8F18", desc: "Psicólogo clínico, designer UX, dev part-time" },
                { label: "Operação & Caixa", pct: 5, val: "US$2.500", color: "#2E5A0E", desc: "Infraestrutura, domínios, margem de segurança" },
              ].map((f, i) => (
                <div key={f.label} className="ap-fund" style={{ paddingBottom: i < 2 ? 18 : 0, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", marginBottom: i < 2 ? 18 : 0 }}>
                  <div className="ap-fund-header">
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{f.label}</span>
                      <span style={{ fontSize: 13, color: "var(--text3)", marginLeft: 10 }}>{f.val}</span>
                    </div>
                    <span className="ap-fund-pct">{f.pct}%</span>
                  </div>
                  <div className="ap-fund-bar-wrap">
                    <div className="ap-fund-bar" style={{ width: `${f.pct}%`, background: f.color }} />
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 9. PROJEÇÕES ─────────────────────────────────────── */}
      <section id="projecoes" className="ap-slide">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Projeções — 12 meses pós-investimento</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Break-even no mês 10. ARR de R$624K no ano 1.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-timeline" style={{ marginTop: 36 }}>
              {[
                { mes: "Mês 3",  alunos: "80 alunos M1",   mrr: "R$3.200/mês",   detail: "Campanhas rodando, primeiros dados de conversão" },
                { mes: "Mês 6",  alunos: "200 alunos M1",  mrr: "R$12.000/mês",  detail: "CAC otimizado, funil M1→M2 validado" },
                { mes: "Mês 9",  alunos: "380 alunos M1",  mrr: "R$28.000/mês",  detail: "Diretório gerando primeiros leads B2B" },
                { mes: "Mês 12", alunos: "600 alunos M1",  mrr: "R$52.000/mês",  detail: "Break-even atingido, receita recorrente" },
              ].map((r, i) => (
                <div key={r.mes} className="ap-tl-row">
                  <div className="ap-tl-dot"><div className="ap-tl-dot-inner" /></div>
                  <div className="ap-tl-body">
                    <h4>{r.mes} · {r.alunos}</h4>
                    <p>{r.detail}</p>
                    <div className="ap-tl-val">{r.mrr}</div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 10. VANTAGEM COMPETITIVA ─────────────────────────── */}
      <section id="vantagem" className="ap-slide ap-bg-alt">
        <div className="ap-inner">
          <Fade><span className="ap-kicker">Vantagem Competitiva</span></Fade>
          <Fade delay={80}>
            <h2 className="ap-h2">Não existe concorrente direto em português para ludopatia.</h2>
          </Fade>
          <Fade delay={160}>
            <div className="ap-card" style={{ marginTop: 32, overflowX: "auto" }}>
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Solução</th>
                    <th>Preço</th>
                    <th>Base clínica</th>
                    <th>Ludopatia</th>
                    <th>24h digital</th>
                    <th>LATAM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="highlight">
                    <td>Instituto ISTOP</td>
                    <td className="yes">R$29,90</td>
                    <td className="yes">✓ TCC</td>
                    <td className="yes">✓ Exclusivo</td>
                    <td className="yes">✓</td>
                    <td className="yes">✓</td>
                  </tr>
                  <tr>
                    <td>Psicólogo particular</td>
                    <td className="no">R$200–400/sessão</td>
                    <td className="yes">✓</td>
                    <td className="no">Raro</td>
                    <td className="no">✗</td>
                    <td className="no">✗</td>
                  </tr>
                  <tr>
                    <td>Apps genéricos</td>
                    <td className="yes">Grátis</td>
                    <td className="no">✗</td>
                    <td className="no">✗</td>
                    <td className="yes">✓</td>
                    <td className="no">Parcial</td>
                  </tr>
                  <tr>
                    <td>SUS / CAPS</td>
                    <td className="yes">Gratuito</td>
                    <td className="yes">✓</td>
                    <td className="no">Sem foco</td>
                    <td className="no">✗</td>
                    <td className="no">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── 11. ASK ──────────────────────────────────────────── */}
      <section id="ask" className="ap-slide" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59,109,17,0.15) 0%, transparent 70%)" }}>
        <div className="ap-inner">
          <Fade>
            <div className="ap-cta-card">
              <p style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green)", opacity: .7, marginBottom: 24 }}>A Proposta</p>
              <h2 style={{ fontFamily: "var(--ff-t)", fontSize: "clamp(32px,7vw,56px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
                US$50.000<br />
                <span style={{ color: "var(--green)" }}>por 10% do Instituto ISTOP.</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto", marginBottom: 32 }}>
                Valuation pre-money de US$500K sobre uma plataforma 100% funcional, com método clínico proprietário, dois mercados e primeiros clientes pagantes.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Plataforma construída — valor estimado R$100K+ de desenvolvimento",
                  "Método ISTOP — propriedade intelectual clínica validada",
                  "Dois mercados (Brasil + LATAM) desde o dia 1",
                  "Regulação favorável com janela de parceria aberta",
                  "Potencial de saída: aquisição por plano de saúde ou app de bem-estar",
                ].map(item => (
                  <div key={item} className="ap-check" style={{ textAlign: "left" }}>
                    <span className="ap-check-icon">✓</span>
                    <span className="ap-check-text">{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:contato@paredejogar.com" className="ap-btn-primary">
                  Quero conversar →
                </a>
                <a href="https://paredejogar.com" target="_blank" rel="noopener noreferrer" className="ap-btn-ghost">
                  Ver a plataforma ao vivo
                </a>
              </div>
              <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 24 }}>
                paredejogar.com · dejadejugar.com · Instituto ISTOP · 2026
              </p>
            </div>
          </Fade>
        </div>
      </section>

    </div>
  );
}
