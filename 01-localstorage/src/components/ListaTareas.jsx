import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Caso real: un arreglo de objetos. useLocalStorage lo convierte a JSON automáticamente.
export default function ListaTareas() {
  const [tareas, setTareas] = useLocalStorage('ej1:tareas', [])
  const [texto, setTexto] = useState('') // estado temporal: NO hace falta guardarlo

  function agregar(event) {
    event.preventDefault()
    const titulo = texto.trim()
    if (!titulo) return
    // Nunca mutamos el arreglo (push): creamos uno nuevo para que React detecte el cambio.
    setTareas([...tareas, { id: crypto.randomUUID(), titulo, hecha: false }])
    setTexto('')
  }

  function alternar(id) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))
  }

  function eliminar(id) {
    setTareas(tareas.filter((t) => t.id !== id))
  }

  const pendientes = tareas.filter((t) => !t.hecha).length

  return (
    <section className="card">
      <h2>3. Guardar una lista (arreglo de objetos)</h2>
      <form className="row" onSubmit={agregar}>
        <input
          aria-label="Nueva tarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej: estudiar React"
        />
        <button className="btn btn--primary">Agregar</button>
      </form>

      {tareas.length === 0 ? (
        <p className="muted">No hay tareas.</p>
      ) : (
        <ul className="list">
          {tareas.map((t) => (
            <li key={t.id}>
              <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} aria-label={`Completar ${t.titulo}`} />
              <span className={t.hecha ? 'done' : ''}>{t.titulo}</span>
              <button className="btn btn--danger" onClick={() => eliminar(t.id)} aria-label={`Eliminar ${t.titulo}`}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="muted">{pendientes} pendiente(s)</p>
    </section>
  )
}
