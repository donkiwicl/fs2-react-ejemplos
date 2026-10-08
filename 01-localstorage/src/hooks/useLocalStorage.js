import { useEffect, useState } from 'react'

/**
 * Igual que useState, pero el valor se guarda en localStorage.
 *
 *   const [nombre, setNombre] = useLocalStorage('nombre', '')
 *
 * - localStorage solo guarda TEXTO: por eso usamos JSON.stringify al guardar
 *   y JSON.parse al leer (así funcionan números, booleanos, arreglos y objetos).
 * - Si el dato no existe o está corrupto, se usa el valor inicial.
 * - Si otra pestaña cambia la misma clave, el evento "storage" nos avisa y actualizamos.
 */
export function useLocalStorage(key, initialValue) {
  // Función "lazy": React la ejecuta solo en el primer render (no en cada render).
  const [value, setValue] = useState(() => readItem(key, initialValue))

  // Cada vez que cambia el valor, lo escribimos en localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Modo incógnito estricto o cuota llena (~5 MB): seguimos funcionando solo en memoria.
    }
  }, [key, value])

  // Sincronización entre pestañas: "storage" se dispara en las OTRAS pestañas del mismo sitio.
  useEffect(() => {
    function onStorage(event) {
      if (event.key === key) setValue(parse(event.newValue, initialValue))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, initialValue])

  return [value, setValue]
}

function readItem(key, fallback) {
  try {
    return parse(window.localStorage.getItem(key), fallback)
  } catch {
    return fallback
  }
}

function parse(raw, fallback) {
  if (raw === null) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}
