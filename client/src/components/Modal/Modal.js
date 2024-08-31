import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareSquare,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import "./modal.css";
import ContactButtons from "../ContactButtons/ContactButtons"; // Asumiendo que tienes este componente

function Modal({ anuncio, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Abrir el modal cuando se monte
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: anuncio.title,
          text: anuncio.description,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported on this browser, do it manually.");
    }
  };

  const handleReport = () => {
    alert("Reported!");
  };

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${anuncio.adType.toLowerCase()}`}
        onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro del modal cierre el modal
      >
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          <div className="modal-header-info">
            <p className="ad-card__date">{new Date(anuncio.createdAt).toLocaleDateString()}</p>
            <p>{anuncio.adType}</p>
          </div>
          <div className="modal-header-icons">
            <button onClick={handleShare}>
              <FontAwesomeIcon icon={faShareSquare} />
            </button>
            <button onClick={handleReport}>
              <FontAwesomeIcon icon={faFlag} />
            </button>
          </div>
        </div>
        <h2 className="modal-title">{anuncio.title}</h2>
        <div className="modal-body">
          <p className="modal-description">{anuncio.description}</p>
          {anuncio.images &&
            anuncio.images.map((image, index) => (
              <img key={index} src={image} alt={`Imagen ${index + 1}`} />
            ))}
          <p className="modal-info">Ubicación: {anuncio.location}</p>
          {anuncio.email && <p className="modal-info">Email: {anuncio.email}</p>}
        </div>
        <div className="modal-footer">
          <ContactButtons
            phone={anuncio.phone}
            phone2={anuncio.phone2}
            adType={anuncio.adType}
            url={window.location.href}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
