import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Caso más simple: un string guardado bajo la clave "ej1:nombre".
export default function Saludo() {
  const [nombre, setNombre] = useLocalStorage('ej1:nombre', '')

  return (
    <section className="card">
      <h2>1. Guardar un texto</h2>
      <label>
        ¿Cómo te llamas?{' '}
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe tu nombre" />
      </label>
      <p>{nombre ? `¡Hola, ${nombre}! Recarga la página (F5): tu nombre sigue aquí.` : 'Aún no sé tu nombre.'}</p>
    </section>
  )
}
