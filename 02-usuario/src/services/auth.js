/**
 * "Backend" simulado. En un proyecto real estas funciones harían fetch() a una API
 * (por ejemplo POST /api/login) y el servidor validaría la contraseña.
 *
 * ⚠️ Solo para aprender: aquí los usuarios y contraseñas quedan en localStorage en texto
 * plano. NUNCA hagas esto en producción: la contraseña se valida en el servidor.
 */
const CLAVE_USUARIOS = 'ejemplo:usuarios'

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Admin Kiwi', email: 'admin@kiwi.cl', password: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'Usuario Kiwi', email: 'user@kiwi.cl', password: 'user123', rol: 'usuario' },
]

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) ?? USUARIOS_INICIALES
  } catch {
    return USUARIOS_INICIALES
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
}

// Nunca devolvemos la contraseña al resto de la app.
function sinPassword(usuario) {
  const { password: _password, ...publico } = usuario
  return publico
}

export async function login(email, password, { demora = 400 } = {}) {
  await esperar(demora) // simula la latencia de la red
  const usuario = leerUsuarios().find((u) => u.email === email.trim().toLowerCase())
  if (!usuario || usuario.password !== password) throw new Error('Email o contraseña incorrectos')
  return sinPassword(usuario)
}

export async function registrar({ nombre, email, password }, { demora = 400 } = {}) {
  await esperar(demora)
  const usuarios = leerUsuarios()
  const emailNormalizado = email.trim().toLowerCase()
  if (usuarios.some((u) => u.email === emailNormalizado)) throw new Error('Ese email ya está registrado')
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')

  const nuevo = { id: Date.now(), nombre: nombre.trim(), email: emailNormalizado, password, rol: 'usuario' }
  guardarUsuarios([...usuarios, nuevo])
  return sinPassword(nuevo)
}

export async function actualizarUsuario(id, cambios) {
  const usuarios = leerUsuarios().map((u) => (u.id === id ? { ...u, ...cambios } : u))
  guardarUsuarios(usuarios)
  return sinPassword(usuarios.find((u) => u.id === id))
}

export function listarUsuarios() {
  return leerUsuarios().map(sinPassword)
}
