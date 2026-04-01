import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navStyle = {
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.6)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '0 24px',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(145deg, rgba(27,53,88,0.95), rgba(38,69,115,0.9))',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(27,53,88,0.2)',
            }}
          >
            <span style={{ color: '#F4A862', fontFamily: 'DM Serif Display', fontSize: 19, fontWeight: 700 }}>P</span>
          </div>
          <span style={{ fontFamily: 'DM Serif Display', fontSize: 21, color: 'var(--navy)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Pare<span style={{ color: 'var(--orange)' }}>De</span>Jogar
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link
            to="/#metodo"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}
            className="hidden-mobile"
          >
            O Método
          </Link>
          <Link
            to="/#recursos"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}
            className="hidden-mobile"
          >
            Recursos
          </Link>

          {user ? (
            <>
              <Link to="/painel" className="btn-secondary" style={{ padding: '10px 20px', fontSize: 14 }}>
                Meu Painel
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '8px 4px',
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/entrar" style={{ color: 'var(--navy)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                Entrar
              </Link>
              <Link to="/cadastrar" className="btn-primary" style={{ padding: '11px 22px', fontSize: 14 }}>
                Começar Agora
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
