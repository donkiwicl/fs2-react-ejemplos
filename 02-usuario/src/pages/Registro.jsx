import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

export default function Registro() {
  const { estaLogueado, registrar } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (estaLogueado) return <Navigate to="/perfil" replace />

  function cambiar(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function enviar(event) {
    event.preventDefault()
    // Validación en el cliente: mejora la experiencia, pero el servidor SIEMPRE debe validar también.
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }
    setError(null)
    setEnviando(true)
    try {
      await registrar({ nombre: form.nombre, email: form.email, password: form.password })
      navigate('/perfil', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="card">
      <h1>Crear cuenta</h1>
      <form className="form" onSubmit={enviar}>
        <label>
          Nombre
          <input name="nombre" required value={form.nombre} onChange={cambiar} />
        </label>
        <label>
          Email
          <input name="email" type="email" required value={form.email} onChange={cambiar} />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" required minLength={6} value={form.password} onChange={cambiar} />
        </label>
        <label>
          Repetir contraseña
          <input name="confirmar" type="password" required value={form.confirmar} onChange={cambiar} />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn--primary" disabled={enviando}>
          {enviando ? 'Creando…' : 'Registrarme'}
        </button>
      </form>
    </section>
  )
}
