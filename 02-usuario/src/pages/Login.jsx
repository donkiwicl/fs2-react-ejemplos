import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { estaLogueado, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from ?? '/perfil'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (estaLogueado) return <Navigate to={destino} replace />

  // Un solo manejador para todos los campos, usando el atributo name del input.
  function cambiar(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function enviar(event) {
    event.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      await login(form.email, form.password)
      navigate(destino, { replace: true }) // vuelve a la página que pidió login
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="card">
      <h1>Iniciar sesión</h1>
      <form className="form" onSubmit={enviar}>
        <label>
          Email
          <input name="email" type="email" required value={form.email} onChange={cambiar} />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" required value={form.password} onChange={cambiar} />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn--primary" disabled={enviando}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
      <p className="muted">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </section>
  )
}
