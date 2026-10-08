import { Link, useNavigate, useParams } from 'react-router'
import { buscarProducto, formatoPrecio } from '../data/productos.js'

// Ruta dinámica "productos/:id": useParams entrega el :id que viene en la URL.
export default function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = buscarProducto(id)

  if (!producto) {
    return (
      <section className="card">
        <h1>Producto no encontrado</h1>
        <p>No existe un producto con id «{id}».</p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    )
  }

  return (
    <section className="card">
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p><strong>{formatoPrecio(producto.precio)}</strong></p>
      {/* navigate(-1) equivale al botón Atrás del navegador (conserva los filtros de la lista) */}
      <button className="btn" onClick={() => navigate(-1)}>← Volver</button>
    </section>
  )
}
