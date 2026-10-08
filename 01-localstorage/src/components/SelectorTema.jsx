import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Preferencia de interfaz: el tema elegido se recuerda entre visitas.
export default function SelectorTema() {
  const [tema, setTema] = useLocalStorage('ej1:tema', 'sistema')

  // Aplicamos el tema al <html> (el CSS usa :root[data-theme="..."]).
  useEffect(() => {
    if (tema === 'sistema') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = tema
  }, [tema])

  return (
    <section className="card">
      <h2>2. Guardar una preferencia</h2>
      <label>
        Tema:{' '}
        <select value={tema} onChange={(e) => setTema(e.target.value)}>
          <option value="sistema">Según el sistema</option>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </label>
    </section>
  )
}
