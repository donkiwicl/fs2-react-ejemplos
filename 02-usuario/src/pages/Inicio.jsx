import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

export default function Inicio() {
  const { usuario } = useAuth()

  return (
    <>
      <h1>Ejemplo 2 · Manejo de usuario</h1>
      <p>
        {usuario
          ? `Sesión iniciada como ${usuario.email} (rol: ${usuario.rol}).`
          : 'No has iniciado sesión. Puedes ver esta página, pero Perfil y Admin están protegidas.'}
      </p>
      <section className="card">
        <h2>Cuentas de prueba</h2>
        <ul>
          <li><code>admin@kiwi.cl</code> / <code>admin123</code> — rol admin</li>
          <li><code>user@kiwi.cl</code> / <code>user123</code> — rol usuario</li>
        </ul>
        <p className="muted">
          O crea tu propia cuenta en <Link to="/registro">Registrarse</Link>.
        </p>
      </section>
    </>
  )
}
