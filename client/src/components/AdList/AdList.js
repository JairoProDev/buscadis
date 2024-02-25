import React from "react";
import AdCard from "../AdCard/AdCard";
import "./adList.css";

function AdList({ anuncios, setSelectedAd }) {
  console.log(anuncios);

  return (
    <div className="ad-container">
      <ul id="ad-list">
        {anuncios.map((anuncio, index) => (
          <AdCard
            key={anuncio._id}
            anuncio={anuncio}
            number={index+ 1}
            setSelectedAd={setSelectedAd}
          />
        ))}
      </ul>
    </div>
  );
}

export default AdList;
