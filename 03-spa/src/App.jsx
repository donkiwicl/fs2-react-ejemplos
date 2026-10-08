import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Contacto from './pages/Contacto.jsx'
import Gracias from './pages/Gracias.jsx'
import NotFound from './pages/NotFound.jsx'

// Carga diferida: este componente se descarga solo cuando se visita /acerca.
const Acerca = lazy(() => import('./pages/Acerca.jsx'))

// Tabla de rutas: URL → componente. Layout envuelve a todas (rutas anidadas).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<ProductoDetalle />} />
        <Route
          path="acerca"
          element={
            <Suspense fallback={<p role="status">Cargando…</p>}>
              <Acerca />
            </Suspense>
          }
        />
        <Route path="contacto" element={<Contacto />} />
        <Route path="contacto/gracias" element={<Gracias />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
