import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareSquare,
  faFlag,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./modal.css";
import ContactButtons from "../ContactButtons/ContactButtons";

function Modal({ anuncio, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
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
        className={`modal-content ${anuncio.adType.toLowerCase()} show`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-info">
            <p className="ad-card__date">
              {new Date(anuncio.createdAt).toLocaleDateString()}
            </p>
            <p>
              {anuncio.adType}/{anuncio.category}/{anuncio.subCategory}
            </p>
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
          {anuncio.email && (
            <p className="modal-info">Email: {anuncio.email}</p>
          )}
        </div>
        <div className="modal-footer">
          <ContactButtons
            phone={anuncio.phone}
            phone2={anuncio.phone2}
            adType={anuncio.adType}
            url={window.location.href}
          />
        </div>
        <div className="modal-navigation">
          <button onClick={onPrev} className="modal-nav-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={onNext} className="modal-nav-button">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
