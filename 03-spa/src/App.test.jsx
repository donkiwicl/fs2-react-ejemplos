import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

// MemoryRouter guarda el historial en memoria: ideal para pruebas (no necesita navegador real).
function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

const menu = () => screen.getByRole('navigation', { name: 'Principal' })

describe('SPA con React Router', () => {
  it('navega entre páginas sin perder el estado del layout', async () => {
    const user = userEvent.setup()
    renderAt('/')
    expect(screen.getByTestId('contador')).toHaveTextContent('1')

    await user.click(screen.getByRole('link', { name: 'Productos' }))
    expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument()

    await user.click(screen.getAllByRole('link', { name: 'Ver detalle' })[0])
    expect(screen.getByRole('heading', { name: 'Kiwi verde' })).toBeInTheDocument()
    expect(screen.getByTestId('contador')).toHaveTextContent('3')
  })

  it('filtra productos usando parámetros de la URL', async () => {
    const user = userEvent.setup()
    renderAt('/productos?categoria=bebidas')
    expect(screen.getByText('Jugo de kiwi')).toBeInTheDocument()
    expect(screen.queryByText('Kiwi verde')).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Buscar producto'), 'smoothie')
    expect(screen.queryByText('Jugo de kiwi')).not.toBeInTheDocument()
    expect(screen.getByText('Smoothie kiwi-plátano')).toBeInTheDocument()
  })

  it('ruta dinámica con id inexistente', () => {
    renderAt('/productos/999')
    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeInTheDocument()
  })

  it('carga la página diferida (lazy)', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: 'Acerca' }))
    expect(await screen.findByRole('heading', { name: 'Acerca de' })).toBeInTheDocument()
  })

  it('envía el formulario y navega pasando datos por state', async () => {
    const user = userEvent.setup()
    renderAt('/contacto')
    await user.type(screen.getByLabelText('Nombre'), 'Kiwi')
    await user.type(screen.getByLabelText('Mensaje'), 'Hola')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByRole('heading', { name: '¡Gracias, Kiwi!' })).toBeInTheDocument()
  })

  it('muestra 404 en rutas desconocidas', () => {
    renderAt('/no-existe')
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(menu()).toBeInTheDocument()
  })
})
