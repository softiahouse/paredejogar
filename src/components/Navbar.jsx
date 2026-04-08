import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../instituto.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const programaHref = pathname === '/' ? '#programa' : '/#programa'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="istop-nav">
      <div className="istop-nav-inner">
        <Link to="/" className="istop-nav-logo">
          Instituto ISTOP
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
            <a href={programaHref} className="istop-nav-cta">
              Ver o programa
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
