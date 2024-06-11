// AdList.js
import React from "react";
import AdCard from "../AdCard/AdCard";
import "./adList.css";
import { Link } from "react-router-dom";

function AdList({ anuncios, setSelectedAd }) {
  console.log(anuncios);

  return (
    <div className="ads-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {" "}
        {/* Agrega listStyleType: 'none' para eliminar los puntos de la lista */}
        {anuncios.map((anuncio, index) => (
          <li key={anuncio._id}>
            <Link
                to={`/${anuncio.category}/${anuncio.subcategory}/${anuncio._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flex: "1 0 calc(20% - 10px)",
                maxWidth: "calc(20% - 10px)",
              }}
            >
              {" "}
              {/* Aplica los estilos de Flexbox al componente Link */}
              <AdCard
                anuncio={anuncio}
                number={index + 1}
                setSelectedAd={setSelectedAd}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdList;
