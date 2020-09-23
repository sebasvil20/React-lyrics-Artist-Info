import React, { useState } from "react";
import swal from "sweetalert";

const Formulario = ({ guardarBusquedaLetra }) => {
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });

  const [error, guardarError] = useState(false);

  const { artista, cancion } = busqueda;

  //funcion a cada input para leer su contenido

  const actualizarState = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const buscarInformacion = (e) => {
    e.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      swal({
        title: "Error",
        text: "No puedo buscar si no llenas algun campo :(",
        icon: "error",
        button: "Prometo llenar todos los campos",
      });

      return;
    }

    //todo bien, pasar al componente principal
    guardarError(false);
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={buscarInformacion}
          >
            <fieldset>
              <legend align="center" className="text-center">
                Song lyrics And Artist Info
              </legend>
              <div className="row">
                <div className="col-md-6">
                  <label>Artista</label>
                  <div className="form-group">
                    <input
                      className="input-bonito"
                      type="text"
                      name="artista"
                      placeholder="Ingrese el nombre del artista"
                      onChange={actualizarState}
                      value={artista}
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Canción</label>
                  <div className="form-group">
                    <input
                      className="input-bonito"
                      type="text"
                      name="cancion"
                      placeholder="Ingrese el nombre de la canción"
                      onChange={actualizarState}
                      value={cancion}
                    />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <button className="boton-bonito red">BUSCAR</button>
              </div>
              <div className="row justify-content-center mt-4 mb-0">
                <p>
                  PD: Intentaremos mostrarte una canción random Puedes igual
                  buscar cualquiera
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
