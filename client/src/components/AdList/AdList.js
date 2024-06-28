import React from "react";
import AdCard from "../AdCard/AdCard";
import "./adList.css";
import { Link } from "react-router-dom";

function AdList({ anuncios, setSelectedAd }) {
  return (
    <div className="ads-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {anuncios.map((anuncio, index) => (
          <li key={anuncio._id} className={`ad-size-${anuncio.size || "normal"}`}>
            <Link
              to={`/${anuncio.adType}/${anuncio.category}/${anuncio.subCategory}/${anuncio._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setSelectedAd(anuncio)} // Asegurarse de que se selecciona el anuncio al hacer clic
            >
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
