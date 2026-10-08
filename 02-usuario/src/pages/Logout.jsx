import { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * Ruta pública /logout: cierra la sesión y vuelve al inicio.
 *
 * ¿Por qué una ruta y no llamar logout() directo en el botón? Si estamos en /perfil y
 * borramos el usuario, <RequireAuth> reacciona antes que la navegación y nos manda a /login.
 * Al pasar primero por /logout (que es pública) el orden queda garantizado.
 */
export default function Logout() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return <Navigate to="/" replace />
}
