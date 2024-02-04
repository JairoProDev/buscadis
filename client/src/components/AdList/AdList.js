import React from "react";
import AdCard from "../AdCard/AdCard";
import "./adList.css";

function AdList({ anuncios }) {
  console.log(anuncios);

  return (
    <div className="ad-column">
      <ul id="ad-list">
        {anuncios.map((anuncio) => (
          <AdCard key={anuncio._id} anuncio={anuncio} />
        ))}
      </ul>
    </div>
  );
}

export default AdList;
