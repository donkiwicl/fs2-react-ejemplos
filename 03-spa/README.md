# Ejemplo 3 · Crear una Single Page Application (SPA)

Una **SPA** carga un único `index.html` y luego cambia el contenido con JavaScript, sin
recargar la página. React Router sincroniza la URL con el componente que se muestra.

```bash
npm install
npm run dev

# Pruebas
npm run test:run                  # Vitest (componentes, jsdom)
npx playwright install chromium   # solo la primera vez
npm run test:e2e                  # Playwright (navegador real)
```

Las pruebas E2E (`e2e/spa.spec.js`) comprueban lo que define a una SPA en un navegador real: que al
navegar se descarga **un solo documento HTML**, que funcionan Atrás y los enlaces directos, y que
la página diferida se descarga recién al visitarla.

## Paso a paso: crear esta SPA desde cero

```bash
# 1. Crear el proyecto con la plantilla de React
npm create vite@latest mi-spa -- --template react
cd mi-spa
npm install

# 2. Instalar el enrutador
npm install react-router

# 3. Levantar el servidor de desarrollo
npm run dev
```

4. **Envolver la app en un Router** (`src/main.jsx`):

   ```jsx
   import { HashRouter } from 'react-router'

   createRoot(document.getElementById('root')).render(
     <HashRouter>
       <App />
     </HashRouter>,
   )
   ```

5. **Declarar las rutas** (`src/App.jsx`):

   ```jsx
   <Routes>
     <Route element={<Layout />}>                     {/* navbar + <Outlet /> */}
       <Route index element={<Inicio />} />           {/* /            */}
       <Route path="productos" element={<Productos />} />
       <Route path="productos/:id" element={<ProductoDetalle />} />  {/* ruta dinámica */}
       <Route path="*" element={<NotFound />} />      {/* 404          */}
     </Route>
   </Routes>
   ```

6. **Navegar con `<Link>` / `<NavLink>`**, nunca con `<a href>` (eso recarga la página).

7. **Publicar**: `npm run build` genera `dist/`. Con `base: './'` en `vite.config.js` y
   `HashRouter`, la carpeta funciona en cualquier hosting estático (GitHub Pages incluido).

## Qué muestra cada archivo

| Archivo | Concepto |
| --- | --- |
| `src/main.jsx` | `HashRouter` vs `BrowserRouter` |
| `src/App.jsx` | Tabla de rutas, rutas anidadas, 404, `lazy` + `Suspense` |
| `src/components/Layout.jsx` | `<Outlet />`, `NavLink` activo, contador que prueba que no hay recarga |
| `src/pages/Productos.jsx` | Filtros en la URL con `useSearchParams` |
| `src/pages/ProductoDetalle.jsx` | Parámetros de ruta con `useParams`, `navigate(-1)` |
| `src/pages/Contacto.jsx` | Navegación programática con `useNavigate` y `state` |
| `src/pages/Gracias.jsx` | Leer `state` con `useLocation` |
| `src/pages/Acerca.jsx` | Página cargada bajo demanda (code splitting) |

## SPA vs sitio multipágina

| | Multipágina (MPA) | SPA |
| --- | --- | --- |
| Al cambiar de página | El servidor envía otro HTML | JavaScript cambia el contenido |
| Estado en memoria | Se pierde en cada clic | Se conserva |
| Primera carga | Más liviana | Descarga el JS de la app |
| SEO | Directo | Requiere cuidado (o SSR) |

## HashRouter o BrowserRouter

- `HashRouter` → `/#/productos`. Sirve en hosting estático sin configuración.
- `BrowserRouter` → `/productos`. URLs limpias, pero el servidor debe responder `index.html`
  en todas las rutas (si no, al recargar aparece un 404 del servidor).
