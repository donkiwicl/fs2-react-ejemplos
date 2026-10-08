import { defineConfig, devices } from '@playwright/test'

// Pruebas end-to-end (E2E): Playwright abre un navegador real y usa la app como un usuario.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Reporte en consola + informe HTML en playwright-report/ (ver con: npx playwright show-report).
  reporter: [[process.env.CI ? 'github' : 'list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4175',
    trace: 'on-first-retry',
    // Evidencia: captura al final de cada prueba y video solo cuando una falla.
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright compila la app y levanta `vite preview` antes de correr las pruebas.
  // Cada ejemplo usa un puerto distinto para poder correrlos a la vez.
  webServer: {
    command: 'npm run build && npm run preview -- --port 4175 --strictPort',
    url: 'http://localhost:4175',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
