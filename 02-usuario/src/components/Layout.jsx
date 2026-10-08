import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

// La barra cambia según haya o no un usuario logueado (y según su rol).
export default function Layout() {
  const { usuario, esAdmin } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <header className="navbar">
        <nav className="container" aria-label="Principal">
          <Link to="/" className="brand">🥝 Usuarios</Link>
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/perfil">Perfil</NavLink></li>
            {esAdmin && <li><NavLink to="/admin">Admin</NavLink></li>}
          </ul>
          <span className="spacer" />
          {usuario ? (
            <div className="row">
              <span>Hola, <strong>{usuario.nombre}</strong></span>
              <button className="btn" onClick={() => navigate('/logout')}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="row">
              <Link className="btn" to="/login">Iniciar sesión</Link>
              <Link className="btn btn--primary" to="/registro">Registrarse</Link>
            </div>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
