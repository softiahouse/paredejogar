import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/painel')
      else navigate('/entrar')
    })
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid var(--border)', borderTop: '3px solid var(--navy)', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}/>
        <p style={{ color: 'var(--text-muted)' }}>Autenticando...</p>
      </div>
    </div>
  )
}
