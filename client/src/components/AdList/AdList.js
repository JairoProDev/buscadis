import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdCard from "../AdCard/AdCard";
import Modal from "../Modal/Modal";  
import "./adList.css";

function AdList({ anuncios }) {
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);

  const { adId } = useParams();  // Captura el ID del anuncio desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    if (anuncios.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    console.log("Anuncios recibidos en AdList:", anuncios);
    console.log("Cantidad de anuncios:", anuncios.length);
  }, [anuncios]);

  useEffect(() => {
    if (!loading && adId) {
      const ad = anuncios.find(anuncio => anuncio._id === adId);
      if (ad) {
        setSelectedAd(ad);
        console.log("Anuncio encontrado y seleccionado:", ad);
      } else {
        console.warn(`Anuncio con ID ${adId} no encontrado.`);
      }
    }
  }, [loading, adId, anuncios]);

  const handleAdClick = (anuncio) => {
    setSelectedAd(anuncio);
    navigate(`/${anuncio.adType}/${anuncio.category}/${anuncio.subCategory}/${anuncio._id}`);
  };

  const closeModal = () => {
    setSelectedAd(null);
    navigate('/');  // Vuelve a la página principal al cerrar el modal
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
                onClick={() => handleAdClick(anuncio)} 
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
