import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './navbar-istop.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const verProgramaHref = pathname === '/' ? '#metodo' : '/#metodo'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="navbar-istop">
      <div className="navbar-istop-inner">
        <Link to="/" className="navbar-istop-logo">
          Instituto ISTOP
        </Link>

        <div className="navbar-istop-actions">
          {user ? (
            <>
              <Link to="/painel" className="navbar-istop-link">
                Meu painel
              </Link>
              <button type="button" className="navbar-istop-link" onClick={handleSignOut}>
                Sair
              </button>
            </>
          ) : (
            <a href={verProgramaHref} className="navbar-istop-cta">
              Ver o programa
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
