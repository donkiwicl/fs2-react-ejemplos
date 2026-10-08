# Ejemplo 1 · localStorage en React

Guarda datos en el navegador para que sobrevivan a recargas y cierres de pestaña.

```bash
npm install
npm run dev

# Pruebas
npm run test:run                  # Vitest (componentes, jsdom)
npx playwright install chromium   # solo la primera vez
npm run test:e2e                  # Playwright (navegador real)
```

Las pruebas E2E (`e2e/localstorage.spec.js`) recargan la página de verdad, abren dos pestañas para
probar la sincronización con el evento `storage` y leen el `localStorage` real del navegador.

## Qué incluye

| Archivo | Qué muestra |
| --- | --- |
| `src/hooks/useLocalStorage.js` | Hook reutilizable: igual que `useState`, pero persistente |
| `src/components/Saludo.jsx` | Guardar un texto simple |
| `src/components/SelectorTema.jsx` | Guardar una preferencia (tema claro/oscuro) |
| `src/components/ListaTareas.jsx` | Guardar un arreglo de objetos (CRUD de tareas) |
| `src/components/Inspector.jsx` | Leer lo guardado y borrar claves |

## La API en 30 segundos

```js
localStorage.setItem('clave', 'valor')       // guardar (solo texto)
localStorage.getItem('clave')                // leer → 'valor' o null si no existe
localStorage.removeItem('clave')             // borrar una clave
localStorage.clear()                         // borrar TODO lo del sitio

// Objetos y arreglos: convertir a texto con JSON
localStorage.setItem('tareas', JSON.stringify([{ id: 1, titulo: 'Estudiar' }]))
const tareas = JSON.parse(localStorage.getItem('tareas')) ?? []
```

## El hook

```jsx
const [tareas, setTareas] = useLocalStorage('ej1:tareas', [])
```

1. **Lee** el valor una sola vez al montar (`useState(() => ...)`, inicialización *lazy*).
2. **Escribe** en un `useEffect` cada vez que el valor cambia.
3. **Escucha** el evento `storage` para sincronizar otras pestañas abiertas.
4. Envuelve todo en `try/catch`: el JSON puede estar corrupto o el almacenamiento bloqueado.

## Buenas prácticas

- Usa un **prefijo** en las claves (`ej1:`) para no chocar con otras apps del mismo dominio.
  En GitHub Pages los tres ejemplos comparten origen (`donkiwicl.github.io`) y, por lo tanto,
  el mismo localStorage: por eso este usa `ej1:` y el de usuario `ej2:`.
- Límite aproximado: **5 MB** por sitio. No sirve para archivos grandes.
- Es **síncrono**: no guardes datos enormes en cada tecla.
- **No es seguro**: cualquier script de la página puede leerlo. Nunca guardes contraseñas
  ni datos sensibles. Para tokens de sesión reales se prefieren cookies `HttpOnly`.
- `sessionStorage` tiene la misma API, pero se borra al cerrar la pestaña.

Para ver los datos: DevTools → **Application** → **Local Storage**.
