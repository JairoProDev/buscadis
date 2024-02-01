import React from "react";
import AdCard from "../AdCard/AdCard";
 import "./adList.css";

function AdList({ anuncios }) {
  return (
    <div className="anuncios-column">
      <ul id="anuncios-list">
        {anuncios.map((anuncio) => (
          <AdCard key={anuncio._id} anuncio={anuncio} />
        ))}
      </ul>
    </div>
  );
}

export default AdList;
