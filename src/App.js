import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import Spinner from "./components/Spinner";
import swal from "sweetalert";
import axios from "axios";

function App() {
  const cancionesRandom = [
    { artista: "The strokes", cancion: "Ode To The Mets" },
    { artista: "Foster the people", cancion: "Sit next to me" },
    { artista: "Stuck in the sound", cancion: "Let's go" },
    { artista: "Panic! At the disco", cancion: "This is gospel" },
    { artista: "Simple plan", cancion: "Welcome to my life" },
    { artista: "My chemical romance", cancion: "Mama" },
    { artista: "The cranberries", cancion: "Zombie" },
    { artista: "Metallica", cancion: "Seek and destroy" },
    { artista: "Iron Maiden", cancion: "Hallowed Be Thy Name" },
    { artista: "Nirvana", cancion: "Smells like teen spirit" },
  ];

  const indicerandom = Math.floor(Math.random() * cancionesRandom.length);

  const [busquedaletra, guardarBusquedaLetra] = useState({
    artista: cancionesRandom[indicerandom].artista,
    cancion: cancionesRandom[indicerandom].cancion,
  });

  const [letra, guardarLetra] = useState("");
  const [artista, guardarArtista] = useState({});
  const [error, guardarError] = useState(false);
  const [cargar, guardarCargar] = useState(false);

  useEffect(() => {
    guardarCargar(true);
    if (Object.keys(busquedaletra).length === 0) return;
    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url_letra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url_artista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      axios
        .all([axios.get(url_letra), axios.get(url_artista)])
        .then(
          axios.spread((letra, info) => {
            guardarLetra(letra.data.lyrics);
            guardarArtista(info.data.artists[0]);
          })
        )
        .catch((error) => {
          guardarError(true);
        });
      guardarError(false);
    };

    consultarApiLetra();
    setTimeout(() => {
      guardarCargar(false);
    }, 3000);
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        {cargar ? (
          <Spinner />
        ) : error ? (
          swal({
            title: "Error",
            text:
              "No pudé encontrar la informacion que me solicitaste :(. Por favor, recarga la pagina",
            icon: "error",
            button: "Te perdono.",
          })
        ) : (
          <div className="row">
            <div className="col-md-6">
              <Info artista={artista} letra={letra} />
            </div>
            <div className="col-md-6">
              <Cancion letra={letra} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;
