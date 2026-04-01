import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import AuthCallback from './pages/auth/AuthCallback'
import ContractPage from './pages/ContractPage'
import DashboardPage from './pages/DashboardPage'
import Aula1 from './pages/modules/Aula1'
import Aula2 from './pages/modules/Aula2'
import Aula3 from './pages/modules/Aula3'
import CheckIn from './pages/modules/CheckIn'

function Layout({ children, noFooter }) {
  return (
    <>
      <Navbar />
      {children}
      {!noFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/entrar" element={<LoginPage />} />
          <Route path="/cadastrar" element={<RegisterPage />} />
          <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/contrato" element={<ProtectedRoute><Layout noFooter><ContractPage /></Layout></ProtectedRoute>} />
          <Route path="/painel" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
          <Route path="/modulo/1/aula/1" element={<ProtectedRoute><Layout><Aula1 /></Layout></ProtectedRoute>} />
          <Route path="/modulo/1/aula/2" element={<ProtectedRoute><Layout><Aula2 /></Layout></ProtectedRoute>} />
          <Route path="/modulo/1/aula/3" element={<ProtectedRoute><Layout><Aula3 /></Layout></ProtectedRoute>} />
          <Route path="/checkin" element={<ProtectedRoute><Layout><CheckIn /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Layout><div style={{ padding: '120px 24px', textAlign: 'center' }}><h2>Página não encontrada</h2></div></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
