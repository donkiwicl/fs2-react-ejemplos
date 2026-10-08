import { createContext, useContext, useEffect, useState } from 'react'
import * as authApi from '../services/auth.js'

/**
 * Contexto de autenticación: guarda el usuario logueado y lo comparte con toda la app
 * sin tener que pasarlo por props componente por componente ("prop drilling").
 *
 * La sesión se guarda en localStorage para que siga activa al recargar la página.
 */
const AuthContext = createContext(null)
const CLAVE_SESION = 'ej2:sesion'

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function AuthProvider({ children, demora }) {
  const [usuario, setUsuario] = useState(leerSesion)

  useEffect(() => {
    if (usuario) localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
    else localStorage.removeItem(CLAVE_SESION)
  }, [usuario])

  const value = {
    usuario,
    estaLogueado: usuario !== null,
    esAdmin: usuario?.rol === 'admin',
    async login(email, password) {
      setUsuario(await authApi.login(email, password, { demora }))
    },
    async registrar(datos) {
      setUsuario(await authApi.registrar(datos, { demora }))
    },
    async actualizarPerfil(cambios) {
      setUsuario(await authApi.actualizarUsuario(usuario.id, cambios))
    },
    logout() {
      setUsuario(null)
    },
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

// Hook para usar el contexto: const { usuario, login, logout } = useAuth()
export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return contexto
}
