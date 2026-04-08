import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'white', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'DM Serif Display', fontSize: 24, marginBottom: 12 }}>
              Pare<span style={{ color: 'var(--orange)' }}>De</span>Jogar
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7 }}>
              Programa <strong style={{ color: 'rgba(255,255,255,0.85)' }}>PareDeJogar</strong> e método{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>ISTOP</strong> — reorganização comportamental com ciência e acolhimento humano.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Programa</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/#sobre" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Instituto ISTOP</Link>
              <Link to="/#programa" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Método ISTOP</Link>
              <Link to="/contrato" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Contrato de Interrupção</Link>
              <Link to="/painel" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Acessar Programa</Link>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Suporte</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:contato@paredejogar.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>contato@paredejogar.com</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>© 2025 PareDeJogar. Todos os direitos reservados.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/privacidade" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13 }}>Privacidade</Link>
            <Link to="/termos" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13 }}>Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
