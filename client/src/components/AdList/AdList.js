import React, { useEffect } from "react";
import AdCard from "../AdCard/AdCard";
import "./adList.css";
import { Link } from "react-router-dom";

function AdList({ anuncios, setSelectedAd }) {
  useEffect(() => {
    console.log("Anuncios recibidos en AdList:", anuncios);
    console.log("Cantidad de anuncios:", anuncios.length);
  }, [anuncios]);

  return (
    <div className="ads-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {anuncios.length > 0 ? (
          anuncios.map((anuncio, index) => (
            <li key={anuncio._id} className={`ad-size-${anuncio.size || "normal"}`}>
              <Link
                to={`/${anuncio.adType}/${anuncio.category}/${anuncio.subCategory}/${anuncio._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => setSelectedAd(anuncio)}
              >
                <AdCard
                  anuncio={anuncio}
                  number={index + 1}
                  setSelectedAd={setSelectedAd}
                />
              </Link>
            </li>
          ))
        ) : (
          <p>No se encontraron anuncios para mostrar.</p>
        )}
      </ul>
    </div>
  );
}

export default AdList;
