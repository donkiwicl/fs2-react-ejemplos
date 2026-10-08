# Ejemplo 2 · Manejo de usuario en React

Registro, inicio y cierre de sesión, perfil editable, rutas protegidas y roles.

```bash
npm install
npm run dev
```

Cuentas de prueba:

| Email | Contraseña | Rol |
| --- | --- | --- |
| `admin@kiwi.cl` | `admin123` | admin |
| `user@kiwi.cl` | `user123` | usuario |

## Arquitectura

```
main.jsx
└─ HashRouter
   └─ AuthProvider            ← context/AuthContext.jsx: quién está logueado
      └─ App (rutas)
         └─ Layout            ← navbar cambia según la sesión
            ├─ /              público
            ├─ /login         público
            ├─ /registro      público
            ├─ RequireAuth    ← components/RequireAuth.jsx
            │  └─ /perfil     requiere sesión
            └─ RequireAuth rol="admin"
               └─ /admin      requiere rol admin
```

| Archivo | Rol |
| --- | --- |
| `src/services/auth.js` | "Backend" simulado: `login`, `registrar`, `actualizarUsuario` (async, con latencia) |
| `src/context/AuthContext.jsx` | `AuthProvider` + hook `useAuth()` con `usuario`, `login`, `logout`, `registrar`… |
| `src/components/RequireAuth.jsx` | Redirige a `/login` si no hay sesión y recuerda la página de origen |
| `src/pages/Login.jsx` / `Registro.jsx` | Formularios controlados, errores y estado "enviando" |
| `src/pages/Perfil.jsx` | Página protegida que edita datos del usuario |
| `src/pages/Admin.jsx` | Página solo para el rol admin |

## Conceptos clave

- **Context API**: `useAuth()` entrega el usuario a cualquier componente sin pasar props.
- **Sesión persistente**: el usuario (sin contraseña) se guarda en `localStorage`, así la sesión
  sigue activa al recargar.
- **Rutas protegidas**: `<RequireAuth />` es una ruta "layout" que muestra `<Outlet />` solo si
  hay sesión; si no, `<Navigate to="/login" state={{ from }} />`.
- **Volver al origen**: tras el login se navega a `location.state.from`.

## ⚠️ Importante

Esto es **solo un ejemplo educativo**: los usuarios y contraseñas se guardan en el navegador.
En una aplicación real:

- La contraseña se envía al **servidor**, que la valida contra un hash (bcrypt/argon2).
- El servidor devuelve un **token** (JWT o cookie de sesión `HttpOnly`).
- Ocultar un botón o una ruta en React **no es seguridad**: la API debe verificar permisos.
