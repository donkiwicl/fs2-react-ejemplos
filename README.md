# Ejemplos de React · DSY1104 (Fullstack II)

Tres ejemplos **autoconclusivos**: cada carpeta es un proyecto Vite + React independiente,
con su propio `package.json`, sus pruebas y su README. Puedes copiar una carpeta sola y funciona.

| Carpeta | Tema | Conceptos |
| --- | --- | --- |
| [`01-localstorage`](./01-localstorage) | Persistir datos en el navegador | `localStorage`, JSON, hook `useLocalStorage`, evento `storage` |
| [`02-usuario`](./02-usuario) | Manejo de usuario | Registro, login, logout, Context API, sesión persistente, rutas protegidas, roles |
| [`03-spa`](./03-spa) | Crear una Single Page Application | React Router, rutas anidadas y dinámicas, `useSearchParams`, `useNavigate`, lazy loading |

## Cómo ejecutar un ejemplo

Requisitos: **Node.js 20 o superior**.

```bash
cd 01-localstorage   # o 02-usuario / 03-spa
npm install          # instala dependencias (solo la primera vez)
npm run dev          # abre http://localhost:5173
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm test` | Pruebas con Vitest + Testing Library (modo *watch*) |
| `npm run test:run` | Pruebas una sola vez |
| `npm run build` | Genera la versión optimizada en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |

**Stack:** Vite 8 · React 19 · React Router 8 · Vitest · Testing Library
