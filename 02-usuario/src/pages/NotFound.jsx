import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="card">
      <h1>404</h1>
      <p>Esta página no existe.</p>
      <Link className="btn btn--primary" to="/">Volver al inicio</Link>
    </section>
  )
}
