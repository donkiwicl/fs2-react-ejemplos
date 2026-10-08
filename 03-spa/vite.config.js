import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: el build funciona en cualquier subcarpeta (por ejemplo GitHub Pages).
  base: './',
  plugins: [react()],
  // Configuración de Vitest (pruebas de componentes en un DOM simulado).
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}'], // e2e/ es de Playwright
    css: false,
  },
})
