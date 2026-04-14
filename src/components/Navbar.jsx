import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../instituto.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="istop-nav">
      <div className="istop-nav-inner">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/logo-icon.png"
            alt="PareDeJogar"
            style={{ height: 128, width: "auto" }}
          />
          <span
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "1.25rem",
              color: "#3B6D11",
              letterSpacing: "-0.02em",
            }}
          >
            Instituto ISTOP
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user ? (
            <>
              <Link to="/painel" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}>
                Meu painel
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/entrar" className="istop-nav-cta">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
