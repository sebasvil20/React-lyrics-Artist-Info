import React from "react";

const Info = ({ artista, letra }) => {
  if (Object.keys(artista).length === 0) return null;

  const {
    strArtistThumb,
    strGenre,
    strBiographyES,
    strBiographyEN,
    strArtist,
  } = artista;
  return (
    <div className="card border-light">
      <div className="card-header bg-primary text-light">
        Informacion del artista: {strArtist}
      </div>
      <div className="card-doby">
        <img src={strArtistThumb} alt="Logo artista" />
        <p className="card-text">Género: {strGenre}</p>
        <h2 className="card-text">Biografía: </h2>
        {strBiographyES ? (
          <p className="card-text">{strBiographyES}</p>
        ) : (
          <div>
            <p className="card-text">
              No logré encontrar la biografía en español, pero la tengo en
              ingles :p
            </p>
            <p className="card-text">{strBiographyEN}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
