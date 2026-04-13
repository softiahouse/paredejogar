// src/pages/LandingPage.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --verde: #3B6D11;
    --verde-claro: #EAF3DE;
    --verde-suave: #EEF4E6;
    --vermelho: #993C1D;
    --creme: #F7F5F0;
    --texto: #2C2C2A;
    --texto-sec: #5F5E5A;
    --texto-ter: #888780;
    --borda: #E0DDD8;
    --fonte-titulo: 'DM Serif Display', Georgia, serif;
    --fonte-corpo: 'DM Sans', system-ui, sans-serif;
  }

  .lp-body { font-family: var(--fonte-corpo); background: var(--creme); color: var(--texto); overflow-x: hidden; }

  /* HERO */
  .lp-hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 120px 24px 80px;
    overflow: hidden; background: var(--creme);
  }
  .lp-blob-1 {
    position: absolute; top: -100px; left: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: #e8ede4; opacity: .6;
    animation: lpDrift 14s ease-in-out infinite; pointer-events: none;
  }
  .lp-blob-2 {
    position: absolute; bottom: -120px; right: -80px;
    width: 440px; height: 440px; border-radius: 50%;
    background: #ede8e4; opacity: .5;
    animation: lpDrift2 17s ease-in-out infinite; pointer-events: none;
  }
  @keyframes lpDrift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(6px,-8px)} }
  @keyframes lpDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-5px,7px)} }
  @keyframes lpFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .lp-hero-inner { position: relative; z-index: 1; max-width: 900px; }
  .lp-hero-label {
    font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
    color: var(--texto-ter); margin-bottom: 28px; display: block;
    animation: lpFadeUp .8s ease both;
  }
  .lp-hero-title {
    font-family: var(--fonte-titulo);
    font-size: clamp(72px, 14vw, 140px);
    font-weight: 400; line-height: 1; margin-bottom: 40px;
    animation: lpFadeUp .8s .15s ease both;
  }
  .lp-pare { color: var(--vermelho); }
  .lp-viva { color: var(--verde); }

  .lp-circles {
    display: flex; justify-content: center;
    gap: 16px; margin-bottom: 40px; flex-wrap: wrap;
    animation: lpFadeUp .8s .3s ease both;
  }
  .lp-circle-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .lp-circle {
    width: 48px; height: 48px; border-radius: 50%;
    border: 1.5px solid #444441;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 500; color: #444441;
    background: transparent; transition: background .25s, color .25s;
    cursor: default;
  }
  .lp-circle:hover { background: var(--verde); color: #fff; border-color: var(--verde); }
  .lp-circle-label { font-size: 10px; color: var(--texto-ter); text-align: center; max-width: 60px; line-height: 1.3; }

  .lp-hero-subtitle {
    font-family: var(--fonte-titulo); font-size: 22px; font-weight: 400;
    color: var(--texto); max-width: 560px; margin: 0 auto 16px;
    animation: lpFadeUp .8s .45s ease both;
  }
  .lp-hero-desc {
    font-size: 15px; color: var(--texto-sec);
    max-width: 480px; margin: 0 auto 40px;
    animation: lpFadeUp .8s .55s ease both;
  }
  .lp-hero-btns {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    animation: lpFadeUp .8s .65s ease both;
  }

  /* BOTÕES */
  .lp-btn-primary {
    background: var(--verde); color: #EAF3DE;
    padding: 13px 28px; border-radius: 8px;
    font-size: 15px; font-weight: 500; border: none; cursor: pointer;
    font-family: var(--fonte-corpo); text-decoration: none;
    transition: opacity .2s; display: inline-block;
  }
  .lp-btn-primary:hover { opacity: .85; }
  .lp-btn-secondary {
    background: transparent; color: var(--texto-sec);
    padding: 13px 28px; border-radius: 8px;
    font-size: 15px; font-weight: 400;
    border: .5px solid #B4B2A9; cursor: pointer;
    font-family: var(--fonte-corpo); text-decoration: none;
    transition: border-color .2s, color .2s; display: inline-block;
  }
  .lp-btn-secondary:hover { border-color: var(--verde); color: var(--verde); }

  /* SEÇÕES */
  .lp-section { padding: 96px 24px; }
  .lp-container { max-width: 960px; margin: 0 auto; }
  .lp-section-label {
    font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
    color: var(--texto-ter); margin-bottom: 16px; display: block;
  }
  .lp-section-title {
    font-family: var(--fonte-titulo);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 400; line-height: 1.15; margin-bottom: 16px;
  }
  .lp-section-sub { font-size: 17px; color: var(--texto-sec); max-width: 560px; margin-bottom: 56px; }

  /* DOR */
  .lp-dor { background: #fff; }
  .lp-dor-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 20px; margin-bottom: 48px; }
  .lp-dor-card {
    border: 1px solid var(--borda); border-radius: 12px; padding: 28px 24px;
    transition: border-color .2s, transform .2s;
  }
  .lp-dor-card:hover { border-color: var(--vermelho); transform: translateY(-3px); }
  .lp-dor-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--vermelho); margin-bottom: 14px; }
  .lp-dor-card p { font-size: 15px; color: var(--texto-sec); line-height: 1.6; }
  .lp-dor-fechamento {
    font-style: italic; text-align: center; color: var(--texto-sec); font-size: 17px;
    border-top: 1px solid var(--borda); padding-top: 40px;
  }

  /* CREDIBILIDADE */
  .lp-cred { background: var(--creme); }
  .lp-stats-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 24px; margin-bottom: 56px; }
  .lp-stat-card {
    background: #fff; border: 1px solid var(--borda); border-radius: 12px;
    padding: 32px 24px; text-align: center; transition: border-color .2s;
  }
  .lp-stat-card:hover { border-color: var(--verde); }
  .lp-stat-num { font-family: var(--fonte-titulo); font-size: 36px; color: var(--verde); line-height: 1.1; margin-bottom: 8px; }
  .lp-stat-desc { font-size: 13px; color: var(--texto-sec); line-height: 1.5; }
  .lp-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
  .lp-badge {
    border: 1px solid var(--borda); border-radius: 20px; padding: 7px 16px;
    font-size: 13px; color: var(--texto-sec); background: #fff;
    transition: background .2s, border-color .2s;
  }
  .lp-badge:hover { background: var(--verde-claro); border-color: var(--verde); }

  /* MÉTODO */
  .lp-metodo { background: #fff; }
  .lp-metodo-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 20px; }
  .lp-metodo-card {
    border: 1px solid var(--borda); border-radius: 12px; padding: 32px 20px;
    text-align: center; transition: transform .2s, border-color .2s;
  }
  .lp-metodo-card:hover { transform: translateY(-4px); border-color: var(--verde); }
  .lp-metodo-letra {
    width: 52px; height: 52px; border-radius: 50%;
    border: 1.5px solid var(--verde);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--fonte-titulo); font-size: 22px; color: var(--verde);
    margin: 0 auto 16px;
  }
  .lp-metodo-nome { font-size: 13px; font-weight: 500; color: var(--texto); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .06em; }
  .lp-metodo-desc { font-size: 13px; color: var(--texto-sec); line-height: 1.6; }

  /* DEPOIMENTOS */
  .lp-depo { background: var(--verde-suave); }
  .lp-depo-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 20px; margin-bottom: 32px; }
  .lp-depo-card { background: #fff; border: 1px solid #CDDDB8; border-radius: 12px; padding: 32px 24px; position: relative; }
  .lp-depo-quote {
    font-family: var(--fonte-titulo); font-size: 56px; color: var(--verde-claro);
    position: absolute; top: 12px; left: 20px; line-height: 1;
  }
  .lp-depo-card p { font-style: italic; font-size: 15px; color: var(--texto-sec); line-height: 1.7; padding-top: 24px; }
  .lp-depo-nota { font-size: 12px; color: var(--texto-ter); text-align: center; font-style: italic; }

  /* PROGRAMA */
  .lp-programa { background: var(--creme); }
  .lp-modulos-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 20px; margin-bottom: 48px; }
  .lp-modulo-card {
    background: #fff; border: 1px solid var(--borda); border-radius: 12px;
    padding: 28px 24px; display: flex; flex-direction: column;
    transition: border-color .2s, transform .2s;
  }
  .lp-modulo-card:hover { border-color: var(--verde); transform: translateY(-3px); }
  .lp-modulo-num { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--texto-ter); margin-bottom: 8px; }
  .lp-modulo-nome { font-family: var(--fonte-titulo); font-size: 22px; color: var(--texto); margin-bottom: 12px; }
  .lp-modulo-desc { font-size: 14px; color: var(--texto-sec); line-height: 1.6; flex: 1; margin-bottom: 20px; }
  .lp-modulo-info { font-size: 12px; color: var(--texto-ter); margin-bottom: 16px; }
  .lp-ferramentas { border-top: 1px solid var(--borda); padding-top: 40px; }
  .lp-ferramentas-titulo { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--texto-ter); margin-bottom: 20px; }
  .lp-ferramenta-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0; border-bottom: 1px solid var(--borda);
    font-size: 15px; color: var(--texto-sec);
  }
  .lp-ferramenta-item::before { content: '✓'; color: var(--verde); font-weight: 600; flex-shrink: 0; }

  /* FAMILIARES */
  .lp-familiares { background: #fff; }
  .lp-familiares-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .lp-familiares-texto p { font-size: 16px; color: var(--texto-sec); margin-bottom: 16px; line-height: 1.7; }
  .lp-familiares-lista { list-style: none; margin: 24px 0; padding: 0; }
  .lp-familiares-lista li {
    padding: 10px 0; border-bottom: 1px solid var(--borda);
    font-size: 14px; color: var(--texto-sec);
    display: flex; align-items: flex-start; gap: 10px;
  }
  .lp-familiares-lista li::before { content: '→'; color: var(--verde); flex-shrink: 0; }
  .lp-familiares-form {
    background: var(--verde-suave); border: 1px solid #CDDDB8;
    border-radius: 16px; padding: 40px 32px;
  }
  .lp-familiares-form h3 { font-family: var(--fonte-titulo); font-size: 24px; font-weight: 400; margin-bottom: 8px; }
  .lp-familiares-form p { font-size: 14px; color: var(--texto-sec); margin-bottom: 24px; }

  /* FAQ */
  .lp-faq { background: var(--creme); }
  .lp-faq-list { max-width: 720px; }
  .lp-faq-item { border-bottom: 1px solid var(--borda); padding: 20px 0; }
  .lp-faq-pergunta {
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer; font-size: 16px; font-weight: 500; color: var(--texto);
    gap: 16px; background: none; border: none; text-align: left;
    width: 100%; font-family: var(--fonte-corpo); padding: 0;
  }
  .lp-faq-icon {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid var(--borda);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: var(--texto-ter);
    transition: transform .3s, background .2s;
  }
  .lp-faq-icon.open { transform: rotate(45deg); background: var(--verde-claro); }
  .lp-faq-resposta {
    font-size: 15px; color: var(--texto-sec); line-height: 1.7;
    overflow: hidden; max-height: 0; transition: max-height .35s ease, padding .3s;
  }
  .lp-faq-resposta.open { max-height: 300px; padding-top: 14px; }

  /* CTA FINAL */
  .lp-cta-final { background: var(--verde); color: #EAF3DE; text-align: center; padding: 96px 24px; }
  .lp-cta-final .lp-section-label { color: rgba(234,243,222,.6); }
  .lp-cta-final .lp-section-title { color: #EAF3DE; max-width: 640px; margin: 0 auto 16px; }
  .lp-cta-final p { font-size: 17px; color: rgba(234,243,222,.8); max-width: 480px; margin: 0 auto 40px; }
  .lp-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .lp-btn-light {
    background: #EAF3DE; color: var(--verde);
    padding: 14px 32px; border-radius: 8px;
    font-size: 15px; font-weight: 500; border: none; cursor: pointer;
    font-family: var(--fonte-corpo); text-decoration: none;
    transition: opacity .2s; display: inline-block;
  }
  .lp-btn-light:hover { opacity: .88; }
  .lp-btn-outline-light {
    background: transparent; color: rgba(234,243,222,.85);
    padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 400;
    border: 1px solid rgba(234,243,222,.4); cursor: pointer;
    font-family: var(--fonte-corpo); text-decoration: none;
    transition: border-color .2s, color .2s; display: inline-block;
  }
  .lp-btn-outline-light:hover { border-color: #EAF3DE; color: #EAF3DE; }

  /* FOOTER */
  .lp-footer { background: var(--texto); color: rgba(255,255,255,.5); padding: 56px 24px 32px; }
  .lp-footer-inner {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    gap: 48px; margin-bottom: 48px;
  }
  .lp-footer-brand p { font-size: 13px; line-height: 1.7; max-width: 300px; margin-top: 12px; }
  .lp-footer-logo { font-size: 12px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.8); }
  .lp-footer-logo span { color: #7CB95A; }
  .lp-footer-col h4 { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.6); margin-bottom: 16px; }
  .lp-footer-col a { display: block; font-size: 13px; color: rgba(255,255,255,.4); text-decoration: none; margin-bottom: 10px; transition: color .2s; }
  .lp-footer-col a:hover { color: rgba(255,255,255,.8); }
  .lp-footer-bottom {
    max-width: 960px; margin: 0 auto;
    border-top: 1px solid rgba(255,255,255,.08); padding-top: 24px;
    display: flex; justify-content: space-between; flex-wrap: wrap;
    gap: 8px; font-size: 12px; color: rgba(255,255,255,.3);
  }

  @media (max-width: 640px) {
    .lp-familiares-inner { grid-template-columns: 1fr; gap: 40px; }
    .lp-footer-inner { grid-template-columns: 1fr; gap: 32px; }
    .lp-blob-1, .lp-blob-2 { width: 280px; height: 280px; }
    .lp-section { padding: 64px 20px; }
  }
`

const faqs = [
  { p: 'O programa substitui tratamento psicológico?', r: 'Não. O programa é psicoeducacional e complementar. Para casos de dependência grave, o acompanhamento com profissional de saúde mental é fundamental. O ISTOP pode ser utilizado em paralelo ao tratamento.' },
  { p: 'Preciso comprar todos os módulos de uma vez?', r: 'O programa é vendido por módulo, de forma sequencial. Cada módulo é adquirido separadamente, mas a ordem é obrigatória: o Módulo 2 só pode ser comprado após o Módulo 1, o Módulo 3 após o 2, e assim por diante. Essa sequência existe porque cada etapa prepara você para a próxima.' },
  { p: 'O programa funciona para qualquer tipo de aposta?', r: 'Sim. O método foi desenvolvido para comportamentos compulsivos com apostas em geral — esportes, cassinos online, jogos de azar — com foco especial nas plataformas digitais (bets).' },
  { p: 'Quanto tempo por dia preciso dedicar?', r: 'Cada aula leva entre 15 e 25 minutos. As atividades práticas levam cerca de 3 minutos. O programa foi desenhado para ser compatível com a rotina de quem trabalha.' },
  { p: 'Tenho acesso vitalício após a compra?', r: 'Não. Após a compra de cada módulo, você tem 120 dias para concluí-lo. O prazo é individual por módulo — não existe limite de tempo global para o programa completo.' },
]

export default function LandingPage() {
  const [faqAberto, setFaqAberto] = useState(null)
  const navigate = useNavigate();
  const [modulosLiberados, setModulosLiberados] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: lib } = await supabase
        .from("modulos_liberados")
        .select("modulo_id")
        .eq("user_id", data.user.id);
      if (lib) setModulosLiberados(lib.map((r) => r.modulo_id));
    });
  }, []);

  const temModulo1 = modulosLiberados.includes(1);
  const coresIstop = ["#FFF8F0", "#F0F7FF", "#F5F0FF", "#F0FFF4", "#FFFBF0"];
  const coresModulos = ["#FFF8F0", "#F0FFF4", "#F0F7FF", "#FFF0F0", "#F5F0FF"];

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="lp-body">
      <style>{css}</style>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-blob-1" />
        <div className="lp-blob-2" />
        <div className="lp-hero-inner">
          <span className="lp-hero-label">Instituto ISTOP</span>
          <h1 className="lp-hero-title">
            <span className="lp-pare">PARE</span>{' '}
            <span className="lp-viva">VIVA</span>
          </h1>
          <div className="lp-circles">
            {[
              ['I', 'Interrupção'], ['S', 'Sensibilização'], ['T', 'Transformação'],
              ['O', 'Organização'], ['P', 'Prevenção'],
            ].map(([l, n]) => (
              <div key={l} className="lp-circle-wrap">
                <div className="lp-circle">{l}</div>
                <span className="lp-circle-label">{n}</span>
              </div>
            ))}
          </div>
          <p className="lp-hero-subtitle">"Quando o jogo deixa de ser diversão e começa a controlar sua vida."</p>
          <p className="lp-hero-desc">Um caminho para parar de apostar, elaborar suas perdas e reconstruir sua vida — com base científica e acolhimento real.</p>
          <div className="lp-hero-btns">
            <Link to="/quiz" className="lp-btn-primary">Teste para Jogador</Link>
            <Link to="/quiz/familias" className="lp-btn-secondary">Teste para Familiar</Link>
          </div>
          {/* Botão CTA principal */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button
              onClick={() => navigate(temModulo1 ? "/painel" : "/cadastrar")}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "1rem 0",
                width: "100%",
                maxWidth: 520,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: temModulo1 ? "#C0392B" : "#5BA4CF",
                color: "#fff",
                letterSpacing: "0.01em",
                boxShadow: temModulo1
                  ? "0 4px 18px rgba(192,57,43,0.18)"
                  : "0 4px 18px rgba(91,164,207,0.18)",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
            >
              {temModulo1 ? "Continue sua jornada →" : "Inicie sua jornada →"}
            </button>
          </div>
        </div>
      </section>

      {/* ESPELHO DA DOR */}
      <section className="lp-section lp-dor">
        <div className="lp-container">
          <span className="lp-section-label">Você se reconhece?</span>
          <h2 className="lp-section-title">O jogo prometeu algo que não entregou.</h2>
          <p className="lp-section-sub">Milhões de pessoas vivem esse ciclo em silêncio. Você não está sozinho.</p>
          <div className="lp-dor-grid">
            {[
              '"Só mais uma rodada para recuperar o que perdi."',
              '"Jogo por diversão, mas às vezes fico horas sem perceber."',
              '"Já menti para minha família sobre quanto gastei."',
              '"Quando ganho, reinvisto tudo. Quando perco, dobro a aposta."',
              '"Penso em apostas mesmo quando estou trabalhando."',
              '"Tentei parar várias vezes. Mas sempre volto."',
            ].map((t, i) => (
              <div key={i} className="lp-dor-card">
                <div className="lp-dor-dot" />
                <p>{t}</p>
              </div>
            ))}
          </div>
          <p className="lp-dor-fechamento">Esses pensamentos não são fraqueza. São sinais de um ciclo que pode ser interrompido.</p>
        </div>
      </section>

      {/* CREDIBILIDADE */}
      <section className="lp-section lp-cred">
        <div className="lp-container">
          <span className="lp-section-label">Por que o ISTOP funciona</span>
          <h2 className="lp-section-title">Base científica.<br />Acolhimento real.</h2>
          <p className="lp-section-sub">O método ISTOP foi desenvolvido com base em evidências de psicologia comportamental e neurociência aplicada à dependência.</p>
          <div className="lp-stats-grid">
            {[
              ['85%', 'dos apostadores compulsivos nunca buscam ajuda por não saber por onde começar'],
              ['6 em 10', 'pessoas que completam programas psicoeducacionais reduzem ou cessam o comportamento'],
              ['15 min', 'é o tempo médio que um impulso intenso dura — se você não agir sobre ele'],
            ].map(([n, d], i) => (
              <div key={i} className="lp-stat-card">
                <div className="lp-stat-num">{n}</div>
                <div className="lp-stat-desc">{d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--texto-ter)', marginBottom: 20 }}>
            Fundamentos do método
          </div>
          <div className="lp-badges">
            {['Terapia Cognitivo-Comportamental', 'Neurociência da Dependência', 'Prevenção de Recaída', 'Regulação Emocional', 'Psicoeducação'].map(b => (
              <span key={b} className="lp-badge">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="lp-section lp-metodo" id="metodo">
        <div className="lp-container">
          <span className="lp-section-label">O método</span>
          <h2 className="lp-section-title">Cinco etapas. Uma direção.</h2>
          <p className="lp-section-sub" style={{ marginBottom: 48 }}>Cada letra do ISTOP representa uma etapa real de transformação — não uma promessa vaga.</p>
          <div className="lp-metodo-grid">
            {[
              ['I', 'Interrupção', 'Reconhecer o ciclo e dar o primeiro passo consciente para sair do piloto automático.'],
              ['S', 'Sensibilização', 'Identificar gatilhos emocionais, situacionais e relacionais que alimentam o impulso.'],
              ['T', 'Transformação', 'Desenvolver ferramentas de autorregulação e criar espaço entre o gatilho e a ação.'],
              ['O', 'Organização', 'Reorganizar a rotina, os hábitos e o ambiente para sustentar a mudança.'],
              ['P', 'Prevenção', 'Consolidar o que foi aprendido e construir sistemas de proteção duradouros.'],
            ].map(([l, n, d], i) => (
              <div key={l} className="lp-metodo-card" style={{ background: coresIstop[i % coresIstop.length] }}>
                <div className="lp-metodo-letra">{l}</div>
                <div className="lp-metodo-nome">{n}</div>
                <div className="lp-metodo-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="lp-section lp-depo">
        <div className="lp-container">
          <span className="lp-section-label">Histórias</span>
          <h2 className="lp-section-title">De quem reconheceu o problema</h2>
          <div className="lp-depo-grid">
            {[
              'Comecei apostando por diversão, mas logo estava usando o dinheiro do aluguel tentando recuperar perdas.',
              'O jogo virou uma forma de fugir do estresse. Quando percebi, estava gastando parte do meu salário.',
              'Depois do divórcio comecei a apostar escondido à noite. Só percebi o problema quando vieram as dívidas.',
              'Eu acreditava que a sorte iria mudar. Mas na verdade estava presa no ciclo do jogo.',
            ].map((t, i) => (
              <div key={i} className="lp-depo-card">
                <span className="lp-depo-quote">"</span>
                <p>{t}</p>
              </div>
            ))}
          </div>
          <p className="lp-depo-nota">Histórias baseadas em casos reais descritos no livro <em>Jogos Online — Vício de Bolso</em>, de Marcelo R. Paulo.</p>
        </div>
      </section>

      {/* PROGRAMA */}
      <section className="lp-section lp-programa" id="programa">
        <div className="lp-container">
          <span className="lp-section-label">O programa</span>
          <h2 className="lp-section-title">Cinco etapas.</h2>
          <p className="lp-section-sub">Uma jornada de transformação real — no seu ritmo, no seu tempo.</p>
          <div className="lp-modulos-grid">
            {[
              { n: 1, nome: 'Interrupção', desc: 'Você começa entendendo como o ciclo do jogo se instala — e dá o primeiro passo para sair do piloto automático.', info: '3 aulas · Contrato de Interrupção' },
              { n: 2, nome: 'Sensibilização', desc: 'Você identifica o que aciona o impulso: emoções, pensamentos, ambientes. O comportamento ganha nome — e perde força.', info: '5 aulas · Mapa de Gatilhos ISTOP' },
              { n: 3, nome: 'Autorregulação', desc: 'Você aprende a criar uma pausa entre o gatilho e a ação. Aqui começa o controle real — construído por você, para você.', info: '5 aulas · Plano Pessoal de Manejo' },
              { n: 4, nome: 'Reorganização', desc: 'Hábitos antigos são substituídos por novos padrões. Você reconstrói sua rotina com base em comportamentos que fortalecem a mudança.', info: '5 aulas · Estrutura de Rotina' },
              { n: 5, nome: 'Manutenção da Mudança e Prevenção de Recaídas', desc: 'Consolide as mudanças iniciadas no programa e desenvolva estratégias para reduzir o risco de recaída ao longo do tempo.', info: '5 aulas · Protocolo de Prevenção de Recaída · Certificado' },
            ].map((m, i) => (
              <div key={m.n} className="lp-modulo-card" style={{ background: coresModulos[i % coresModulos.length] }}>
                <div className="lp-modulo-num">Módulo {m.n}</div>
                <div className="lp-modulo-nome">{m.nome}</div>
                <div className="lp-modulo-desc">{m.desc}</div>
                <div className="lp-modulo-info">{m.info}</div>
              </div>
            ))}
          </div>
          <div className="lp-ferramentas">
            <div className="lp-ferramentas-titulo">Ferramentas incluídas no programa</div>
            {['Mapa de Gatilhos ISTOP', 'Plano Pessoal de Manejo do Impulso', 'Protocolo de Prevenção de Recaída', 'Certificado de Conclusão'].map(f => (
              <div key={f} className="lp-ferramenta-item">{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section lp-faq">
        <div className="lp-container">
          <span className="lp-section-label">Dúvidas frequentes</span>
          <h2 className="lp-section-title" style={{ marginBottom: 48 }}>Perguntas frequentes</h2>
          <div className="lp-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="lp-faq-item">
                <button type="button" className="lp-faq-pergunta" onClick={() => setFaqAberto(faqAberto === i ? null : i)}>
                  {f.p}
                  <span className={`lp-faq-icon${faqAberto === i ? ' open' : ''}`}>+</span>
                </button>
                <div className={`lp-faq-resposta${faqAberto === i ? ' open' : ''}`}>{f.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="lp-cta-final">
        <span className="lp-section-label">Comece agora</span>
        <h2 className="lp-section-title">O primeiro passo não precisa ser grande.</h2>
        <p>Comece pelo Módulo 1. Entenda como o ciclo funciona. Dê o primeiro passo.</p>
        <div className="lp-cta-btns">
          <Link to="/quiz" className="lp-btn-light">Teste para Jogador</Link>
          <Link to="/quiz/familias" className="lp-btn-outline-light">Teste para Familiar</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">Instituto <span>ISTOP</span></div>
            <p>Plataforma científica de saúde mental focada em prevenção e tratamento do vício em apostas online.</p>
          </div>
          <div className="lp-footer-col">
            <h4>Programa</h4>
            {[
              'Módulo 1 — Interrupção',
              'Módulo 2 — Sensibilização',
              'Módulo 3 — Autorregulação',
              'Módulo 4 — Reorganização',
              'Módulo 5 — Manutenção',
            ].map((label) => (
              <button key={label} type="button" onClick={() => scrollTo('programa')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 10, fontFamily: 'inherit', padding: 0, textAlign: 'left' }}>
                {label}
              </button>
            ))}
          </div>
          <div className="lp-footer-col">
            <h4>Instituto</h4>
            <button type="button" onClick={() => scrollTo('metodo')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 10, fontFamily: 'inherit', padding: 0, textAlign: 'left' }}>Sobre o método</button>
            <button type="button" onClick={() => scrollTo('familiares')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 10, fontFamily: 'inherit', padding: 0, textAlign: 'left' }}>Para familiares</button>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2025 Instituto ISTOP. Todos os direitos reservados.</span>
          <span>Método ISTOP — Marcelo R. Paulo</span>
        </div>
      </footer>
    </div>
  )
}
