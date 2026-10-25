import { useMemo, useState } from "react";

const perritos = [
  { id: 1, nombre: "Luna", edad: "2 años", tamano: "Mediano", descripcion: "Cariñosa y juguetona.", imagen: "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg" },
  { id: 2, nombre: "Toby", edad: "1 año", tamano: "Pequeño", descripcion: "Activo y le encanta pasear.", imagen: "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_100.jpg" },
  { id: 3, nombre: "Milo", edad: "3 años", tamano: "Mediano", descripcion: "Tranquilo y compañero.", imagen: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg" },
  { id: 4, nombre: "Nala", edad: "8 meses", tamano: "Pequeño", descripcion: "Curiosa y muy tierna.", imagen: "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg" },
  { id: 5, nombre: "Rocky", edad: "4 años", tamano: "Grande", descripcion: "Amistoso y fiel.", imagen: "https://images.dog.ceo/breeds/shepherd-german/n02106662_118.jpg" },
  { id: 6, nombre: "Mora", edad: "2 años", tamano: "Pequeño", descripcion: "Dulce y de buen carácter.", imagen: "https://images.dog.ceo/breeds/pug/n02110958_12045.jpg" }
];

export default function App() {
  const [busqueda, setBusqueda] = useState("");
  const [tamano, setTamano] = useState("Todos");
  const [solicitudes, setSolicitudes] = useState([]);

  const lista = useMemo(() => perritos.filter((perrito) => {
    const coincideNombre = perrito.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTamano = tamano === "Todos" || perrito.tamano === tamano;
    return coincideNombre && coincideTamano;
  }), [busqueda, tamano]);

  function solicitarAdopcion(perrito) {
    if (!solicitudes.includes(perrito.id)) {
      setSolicitudes([...solicitudes, perrito.id]);
    }
  }

  return (
    <main>
      <header className="hero">
        <p className="mini">UNA FAMILIA PARA CADA COLITA</p>
        <h1>Adopta un perrito</h1>
        <p>Conoce a estos amigos que buscan un hogar lleno de cariño.</p>
      </header>
      <section className="contenedor">
        <div className="filtros">
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre..." aria-label="Buscar por nombre" />
          <select value={tamano} onChange={(e) => setTamano(e.target.value)} aria-label="Filtrar por tamaño">
            <option>Todos</option><option>Pequeño</option><option>Mediano</option><option>Grande</option>
          </select>
        </div>
        <p className="contador">{lista.length} perrito(s) disponible(s)</p>
        <div className="grid">
          {lista.map((perrito) => (
            <article className="card" key={perrito.id}>
              <img src={perrito.imagen} alt={`Perrito ${perrito.nombre}`} />
              <div className="info">
                <h2>{perrito.nombre}</h2>
                <p><b>Edad:</b> {perrito.edad}</p>
                <p><b>Tamaño:</b> {perrito.tamano}</p>
                <p>{perrito.descripcion}</p>
                <button onClick={() => solicitarAdopcion(perrito)} disabled={solicitudes.includes(perrito.id)}>
                  {solicitudes.includes(perrito.id) ? "Solicitud registrada" : "Quiero adoptarlo"}
                </button>
              </div>
            </article>
          ))}
        </div>
        {lista.length === 0 && <p className="vacio">No encontramos perritos con esos filtros.</p>}
        {solicitudes.length > 0 && <p className="aviso">Registraste interés por {solicitudes.length} perrito(s). Esta demostración no envía una solicitud real.</p>}
      </section>
      <footer>Adopta con responsabilidad y mucho amor 🐾</footer>
    </main>
  );
}
