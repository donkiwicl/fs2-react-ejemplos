import { Link } from 'react-router'

export default function Inicio() {
  return (
    <>
      <h1>Ejemplo 3 · Single Page Application</h1>
      <p>
        Esta app tiene varias “páginas”, pero el navegador descargó un solo <code>index.html</code>.
        Al hacer clic en el menú, React Router cambia la URL y el componente visible sin recargar.
      </p>
      <section className="card">
        <h2>Prueba esto</h2>
        <ol>
          <li>Navega por el menú y mira el contador del pie de página: sube sin reiniciarse.</li>
          <li>Abre DevTools → Network: al navegar no se descargan documentos HTML nuevos.</li>
          <li>Usa los botones Atrás/Adelante del navegador: también funcionan.</li>
          <li>Filtra productos: el filtro queda en la URL y puedes compartir el enlace.</li>
        </ol>
        <Link className="btn btn--primary" to="/productos">Ver productos</Link>
      </section>
    </>
  )
}
