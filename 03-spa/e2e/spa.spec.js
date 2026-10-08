import { expect, test } from '@playwright/test'

// Lo que hace a una SPA solo se puede comprobar en un navegador real:
// que al navegar NO se descarga otro HTML y que Atrás/Adelante y los enlaces directos funcionan.

test('navegar por el menú no recarga la página', async ({ page }) => {
  // Contamos los documentos HTML que pide el navegador: en una SPA debe ser solo 1.
  const documentos = []
  page.on('request', (req) => {
    if (req.resourceType() === 'document') documentos.push(req.url())
  })

  await page.goto('./')
  // Marca en window: si la página se recargara, desaparecería.
  await page.evaluate(() => (window.sinRecargar = true))

  const menu = page.getByRole('navigation', { name: 'Principal' })
  await menu.getByRole('link', { name: 'Productos' }).click()
  await expect(page).toHaveURL(/#\/productos$/)
  await menu.getByRole('link', { name: 'Contacto' }).click()
  await expect(page).toHaveURL(/#\/contacto$/)

  expect(await page.evaluate(() => window.sinRecargar)).toBe(true)
  expect(documentos).toHaveLength(1)
  await expect(page.getByTestId('contador')).toHaveText('3')
})

test('el menú marca la página activa', async ({ page }) => {
  await page.goto('./#/productos')
  const menu = page.getByRole('navigation', { name: 'Principal' })
  await expect(menu.getByRole('link', { name: 'Productos' })).toHaveClass(/active/)
  await expect(menu.getByRole('link', { name: 'Inicio' })).not.toHaveClass(/active/)
})

test('los filtros viven en la URL y sobreviven a Atrás', async ({ page }) => {
  await page.goto('./#/productos')
  await page.getByLabel('Categoría').selectOption('bebidas')
  await expect(page).toHaveURL(/categoria=bebidas/)
  await expect(page.getByRole('heading', { name: 'Kiwi verde' })).toHaveCount(0)

  await page.getByRole('link', { name: 'Ver detalle' }).first().click()
  await expect(page.getByRole('heading', { name: 'Jugo de kiwi' })).toBeVisible()

  await page.goBack()
  await expect(page).toHaveURL(/categoria=bebidas/)
  await expect(page.getByLabel('Categoría')).toHaveValue('bebidas')
})

test('un enlace directo (deep link) abre la página correcta', async ({ page }) => {
  await page.goto('./#/productos/2')
  await expect(page.getByRole('heading', { name: 'Kiwi dorado' })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('heading', { name: 'Kiwi dorado' })).toBeVisible()
})

test('la página Acerca se descarga recién al visitarla (lazy loading)', async ({ page }) => {
  await page.goto('./')
  const chunk = page.waitForRequest(/Acerca-.*\.js$/)
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Acerca' }).click()
  await chunk
  await expect(page.getByRole('heading', { name: 'Acerca de' })).toBeVisible()
})

test('el formulario navega a la página de gracias', async ({ page }) => {
  await page.goto('./#/contacto')
  await page.getByLabel('Nombre').fill('Kiwi')
  await page.getByLabel('Mensaje').fill('Hola desde Playwright')
  await page.getByRole('button', { name: 'Enviar' }).click()
  await expect(page).toHaveURL(/#\/contacto\/gracias$/)
  await expect(page.getByRole('heading', { name: '¡Gracias, Kiwi!' })).toBeVisible()
})

test('una ruta inexistente muestra 404 dentro del layout', async ({ page }) => {
  await page.goto('./#/no-existe')
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible()
})
