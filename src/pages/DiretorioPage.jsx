import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

/* ─── Dados auxiliares ──────────────────────────────────────────── */
const ESTADOS = [
  { uf: "AC", nome: "Acre" }, { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" }, { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" }, { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" }, { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" }, { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" }, { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" }, { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" }, { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" }, { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" }, { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" }, { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" }, { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" }, { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" },
];
const NOME_PARA_UF = Object.fromEntries(ESTADOS.map(e => [e.nome, e.uf]));

const ESPECIALIDADES_TAGS = [
  "Ludopatia", "Dependência Química", "TCC", "Terapia Familiar",
  "Regulação Emocional", "Prevenção de Recaída", "Saúde Mental Digital",
  "Psiquiatria de Dependências", "Adulto", "Adolescente",
];

const TIPO_LABEL = { psicologo: "Psicólogo(a)", psiquiatra: "Psiquiatra", outro: "Outro profissional" };

/* ─── Styles ────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --verde: #3B6D11; --verde-cl: #EAF3DE; --verde-md: #EEF4E6;
    --creme: #F7F5F0; --borda: #E0DDD8; --txt: #2C2C2A; --txt2: #5F5E5A; --txt3: #888780;
    --ff-title: 'DM Serif Display', Georgia, serif;
    --ff-body: 'DM Sans', system-ui, sans-serif;
  }
  .dir-page { font-family: var(--ff-body); background: var(--creme); min-height: 100vh; color: var(--txt); }

  /* header */
  .dir-header { background:#fff; border-bottom:1px solid var(--borda); padding:0 1.5rem; height:56px;
    display:flex; align-items:center; justify-content:space-between; }
  .dir-header-logo { display:flex; align-items:center; gap:8px; text-decoration:none; }
  .dir-header-logo img { height:34px; }
  .dir-header-logo span { font-family:var(--ff-title); font-size:1rem; color:var(--verde); }

  /* hero */
  .dir-hero { background:var(--verde); color:#EAF3DE; text-align:center; padding:56px 24px 48px; }
  .dir-hero-kicker { font-size:11px; letter-spacing:.12em; text-transform:uppercase; opacity:.65; margin-bottom:16px; }
  .dir-hero h1 { font-family:var(--ff-title); font-size:clamp(26px,5vw,44px); font-weight:400; line-height:1.2; margin-bottom:14px; }
  .dir-hero p { font-size:16px; opacity:.8; max-width:540px; margin:0 auto 32px; line-height:1.6; }
  .dir-tabs-wrap { display:inline-flex; background:rgba(255,255,255,.12); border-radius:10px; padding:4px; gap:4px; }
  .dir-tab-btn { padding:9px 22px; border-radius:7px; border:none; cursor:pointer; font-family:var(--ff-body);
    font-size:14px; font-weight:500; transition:background .2s, color .2s; }
  .dir-tab-btn.active { background:#fff; color:var(--verde); }
  .dir-tab-btn:not(.active) { background:transparent; color:rgba(234,243,222,.8); }

  /* busca */
  .dir-busca { background:#fff; border-bottom:1px solid var(--borda); padding:20px 24px; }
  .dir-busca-inner { max-width:920px; margin:0 auto; display:flex; flex-wrap:wrap; gap:10px; align-items:flex-end; }
  .dir-busca-group { display:flex; flex-direction:column; gap:5px; flex:1; min-width:160px; }
  .dir-busca-group label { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--txt3); font-weight:600; }
  .dir-busca-input, .dir-busca-select {
    padding:9px 12px; border-radius:8px; border:1px solid var(--borda);
    font-family:var(--ff-body); font-size:14px; color:var(--txt); background:#fff;
    outline:none; transition:border-color .2s;
  }
  .dir-busca-input:focus, .dir-busca-select:focus { border-color:var(--verde); }
  .dir-busca-geo { padding:9px 16px; border-radius:8px; border:1px solid var(--verde);
    background:var(--verde-cl); color:var(--verde); font-size:13px; font-weight:600;
    cursor:pointer; font-family:var(--ff-body); white-space:nowrap; transition:background .2s; }
  .dir-busca-geo:hover { background:#d4eabf; }
  .dir-busca-geo:disabled { opacity:.5; cursor:wait; }

  /* chips modalidade */
  .dir-chips { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
  .dir-chip { padding:5px 14px; border-radius:99px; border:1px solid var(--borda); background:#fff;
    font-size:12px; color:var(--txt2); cursor:pointer; transition:all .18s; font-family:var(--ff-body); }
  .dir-chip.on { border-color:var(--verde); background:var(--verde-cl); color:var(--verde); font-weight:600; }

  /* grid */
  .dir-grid-wrap { max-width:920px; margin:0 auto; padding:28px 24px; }
  .dir-count { font-size:13px; color:var(--txt3); margin-bottom:20px; }
  .dir-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:16px; }
  .dir-empty { text-align:center; padding:64px 24px; color:var(--txt3); font-size:15px; }

  /* card */
  .dir-card { background:#fff; border:1px solid var(--borda); border-radius:16px; padding:20px 20px 16px;
    display:flex; flex-direction:column; gap:12px; transition:border-color .2s, box-shadow .2s; }
  .dir-card:hover { border-color:#a8c97f; box-shadow:0 4px 20px rgba(59,109,17,.08); }
  .dir-card-top { display:flex; gap:14px; align-items:flex-start; }
  .dir-card-avatar { width:52px; height:52px; border-radius:50%; background:var(--verde-md);
    border:2px solid var(--verde-cl); display:flex; align-items:center; justify-content:center;
    font-family:var(--ff-title); font-size:22px; color:var(--verde); flex-shrink:0; overflow:hidden; }
  .dir-card-avatar img { width:100%; height:100%; object-fit:cover; }
  .dir-card-info { flex:1; min-width:0; }
  .dir-card-nome { font-family:var(--ff-title); font-size:17px; color:var(--txt); line-height:1.2; margin-bottom:2px; }
  .dir-card-tipo { font-size:12px; color:var(--verde); font-weight:600; margin-bottom:4px; }
  .dir-card-crp { font-size:11px; color:var(--txt3); }
  .dir-card-local { font-size:13px; color:var(--txt2); display:flex; align-items:center; gap:5px; }
  .dir-card-badges { display:flex; gap:5px; flex-wrap:wrap; }
  .dir-card-badge { font-size:11px; padding:2px 8px; border-radius:99px; background:var(--verde-md);
    color:var(--verde); font-weight:500; border:1px solid #c8e6a0; }
  .dir-card-badge.online { background:#E0F2FE; color:#0369A1; border-color:#BAE6FD; }
  .dir-card-bio { font-size:13px; color:var(--txt2); line-height:1.55;
    display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .dir-card-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:4px; }
  .dir-card-btn { padding:7px 14px; border-radius:8px; font-size:12px; font-weight:600;
    font-family:var(--ff-body); cursor:pointer; text-decoration:none; display:inline-flex;
    align-items:center; gap:5px; transition:opacity .2s; border:none; }
  .dir-card-btn.wpp { background:#25D366; color:#fff; }
  .dir-card-btn.tel { background:var(--verde-cl); color:var(--verde); border:1px solid #c8e6a0; }
  .dir-card-btn.site { background:#f0f0f0; color:var(--txt); }
  .dir-card-btn:hover { opacity:.85; }
  .dir-verificado { display:inline-flex; align-items:center; gap:3px; font-size:11px;
    color:#059669; background:#D1FAE5; border-radius:99px; padding:2px 8px; font-weight:600; }

  /* form cadastro */
  .dir-form-wrap { max-width:640px; margin:0 auto; padding:40px 24px 64px; }
  .dir-form-hero { background:var(--verde-md); border:1px solid #c8e6a0; border-radius:14px;
    padding:24px; margin-bottom:32px; }
  .dir-form-hero h2 { font-family:var(--ff-title); font-size:22px; color:var(--txt); margin-bottom:8px; }
  .dir-form-hero p { font-size:14px; color:var(--txt2); line-height:1.6; }
  .dir-form-section { margin-bottom:28px; }
  .dir-form-section-title { font-size:11px; text-transform:uppercase; letter-spacing:.1em;
    color:var(--verde); font-weight:700; margin-bottom:16px; padding-bottom:8px;
    border-bottom:1px solid var(--borda); }
  .dir-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:560px){ .dir-form-row { grid-template-columns:1fr; } }
  .dir-form-group { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
  .dir-form-group label { font-size:13px; font-weight:600; color:var(--txt); }
  .dir-form-group label span { color:#888; font-weight:400; }
  .dir-form-input, .dir-form-select, .dir-form-textarea {
    padding:10px 13px; border:1px solid var(--borda); border-radius:8px;
    font-family:var(--ff-body); font-size:14px; color:var(--txt);
    background:#fff; outline:none; transition:border-color .2s; width:100%; box-sizing:border-box;
  }
  .dir-form-input:focus, .dir-form-select:focus, .dir-form-textarea:focus { border-color:var(--verde); }
  .dir-form-textarea { resize:vertical; min-height:90px; }
  .dir-form-tags { display:flex; flex-wrap:wrap; gap:7px; margin-top:4px; }
  .dir-form-tag { padding:5px 13px; border-radius:99px; border:1px solid var(--borda);
    background:#fff; font-size:12px; cursor:pointer; transition:all .18s; font-family:var(--ff-body); }
  .dir-form-tag.on { border-color:var(--verde); background:var(--verde-cl); color:var(--verde); font-weight:600; }
  .dir-form-checks { display:flex; gap:20px; flex-wrap:wrap; margin-top:4px; }
  .dir-form-check { display:flex; align-items:center; gap:7px; font-size:14px; color:var(--txt);
    cursor:pointer; }
  .dir-form-check input { accent-color:var(--verde); width:16px; height:16px; }
  .dir-btn-submit { width:100%; padding:14px; border-radius:10px; border:none; cursor:pointer;
    background:var(--verde); color:#EAF3DE; font-size:15px; font-weight:600;
    font-family:var(--ff-body); transition:opacity .2s; margin-top:8px; }
  .dir-btn-submit:hover { opacity:.88; }
  .dir-btn-submit:disabled { opacity:.5; cursor:wait; }
  .dir-success { text-align:center; padding:48px 24px; }
  .dir-success h2 { font-family:var(--ff-title); font-size:26px; color:var(--verde); margin-bottom:12px; }
  .dir-success p { font-size:15px; color:var(--txt2); line-height:1.6; max-width:420px; margin:0 auto 24px; }
`;

/* ─── Componente card ────────────────────────────────────────────── */
function CardEspecialista({ e }) {
  const inicial = e.nome?.[0]?.toUpperCase() || "?";
  return (
    <div className="dir-card">
      <div className="dir-card-top">
        <div className="dir-card-avatar">
          {e.foto_url ? <img src={e.foto_url} alt={e.nome} /> : inicial}
        </div>
        <div className="dir-card-info">
          <div className="dir-card-nome">{e.nome}</div>
          <div className="dir-card-tipo">{TIPO_LABEL[e.tipo] || e.tipo}</div>
          <div className="dir-card-crp">{e.registro}</div>
        </div>
        {e.verificado && <span className="dir-verificado">✓ Verificado</span>}
      </div>

      <div className="dir-card-local">
        <span>📍</span>
        <span>{e.cidade} — {e.estado}</span>
      </div>

      {(e.atende_online || e.atende_presencial) && (
        <div className="dir-card-badges">
          {e.atende_presencial && <span className="dir-card-badge">Presencial</span>}
          {e.atende_online && <span className="dir-card-badge online">Online</span>}
          {(e.especialidades || []).slice(0, 3).map(s => (
            <span key={s} className="dir-card-badge">{s}</span>
          ))}
        </div>
      )}

      {e.bio && <p className="dir-card-bio">{e.bio}</p>}

      <div className="dir-card-actions">
        {e.whatsapp && (
          <a href={`https://wa.me/55${e.whatsapp.replace(/\D/g, "")}`}
            target="_blank" rel="noopener noreferrer" className="dir-card-btn wpp">
            💬 WhatsApp
          </a>
        )}
        {e.telefone && (
          <a href={`tel:${e.telefone.replace(/\D/g, "")}`} className="dir-card-btn tel">
            📞 Ligar
          </a>
        )}
        {e.site && (
          <a href={e.site.startsWith("http") ? e.site : `https://${e.site}`}
            target="_blank" rel="noopener noreferrer" className="dir-card-btn site">
            🌐 Site
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Tab Busca ──────────────────────────────────────────────────── */
function TabBusca() {
  const [filtros, setFiltros] = useState({ estado: "", cidade: "", tipo: "", online: false, presencial: false });
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  async function buscar(f = filtros) {
    setLoading(true);
    setBuscou(true);
    let q = supabase.from("especialistas").select("*").eq("ativo", true).order("verificado", { ascending: false }).order("created_at", { ascending: false });
    if (f.estado) q = q.eq("estado", f.estado);
    if (f.cidade) q = q.ilike("cidade", `%${f.cidade}%`);
    if (f.tipo) q = q.eq("tipo", f.tipo);
    if (f.online) q = q.eq("atende_online", true);
    if (f.presencial) q = q.eq("atende_presencial", true);
    const { data } = await q;
    setEspecialistas(data || []);
    setLoading(false);
  }

  async function usarLocalizacao() {
    if (!navigator.geolocation) return alert("Geolocalização não disponível neste navegador.");
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
          { headers: { "Accept-Language": "pt-BR" } }
        );
        const json = await resp.json();
        const nomeEstado = json.address?.state || "";
        const uf = NOME_PARA_UF[nomeEstado] || "";
        const cidade = json.address?.city || json.address?.town || json.address?.village || "";
        const novoFiltro = { ...filtros, estado: uf, cidade };
        setFiltros(novoFiltro);
        buscar(novoFiltro);
      } catch {
        alert("Não foi possível detectar sua localização. Selecione seu estado.");
      }
      setGeoLoading(false);
    }, () => {
      alert("Permissão de localização negada. Selecione seu estado.");
      setGeoLoading(false);
    });
  }

  function setF(key, val) { setFiltros(f => ({ ...f, [key]: val })); }

  return (
    <>
      <div className="dir-busca">
        <div className="dir-busca-inner">
          <div className="dir-busca-group" style={{ flex: "0 0 auto" }}>
            <label>Estado</label>
            <select className="dir-busca-select" value={filtros.estado} onChange={e => setF("estado", e.target.value)}>
              <option value="">Todos os estados</option>
              {ESTADOS.map(e => <option key={e.uf} value={e.uf}>{e.uf} — {e.nome}</option>)}
            </select>
          </div>
          <div className="dir-busca-group">
            <label>Cidade</label>
            <input className="dir-busca-input" placeholder="Ex: São Paulo" value={filtros.cidade}
              onChange={e => setF("cidade", e.target.value)}
              onKeyDown={e => e.key === "Enter" && buscar()} />
          </div>
          <div className="dir-busca-group" style={{ flex: "0 0 auto" }}>
            <label>Tipo</label>
            <select className="dir-busca-select" value={filtros.tipo} onChange={e => setF("tipo", e.target.value)}>
              <option value="">Todos</option>
              <option value="psicologo">Psicólogo(a)</option>
              <option value="psiquiatra">Psiquiatra</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="dir-busca-group" style={{ flex: "0 0 auto" }}>
            <label>Modalidade</label>
            <div className="dir-chips">
              <button className={`dir-chip${filtros.presencial ? " on" : ""}`} onClick={() => setF("presencial", !filtros.presencial)}>Presencial</button>
              <button className={`dir-chip${filtros.online ? " on" : ""}`} onClick={() => setF("online", !filtros.online)}>Online</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label className="dir-busca-group" style={{ margin: 0 }}><span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--txt3)", fontWeight: 600 }}>&nbsp;</span></label>
            <button className="dir-busca-geo" onClick={usarLocalizacao} disabled={geoLoading}>
              {geoLoading ? "Detectando..." : "📍 Usar minha localização"}
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 11 }}>&nbsp;</span>
            <button className="dir-busca-geo" style={{ background: "var(--verde)", color: "#EAF3DE", borderColor: "var(--verde)" }}
              onClick={() => buscar()}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="dir-grid-wrap">
        {!buscou && (
          <div className="dir-empty">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>Selecione um estado ou use sua localização para encontrar especialistas na sua região.</p>
          </div>
        )}
        {buscou && loading && <p className="dir-empty">Buscando especialistas...</p>}
        {buscou && !loading && especialistas.length === 0 && (
          <div className="dir-empty">
            <div style={{ fontSize: 40, marginBottom: 12 }}>😔</div>
            <p>Nenhum especialista encontrado com esses filtros.</p>
            <p style={{ marginTop: 8, fontSize: 13 }}>
              Você é profissional da área?{" "}
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ background: "none", border: "none", color: "var(--verde)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Cadastre-se gratuitamente →
              </button>
            </p>
          </div>
        )}
        {buscou && !loading && especialistas.length > 0 && (
          <>
            <p className="dir-count">{especialistas.length} especialista{especialistas.length !== 1 ? "s" : ""} encontrado{especialistas.length !== 1 ? "s" : ""}</p>
            <div className="dir-grid">
              {especialistas.map(e => <CardEspecialista key={e.id} e={e} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── Tab Cadastro ───────────────────────────────────────────────── */
const FORM_VAZIO = {
  nome: "", tipo: "psicologo", registro: "", email: "",
  telefone: "", whatsapp: "", cidade: "", estado: "",
  site: "", bio: "", atende_online: false, atende_presencial: true,
  especialidades: [],
};

function TabCadastro() {
  const [form, setForm] = useState(FORM_VAZIO);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  function setF(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function toggleTag(tag) {
    setForm(f => ({
      ...f,
      especialidades: f.especialidades.includes(tag)
        ? f.especialidades.filter(t => t !== tag)
        : [...f.especialidades, tag],
    }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setErro("");
    if (!form.nome || !form.registro || !form.email || !form.cidade || !form.estado) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("especialistas").insert({
      nome: form.nome.trim(),
      tipo: form.tipo,
      registro: form.registro.trim(),
      email: form.email.trim().toLowerCase(),
      telefone: form.telefone.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      cidade: form.cidade.trim(),
      estado: form.estado,
      site: form.site.trim() || null,
      bio: form.bio.trim() || null,
      atende_online: form.atende_online,
      atende_presencial: form.atende_presencial,
      especialidades: form.especialidades,
      verificado: false,
      ativo: true,
    });
    setLoading(false);
    if (error) { setErro("Erro ao cadastrar. Tente novamente."); return; }
    setSucesso(true);
  }

  if (sucesso) {
    return (
      <div className="dir-form-wrap">
        <div className="dir-success">
          <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
          <h2>Cadastro recebido!</h2>
          <p>
            Seu perfil foi enviado para análise. Em até <strong>48 horas</strong> você aparecerá no diretório após nossa verificação de registro.
          </p>
          <button onClick={() => setSucesso(false)} style={{ padding: "10px 24px", borderRadius: 8, background: "var(--verde)", color: "#EAF3DE", border: "none", cursor: "pointer", fontFamily: "var(--ff-body)", fontSize: 14, fontWeight: 600 }}>
            Cadastrar outro profissional
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dir-form-wrap">
      <div className="dir-form-hero">
        <h2>Cadastro gratuito para profissionais</h2>
        <p>
          Psicólogos e psiquiatras com atuação em ludopatia, dependências comportamentais ou saúde mental digital podem se cadastrar gratuitamente. Seu perfil fica visível para pacientes em todo o Brasil.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Identificação */}
        <div className="dir-form-section">
          <div className="dir-form-section-title">Identificação profissional</div>
          <div className="dir-form-row">
            <div className="dir-form-group">
              <label>Nome completo *</label>
              <input className="dir-form-input" value={form.nome} onChange={e => setF("nome", e.target.value)} placeholder="Dr(a). Nome Sobrenome" />
            </div>
            <div className="dir-form-group">
              <label>Tipo de profissional *</label>
              <select className="dir-form-select" value={form.tipo} onChange={e => setF("tipo", e.target.value)}>
                <option value="psicologo">Psicólogo(a)</option>
                <option value="psiquiatra">Psiquiatra</option>
                <option value="outro">Outro profissional de saúde</option>
              </select>
            </div>
          </div>
          <div className="dir-form-group">
            <label>CRP / CRM / Registro profissional *</label>
            <input className="dir-form-input" value={form.registro} onChange={e => setF("registro", e.target.value)} placeholder="CRP 06/12345 ou CRM-SP 123456" />
          </div>
        </div>

        {/* Contato */}
        <div className="dir-form-section">
          <div className="dir-form-section-title">Contato</div>
          <div className="dir-form-group">
            <label>E-mail profissional * <span>(não será exibido publicamente)</span></label>
            <input className="dir-form-input" type="email" value={form.email} onChange={e => setF("email", e.target.value)} placeholder="seu@email.com" />
          </div>
          <div className="dir-form-row">
            <div className="dir-form-group">
              <label>Telefone <span>(opcional)</span></label>
              <input className="dir-form-input" value={form.telefone} onChange={e => setF("telefone", e.target.value)} placeholder="(11) 99999-9999" />
            </div>
            <div className="dir-form-group">
              <label>WhatsApp <span>(opcional)</span></label>
              <input className="dir-form-input" value={form.whatsapp} onChange={e => setF("whatsapp", e.target.value)} placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div className="dir-form-group">
            <label>Site ou Instagram <span>(opcional)</span></label>
            <input className="dir-form-input" value={form.site} onChange={e => setF("site", e.target.value)} placeholder="www.seupsicologo.com.br ou @instagram" />
          </div>
        </div>

        {/* Localização */}
        <div className="dir-form-section">
          <div className="dir-form-section-title">Localização</div>
          <div className="dir-form-row">
            <div className="dir-form-group">
              <label>Cidade *</label>
              <input className="dir-form-input" value={form.cidade} onChange={e => setF("cidade", e.target.value)} placeholder="São Paulo" />
            </div>
            <div className="dir-form-group">
              <label>Estado (UF) *</label>
              <select className="dir-form-select" value={form.estado} onChange={e => setF("estado", e.target.value)}>
                <option value="">Selecione</option>
                {ESTADOS.map(e => <option key={e.uf} value={e.uf}>{e.uf} — {e.nome}</option>)}
              </select>
            </div>
          </div>
          <div className="dir-form-group">
            <label>Modalidade de atendimento *</label>
            <div className="dir-form-checks">
              <label className="dir-form-check">
                <input type="checkbox" checked={form.atende_presencial} onChange={e => setF("atende_presencial", e.target.checked)} />
                Presencial
              </label>
              <label className="dir-form-check">
                <input type="checkbox" checked={form.atende_online} onChange={e => setF("atende_online", e.target.checked)} />
                Online / Teleatendimento
              </label>
            </div>
          </div>
        </div>

        {/* Especialidades */}
        <div className="dir-form-section">
          <div className="dir-form-section-title">Área de atuação</div>
          <div className="dir-form-group">
            <label>Especialidades <span>(marque as que se aplicam)</span></label>
            <div className="dir-form-tags">
              {ESPECIALIDADES_TAGS.map(tag => (
                <button type="button" key={tag} className={`dir-form-tag${form.especialidades.includes(tag) ? " on" : ""}`}
                  onClick={() => toggleTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="dir-form-group">
            <label>Breve apresentação <span>(opcional — aparece no seu card)</span></label>
            <textarea className="dir-form-textarea" value={form.bio}
              onChange={e => setF("bio", e.target.value)}
              placeholder="Ex: Psicóloga clínica com 8 anos de experiência em dependências comportamentais, com foco em TCC e prevenção de recaída em ludopatia..." />
          </div>
        </div>

        {erro && (
          <div style={{ background: "#FDECEC", border: "1px solid #C44", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 14, color: "#7A2020" }}>
            {erro}
          </div>
        )}

        <button type="submit" className="dir-btn-submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar gratuitamente →"}
        </button>

        <p style={{ fontSize: 12, color: "var(--txt3)", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Seu cadastro será verificado em até 48h. Após aprovação, seu perfil fica visível para pacientes de todo o Brasil.
        </p>
      </form>
    </div>
  );
}

/* ─── Página principal ───────────────────────────────────────────── */
export default function DiretorioPage() {
  const [searchParams] = useSearchParams();
  const [aba, setAba] = useState(searchParams.get("aba") === "cadastro" ? "cadastro" : "busca");

  return (
    <div className="dir-page">
      <style>{css}</style>

      {/* Header */}
      <div className="dir-header">
        <Link to="/" className="dir-header-logo">
          <img src="/logo-icon.png" alt="PareDeJogar" />
          <span>Instituto ISTOP</span>
        </Link>
        <Link to="/painel" style={{ fontSize: "0.82rem", color: "#3B6D11", fontWeight: 600, textDecoration: "none" }}>
          Meu painel →
        </Link>
      </div>

      {/* Hero com tabs */}
      <div className="dir-hero">
        <p className="dir-hero-kicker">Diretório Nacional</p>
        <h1>Especialistas em Ludopatia</h1>
        <p>
          Encontre psicólogos e psiquiatras especializados em dependência de apostas na sua região.
          Cadastro gratuito para profissionais de saúde mental.
        </p>
        <div className="dir-tabs-wrap">
          <button className={`dir-tab-btn${aba === "busca" ? " active" : ""}`} onClick={() => setAba("busca")}>
            🔍 Encontrar especialista
          </button>
          <button className={`dir-tab-btn${aba === "cadastro" ? " active" : ""}`} onClick={() => setAba("cadastro")}>
            ➕ Sou profissional — Cadastrar
          </button>
        </div>
      </div>

      {aba === "busca" ? <TabBusca /> : <TabCadastro />}

      {/* Footer simples */}
      <div style={{ background: "#1a1a1a", color: "rgba(255,255,255,.4)", padding: "28px 24px", textAlign: "center", fontSize: 12 }}>
        Instituto ISTOP · Diretório Nacional de Especialistas em Ludopatia · Cadastro gratuito para profissionais
        <span style={{ margin: "0 12px" }}>·</span>
        <Link to="/" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Voltar ao site</Link>
      </div>
    </div>
  );
}
