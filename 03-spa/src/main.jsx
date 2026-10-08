import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

// El Router escucha los cambios de URL y decide qué componente mostrar, SIN pedir otra
// página al servidor. Eso es lo que convierte a la app en una SPA.
//
// - HashRouter    → URLs tipo /#/productos. Funciona en hosting estático (GitHub Pages)
//                   porque el servidor solo ve "/" y nunca responde 404 al recargar.
// - BrowserRouter → URLs limpias /productos, pero el servidor debe devolver index.html
//                   para cualquier ruta (Netlify, Vercel, Nginx con try_files, etc.).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
