import { Link, useSearchParams } from 'react-router'
import { CATEGORIAS, PRODUCTOS, formatoPrecio } from '../data/productos.js'

// Los filtros viven en la URL (?categoria=frutas&q=kiwi) gracias a useSearchParams:
// se pueden compartir, guardar en favoritos y sobreviven al botón Atrás.
export default function Productos() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') ?? ''
  const q = params.get('q') ?? ''

  function actualizar(clave, valor) {
    const siguientes = new URLSearchParams(params)
    if (valor) siguientes.set(clave, valor)
    else siguientes.delete(clave)
    setParams(siguientes, { replace: true }) // replace: no llena el historial con cada tecla
  }

  const visibles = PRODUCTOS.filter(
    (p) => (!categoria || p.categoria === categoria) && p.nombre.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <>
      <h1>Productos</h1>
      <div className="row">
        <input
          type="search"
          aria-label="Buscar producto"
          placeholder="Buscar…"
          value={q}
          onChange={(e) => actualizar('q', e.target.value)}
        />
        <select aria-label="Categoría" value={categoria} onChange={(e) => actualizar('categoria', e.target.value)}>
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {visibles.length === 0 ? (
        <p className="muted">No hay productos que coincidan.</p>
      ) : (
        <div className="grid">
          {visibles.map((p) => (
            <article key={p.id} className="card">
              <h2>{p.nombre}</h2>
              <p className="muted">{p.categoria} · {formatoPrecio(p.precio)}</p>
              {/* Link en vez de <a href>: navega sin recargar la página */}
              <Link to={`/productos/${p.id}`}>Ver detalle</Link>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
