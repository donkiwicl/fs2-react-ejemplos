import { useState } from 'react'

// Muestra lo que realmente hay en localStorage (lo mismo que ves en DevTools → Application).
export default function Inspector() {
  const [snapshot, setSnapshot] = useState(leerTodo)

  function borrarTodo() {
    // removeItem borra una clave; clear() borraría TODO el sitio. Aquí solo las de este ejemplo.
    Object.keys(leerTodo()).forEach((key) => localStorage.removeItem(key))
    window.location.reload()
  }

  return (
    <section className="card">
      <h2>4. ¿Qué hay guardado?</h2>
      <div className="row">
        <button className="btn" onClick={() => setSnapshot(leerTodo())}>Actualizar vista</button>
        <button className="btn btn--danger" onClick={borrarTodo}>Borrar datos del ejemplo</button>
      </div>
      <pre aria-label="Contenido de localStorage">{JSON.stringify(snapshot, null, 2)}</pre>
    </section>
  )
}

function leerTodo() {
  const datos = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('ej1:')) datos[key] = localStorage.getItem(key) // texto crudo
  }
  return datos
}
