import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

/**
 * Estructura común a todas las páginas. <Outlet /> es el hueco donde React Router
 * dibuja la página de la ruta actual: la barra y el pie NO se vuelven a cargar.
 *
 * El contador demuestra que no hay recarga: si el navegador recargara la página,
 * el estado de React se perdería y el contador volvería a 1.
 */
export default function Layout() {
  const location = useLocation()
  const [vista, setVista] = useState({ ruta: location.pathname, navegaciones: 1 })

  // Si cambió la ruta, sumamos 1. Se hace durante el render (y no en un useEffect)
  // para que StrictMode no lo cuente dos veces en desarrollo.
  if (vista.ruta !== location.pathname) {
    setVista({ ruta: location.pathname, navegaciones: vista.navegaciones + 1 })
  }

  return (
    <>
      <header className="navbar">
        <nav className="container" aria-label="Principal">
          <Link to="/" className="brand">🥝 KiwiShop</Link>
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/acerca">Acerca</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="container muted">
        <small>
          Ruta actual: <code>{location.pathname}</code> · Páginas vistas sin recargar:{' '}
          <strong data-testid="contador">{vista.navegaciones}</strong>
        </small>
      </footer>
    </>
  )
}
