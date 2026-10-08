import { expect, test } from '@playwright/test'

// A diferencia de Vitest (jsdom), aquí hay un navegador real: podemos recargar con F5,
// abrir otra pestaña y leer el localStorage verdadero.

test('el nombre sobrevive a una recarga real de la página', async ({ page }) => {
  await page.goto('./')
  await page.getByPlaceholder('Escribe tu nombre').fill('Kiwi')
  await expect(page.getByText('¡Hola, Kiwi!')).toBeVisible()

  await page.reload()
  await expect(page.getByPlaceholder('Escribe tu nombre')).toHaveValue('Kiwi')
  expect(await page.evaluate(() => localStorage.getItem('ejemplo:nombre'))).toBe('"Kiwi"')
})

test('las tareas se guardan como JSON y persisten', async ({ page }) => {
  await page.goto('./')
  for (const tarea of ['Estudiar React', 'Hacer la tarea']) {
    await page.getByLabel('Nueva tarea').fill(tarea)
    await page.getByRole('button', { name: 'Agregar' }).click()
  }
  await page.getByLabel('Completar Estudiar React').check()
  await expect(page.getByText('1 pendiente(s)')).toBeVisible()

  await page.reload()
  await expect(page.getByLabel('Completar Estudiar React')).toBeChecked()
  await expect(page.getByText('Hacer la tarea', { exact: true })).toBeVisible()

  const guardadas = await page.evaluate(() => JSON.parse(localStorage.getItem('ejemplo:tareas')))
  expect(guardadas.map((t) => t.titulo)).toEqual(['Estudiar React', 'Hacer la tarea'])
})

test('el tema elegido se aplica y se recuerda', async ({ page }) => {
  await page.goto('./')
  await page.getByLabel('Tema').selectOption('dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('un cambio en una pestaña llega a la otra (evento storage)', async ({ context }) => {
  // Dos pestañas del mismo contexto comparten el localStorage, como en un navegador normal.
  const pestana1 = await context.newPage()
  const pestana2 = await context.newPage()
  await pestana1.goto('./')
  await pestana2.goto('./')

  await pestana1.getByPlaceholder('Escribe tu nombre').fill('Sincronizado')
  await expect(pestana2.getByText('¡Hola, Sincronizado!')).toBeVisible()
})

test('el botón de borrar limpia solo los datos del ejemplo', async ({ page }) => {
  await page.goto('./')
  await page.evaluate(() => localStorage.setItem('otra-app', 'no tocar'))
  await page.getByPlaceholder('Escribe tu nombre').fill('Kiwi')

  await page.getByRole('button', { name: 'Borrar datos del ejemplo' }).click()
  await expect(page.getByText('Aún no sé tu nombre.')).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('otra-app'))).toBe('no tocar')
})
