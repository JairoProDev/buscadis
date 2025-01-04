import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { QRCodeCanvas } from "qrcode.react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./adDetailView.css";

function AdDetailView({ adiso, onClose, onNext, onPrev }) {
  const [activeTab, setActiveTab] = useState("detalles");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      onPrev();
    } else if (e.key === "ArrowRight") {
      onNext();
    }
  }, [onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="ad-detail-view">
      <div className="ad-detail-header">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="ad-detail-title">
          <h2>{adiso.title}</h2>
          <p>{new Date(adiso.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="ad-detail-body">
        <div className="ad-detail-tabs">
          <button
            className={activeTab === "detalles" ? "active" : ""}
            onClick={() => setActiveTab("detalles")}
          >
            Detalles
          </button>
          <button
            className={activeTab === "mapa" ? "active" : ""}
            onClick={() => setActiveTab("mapa")}
          >
            Ubicación
          </button>
          <button
            className={activeTab === "imagenes" ? "active" : ""}
            onClick={() => setActiveTab("imagenes")}
          >
            Imágenes
          </button>
        </div>
        <div className="ad-detail-content">
          {activeTab === "detalles" && (
            <div className="ad-detail-info">
              <QRCodeCanvas value={window.location.href} size={100} />
              <p>{adiso.description.replace(/\d{9}/g, "")}</p>
              <ContactButtons
                phone={adiso.phone}
                phone2={adiso.phone2}
                adType={adiso.adType}
                url={window.location.href}
                onContactClick={() => {}}
              />
            </div>
          )}
          {activeTab === "mapa" && (
            <div className="ad-detail-map">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(adiso.location)}&output=embed`}
                width="100%"
                height="250"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title={`Mapa de la ubicación: ${adiso.location}`}
              ></iframe>
            </div>
          )}
          {activeTab === "imagenes" && (
            <div className="ad-detail-images">
              {adiso.images && adiso.images.length > 0 ? (
                adiso.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Imagen ${index + 1}`}
                    onClick={() => handleImageClick(imageUrl)}
                    style={{ cursor: "pointer" }}
                  />
                ))
              ) : (
                <p>Este adiso no tiene imágenes.</p>
              )}
            </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Imagen ampliada" className="ampliada-img" />
            <button className="close-button" onClick={closeImageModal}>
              X
            </button>
          </div>
        </div>
      )}
      <div className="navigation-arrow navigation-arrow-left" onClick={onPrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="navigation-arrow navigation-arrow-right" onClick={onNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default AdDetailView;