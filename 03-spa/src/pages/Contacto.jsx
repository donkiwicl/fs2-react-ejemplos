import { useState } from 'react'
import { useNavigate } from 'react-router'

// Navegación programática: tras enviar el formulario vamos a otra ruta con useNavigate,
// y le pasamos datos a esa página mediante "state" (no aparecen en la URL).
export default function Contacto() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  function enviar(event) {
    event.preventDefault() // evita que el <form> recargue la página (comportamiento por defecto)
    navigate('/contacto/gracias', { state: { nombre } })
  }

  return (
    <section className="card">
      <h1>Contacto</h1>
      <form className="form" onSubmit={enviar}>
        <label>
          Nombre
          <input required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Mensaje
          <textarea required rows={4} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        </label>
        <button className="btn btn--primary">Enviar</button>
      </form>
    </section>
  )
}
