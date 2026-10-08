# Ejemplos de React · DSY1104 (Fullstack II)

Tres ejemplos **autoconclusivos**: cada carpeta es un proyecto Vite + React independiente,
con su propio `package.json`, sus pruebas (Vitest + Playwright) y su README. Puedes copiar una
carpeta sola y funciona.

| Carpeta | Tema | Conceptos |
| --- | --- | --- |
| [`01-localstorage`](./01-localstorage) | Persistir datos en el navegador | `localStorage`, JSON, hook `useLocalStorage`, evento `storage` |
| [`02-usuario`](./02-usuario) | Manejo de usuario | Registro, login, logout, Context API, sesión persistente, rutas protegidas, roles |
| [`03-spa`](./03-spa) | Crear una Single Page Application | React Router, rutas anidadas y dinámicas, `useSearchParams`, `useNavigate`, lazy loading |

## Cómo ejecutar un ejemplo

Requisitos: **Node.js 20 o superior**.

```bash
cd 01-localstorage   # o 02-usuario / 03-spa
npm install                       # instala dependencias (solo la primera vez)
npx playwright install chromium   # descarga el navegador para las pruebas E2E (una vez)
npm run dev                       # abre http://localhost:5173
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm test` | Pruebas con Vitest + Testing Library (modo *watch*) |
| `npm run test:run` | Pruebas una sola vez |
| `npm run test:e2e` | Pruebas end-to-end con Playwright en un navegador real |
| `npm run test:e2e:ui` | Playwright con interfaz visual (paso a paso, *time travel*) |
| `npm run test:e2e:report` | Abre el informe HTML de la última ejecución |
| `npm run build` | Genera la versión optimizada en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |

## Dos niveles de pruebas

| | Vitest + Testing Library (`src/**/*.test.jsx`) | Playwright (`e2e/*.spec.js`) |
| --- | --- | --- |
| Dónde corre | DOM simulado (jsdom), en Node | Navegador real (Chromium) |
| Qué prueba | Componentes y lógica, muy rápido | La app compilada, como la usa una persona |
| Ejemplos | Guardar en localStorage, validar formularios | Recargar con F5, varias pestañas, botón Atrás, que la SPA no recargue |

Playwright compila la app y levanta `vite preview` solo (cada ejemplo usa su propio puerto:
4173, 4174 y 4175). En GitHub Actions ([`pruebas.yml`](./.github/workflows/pruebas.yml)) se
corren ambos niveles para los tres ejemplos y el informe de Playwright queda como artefacto.

**Stack:** Vite 8 · React 19 · React Router 8 · Vitest · Testing Library · Playwright
