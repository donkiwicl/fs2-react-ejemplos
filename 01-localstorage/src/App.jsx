import Saludo from './components/Saludo.jsx'
import SelectorTema from './components/SelectorTema.jsx'
import ListaTareas from './components/ListaTareas.jsx'
import Inspector from './components/Inspector.jsx'

export default function App() {
  return (
    <main className="container">
      <h1>Ejemplo 1 · localStorage en React</h1>
      <p className="muted">
        Todo lo que escribas aquí se guarda en el navegador. Recarga la página o ciérrala y vuelve: los
        datos siguen ahí. Abre DevTools → Application → Local Storage para verlos.
      </p>
      <Saludo />
      <SelectorTema />
      <ListaTareas />
      <Inspector />
    </main>
  )
}
