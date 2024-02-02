import React, { Fragment } from "react";
import useAds from "./hooks/useAds";

function MainComponent() {
  const { anuncios, agregarAnuncioAlPrincipio, error } = useAds();

  return (
    <Fragment>
      <div className="container">
        <div className="main-content">
          <ul>
            {anuncios.map((anuncio) => (
              <li key={anuncio._id}>{anuncio.title}</li>
            ))}
          </ul>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </Fragment>
  );
}

export default MainComponent;