import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdCard from "../AdCard/AdCard";
import "./adList.css";

function AdList({ adisos, setSelectedAd, viewMode }) {
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // Captura el ID del adiso desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    if (adisos.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    console.log("Anuncios recibidos en AdList:", adisos);
    console.log("Cantidad de adisos:", adisos.length);
  }, [adisos]);

  useEffect(() => {
    if (!loading && id) {
      const ad = adisos.find((adiso) => adiso._id === id);
      if (ad) {
        setSelectedAd(ad);
        console.log("Anuncio encontrado y seleccionado:", ad);
      } else {
        console.warn(`Anuncio con ID ${id} no encontrado.`);
      }
    }
  }, [setSelectedAd, loading, id, adisos]);

  const handleAdClick = (adiso) => {
    setSelectedAd(adiso);
    navigate(
      `/${adiso.adType}/${adiso.category}/${adiso.subCategory}/${adiso._id}`
    );
  };

  return (
    <div className="ads-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {loading ? (
          <p>Cargando adisos...</p>
        ) : adisos.length > 0 ? (
          adisos.map((adiso, index) => (
            <li key={adiso._id} className={`ad-size-${adiso.size || "normal"}`}>
              <div
                onClick={() => handleAdClick(adiso)}
                style={{ cursor: "pointer" }}
              >
                <AdCard
                  adiso={adiso}
                  number={index + 1}
                  setSelectedAd={setSelectedAd}
                  viewMode={viewMode} // Pasar el modo de vista a AdCard
                />
              </div>
            </li>
          ))
        ) : (
          <p>No se encontraron adisos para mostrar.</p>
        )}
      </ul>
    </div>
  );
}

export default AdList;