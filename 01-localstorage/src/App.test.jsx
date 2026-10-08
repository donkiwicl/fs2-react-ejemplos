import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

beforeEach(() => localStorage.clear())

describe('localStorage', () => {
  it('guarda el nombre y lo recupera al volver a montar la app (como un F5)', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.type(screen.getByPlaceholderText('Escribe tu nombre'), 'Kiwi')
    expect(localStorage.getItem('ejemplo:nombre')).toBe('"Kiwi"')

    unmount()
    render(<App />)
    expect(screen.getByText(/¡Hola, Kiwi!/)).toBeInTheDocument()
  })

  it('agrega, completa y elimina tareas guardándolas como JSON', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Nueva tarea'), 'Estudiar hooks')
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    const guardadas = JSON.parse(localStorage.getItem('ejemplo:tareas'))
    expect(guardadas).toHaveLength(1)
    expect(guardadas[0]).toMatchObject({ titulo: 'Estudiar hooks', hecha: false })

    await user.click(screen.getByLabelText('Completar Estudiar hooks'))
    expect(JSON.parse(localStorage.getItem('ejemplo:tareas'))[0].hecha).toBe(true)

    await user.click(screen.getByLabelText('Eliminar Estudiar hooks'))
    expect(localStorage.getItem('ejemplo:tareas')).toBe('[]')
  })

  it('usa el valor inicial si el JSON guardado está corrupto', () => {
    localStorage.setItem('ejemplo:tareas', '{no es json')
    render(<App />)
    expect(screen.getByText('No hay tareas.')).toBeInTheDocument()
  })

  it('aplica el tema elegido al documento', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByLabelText(/Tema/), 'dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
