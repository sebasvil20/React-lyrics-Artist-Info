import React, { Fragment } from "react";

const Cancion = ({ letra }) => {
  if (letra.length === 0)
    return <h2>Lamentablemente no tengo esas lyrics disponibles</h2>;
  return (
    <Fragment>
      <h2>Letra Canción</h2>
      <p className="letra">{letra}</p>
    </Fragment>
  );
};

export default Cancion;
