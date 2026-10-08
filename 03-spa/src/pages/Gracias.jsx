import { Link, useLocation } from 'react-router'

export default function Gracias() {
  const { state } = useLocation() // datos enviados con navigate(..., { state })

  return (
    <section className="card">
      <h1>¡Gracias{state?.nombre ? `, ${state.nombre}` : ''}!</h1>
      <p>Recibimos tu mensaje.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}
