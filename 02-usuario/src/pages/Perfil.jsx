import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

// Página protegida (ver RequireAuth en App.jsx): aquí siempre hay un usuario.
export default function Perfil() {
  const { usuario, actualizarPerfil } = useAuth()
  const [nombre, setNombre] = useState(usuario.nombre)
  const [mensaje, setMensaje] = useState(null)

  async function guardar(event) {
    event.preventDefault()
    await actualizarPerfil({ nombre: nombre.trim() })
    setMensaje('Perfil actualizado')
  }

  return (
    <section className="card">
      <h1>Mi perfil</h1>
      <dl>
        <dt className="muted">Email</dt>
        <dd>{usuario.email}</dd>
        <dt className="muted">Rol</dt>
        <dd>{usuario.rol}</dd>
      </dl>
      <form className="form" onSubmit={guardar}>
        <label>
          Nombre visible
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <button className="btn btn--primary">Guardar</button>
        {mensaje && <p role="status">{mensaje}</p>}
      </form>
    </section>
  )
}
