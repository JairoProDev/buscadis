import React, { useEffect, useState } from "react";
import AdCard from "../AdCard/AdCard";
import Modal from "../Modal/Modal";  // Asegúrate de crear este componente
import "./adList.css";

function AdList({ anuncios }) {
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    if (anuncios.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    console.log("Anuncios recibidos en AdList:", anuncios);
    console.log("Cantidad de anuncios:", anuncios.length);
  }, [anuncios]);

  const handleAdClick = (anuncio) => {
    setSelectedAd(anuncio);  // Al hacer clic en un anuncio, lo seleccionamos para mostrar en el modal
  };

  const closeModal = () => {
    setSelectedAd(null);  // Esta función cierra el modal
  };

  return (
    <div className="ads-container">
      <ul id="ad-list" style={{ listStyleType: "none" }}>
        {loading ? (
          <p>Cargando anuncios...</p>
        ) : anuncios.length > 0 ? (
          anuncios.map((anuncio, index) => (
            <li key={anuncio._id} className={`ad-size-${anuncio.size || "normal"}`}>
              <div
                onClick={() => handleAdClick(anuncio)}  // Ahora manejamos el clic para abrir el modal
                style={{ cursor: "pointer" }}
              >
                <AdCard
                  anuncio={anuncio}
                  number={index + 1}
                  setSelectedAd={setSelectedAd}
                />
              </div>
            </li>
          ))
        ) : (
          <p>No se encontraron anuncios para mostrar.</p>
        )}
      </ul>
      
      {selectedAd && (
        <Modal anuncio={selectedAd} onClose={closeModal} />
      )}
    </div>
  );
}

export default AdList;
