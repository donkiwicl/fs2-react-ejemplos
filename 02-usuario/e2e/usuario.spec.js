import { expect, test } from '@playwright/test'

// Flujos completos de usuario en un navegador real (cada prueba parte con localStorage vacío).

async function iniciarSesion(page, email, password) {
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Contraseña').fill(password)
  await page.getByRole('button', { name: 'Ingresar' }).click()
}

test('ruta protegida → login → vuelve a la página pedida', async ({ page }) => {
  await page.goto('./#/perfil')
  await expect(page).toHaveURL(/#\/login$/)

  await iniciarSesion(page, 'user@kiwi.cl', 'user123')
  await expect(page).toHaveURL(/#\/perfil$/)
  await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
})

test('la sesión sigue activa al recargar y se cierra con logout', async ({ page }) => {
  await page.goto('./#/login')
  await iniciarSesion(page, 'user@kiwi.cl', 'user123')
  await expect(page.getByText('Hola, Usuario Kiwi')).toBeVisible()

  await page.reload()
  await expect(page.getByText('Hola, Usuario Kiwi')).toBeVisible()

  // La sesión guardada nunca incluye la contraseña.
  const sesion = await page.evaluate(() => localStorage.getItem('ej2:sesion'))
  expect(sesion).not.toContain('password')

  await page.getByRole('button', { name: 'Cerrar sesión' }).click()
  await expect(page).toHaveURL(/#\/$/)
  await page.goto('./#/perfil')
  await expect(page).toHaveURL(/#\/login$/)
})

test('credenciales incorrectas muestran un error', async ({ page }) => {
  await page.goto('./#/login')
  await iniciarSesion(page, 'user@kiwi.cl', 'clave-mala')
  await expect(page.getByRole('alert')).toHaveText('Email o contraseña incorrectos')
})

test('un usuario normal no puede entrar al panel admin', async ({ page }) => {
  await page.goto('./#/login')
  await iniciarSesion(page, 'user@kiwi.cl', 'user123')
  await expect(page.getByRole('link', { name: 'Admin' })).toHaveCount(0)

  await page.goto('./#/admin')
  await expect(page.getByRole('heading', { name: 'Acceso denegado' })).toBeVisible()
})

test('el admin ve el panel con la lista de usuarios', async ({ page }) => {
  await page.goto('./#/login')
  await iniciarSesion(page, 'admin@kiwi.cl', 'admin123')
  await page.getByRole('link', { name: 'Admin' }).click()
  await expect(page.getByRole('heading', { name: 'Panel de administración' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'user@kiwi.cl' })).toBeVisible()
})

test('registro de un usuario nuevo y nuevo inicio de sesión', async ({ page }) => {
  await page.goto('./#/registro')
  await page.getByLabel('Nombre').fill('Nueva Kiwi')
  await page.getByLabel('Email').fill('nueva@kiwi.cl')
  await page.getByLabel('Contraseña', { exact: true }).fill('secreta1')
  await page.getByLabel('Repetir contraseña').fill('secreta1')
  await page.getByRole('button', { name: 'Registrarme' }).click()
  await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()

  // La cuenta queda guardada: se puede cerrar sesión y volver a entrar con ella.
  await page.getByRole('button', { name: 'Cerrar sesión' }).click()
  await page.getByRole('link', { name: 'Iniciar sesión' }).click()
  await iniciarSesion(page, 'nueva@kiwi.cl', 'secreta1')
  await expect(page.getByText('Hola, Nueva Kiwi')).toBeVisible()
})
