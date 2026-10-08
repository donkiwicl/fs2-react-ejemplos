import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * Ruta protegida. Si no hay sesión, redirige a /login recordando de dónde venía
 * (state.from) para volver ahí después de iniciar sesión.
 * Con rol="admin" además exige ese rol.
 */
export default function RequireAuth({ rol }) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (rol && usuario.rol !== rol) {
    return (
      <section className="card">
        <h1>Acceso denegado</h1>
        <p>Esta página requiere el rol «{rol}». Tu rol es «{usuario.rol}».</p>
      </section>
    )
  }
  return <Outlet />
}
