import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// demora={0}: el "backend" simulado responde al instante en las pruebas.
function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider demora={0}>
        <App />
      </AuthProvider>
    </MemoryRouter>,
  )
}

async function iniciarSesion(user, email, password) {
  await user.type(screen.getByLabelText('Email'), email)
  await user.type(screen.getByLabelText('Contraseña'), password)
  await user.click(screen.getByRole('button', { name: 'Ingresar' }))
}

beforeEach(() => localStorage.clear())

describe('Manejo de usuario', () => {
  it('una ruta protegida redirige a login y vuelve tras iniciar sesión', async () => {
    const user = userEvent.setup()
    renderAt('/perfil')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()

    await iniciarSesion(user, 'user@kiwi.cl', 'user123')
    expect(await screen.findByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument()
    expect(screen.getByText('Hola,')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('ejemplo:sesion')).email).toBe('user@kiwi.cl')
    expect(localStorage.getItem('ejemplo:sesion')).not.toContain('password')
  })

  it('muestra error con credenciales inválidas', async () => {
    const user = userEvent.setup()
    renderAt('/login')
    await iniciarSesion(user, 'user@kiwi.cl', 'malaclave')
    expect(await screen.findByRole('alert')).toHaveTextContent('incorrectos')
  })

  it('la sesión sobrevive a una recarga y se puede cerrar', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/login')
    await iniciarSesion(user, 'user@kiwi.cl', 'user123')
    await screen.findByRole('heading', { name: 'Mi perfil' })

    unmount()
    renderAt('/perfil')
    expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(await screen.findByRole('heading', { name: 'Ejemplo 2 · Manejo de usuario' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(localStorage.getItem('ejemplo:sesion')).toBeNull()
  })

  it('solo el admin entra al panel de administración', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/login')
    await iniciarSesion(user, 'user@kiwi.cl', 'user123')
    await screen.findByRole('heading', { name: 'Mi perfil' })
    unmount()

    renderAt('/admin')
    expect(screen.getByRole('heading', { name: 'Acceso denegado' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

    await user.click(screen.getByRole('link', { name: 'Iniciar sesión' }))
    await iniciarSesion(user, 'admin@kiwi.cl', 'admin123')
    await user.click(await screen.findByRole('link', { name: 'Admin' }))
    expect(screen.getByRole('heading', { name: 'Panel de administración' })).toBeInTheDocument()
    expect(screen.getByText('user@kiwi.cl')).toBeInTheDocument()
  })

  it('registra un usuario nuevo y valida contraseñas', async () => {
    const user = userEvent.setup()
    renderAt('/registro')
    await user.type(screen.getByLabelText('Nombre'), 'Nueva')
    await user.type(screen.getByLabelText('Email'), 'nueva@kiwi.cl')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta1')
    await user.type(screen.getByLabelText('Repetir contraseña'), 'otra')
    await user.click(screen.getByRole('button', { name: 'Registrarme' }))
    expect(screen.getByRole('alert')).toHaveTextContent('no coinciden')

    await user.clear(screen.getByLabelText('Repetir contraseña'))
    await user.type(screen.getByLabelText('Repetir contraseña'), 'secreta1')
    await user.click(screen.getByRole('button', { name: 'Registrarme' }))
    expect(await screen.findByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument()
    expect(screen.getByText('nueva@kiwi.cl')).toBeInTheDocument()
  })

  it('actualiza el nombre del perfil', async () => {
    const user = userEvent.setup()
    renderAt('/login')
    await iniciarSesion(user, 'user@kiwi.cl', 'user123')
    const campo = await screen.findByLabelText('Nombre visible')
    await user.clear(campo)
    await user.type(campo, 'Kiwi Renombrado')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(await screen.findByText('Kiwi Renombrado')).toBeInTheDocument()
  })
})
