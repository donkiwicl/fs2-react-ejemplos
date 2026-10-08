import { listarUsuarios } from '../services/auth.js'

// Solo accesible con rol "admin" (ver <RequireAuth rol="admin" /> en App.jsx).
export default function Admin() {
  const usuarios = listarUsuarios()

  return (
    <section className="card">
      <h1>Panel de administración</h1>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Rol</th></tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}><td>{u.nombre}</td><td>{u.email}</td><td>{u.rol}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
