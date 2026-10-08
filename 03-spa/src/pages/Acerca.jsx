// Esta página se carga con React.lazy (ver App.jsx): Vite la separa en su propio archivo .js
// y el navegador solo la descarga la primera vez que alguien entra a /acerca.
export default function Acerca() {
  return (
    <section className="card">
      <h1>Acerca de</h1>
      <p>
        Esta página se cargó de forma diferida (<em>lazy loading</em>). Revisa la pestaña Network:
        verás un archivo <code>Acerca-*.js</code> que se descargó recién al entrar aquí.
      </p>
    </section>
  )
}
