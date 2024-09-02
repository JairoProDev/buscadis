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
import { WhatsappShareButton, FacebookShareButton, TiktokShareButton } from "react-share";

function Modal({ anuncio, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = window.location.href;
  const title = anuncio.title;


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

  // Event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext]);

  // Event listener for swipe navigation on touch devices
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const handleTouchEnd = (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipeGesture();
    };

    const handleSwipeGesture = () => {
      if (touchStartX - touchEndX > 50) {
        onNext();
      }
      if (touchEndX - touchStartX > 50) {
        onPrev();
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onPrev, onNext]);

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${anuncio.adType.toLowerCase()} show`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-info">
          <p className="ad-card__date">
            {new Date(anuncio.createdAt).toLocaleDateString()} a las {new Date(anuncio.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          {anuncio.email && (
            <p className="modal-info">
              Email: <a href={`mailto:${anuncio.email}`}>{anuncio.email}</a>
            </p>
          )}
          {anuncio.amount && <p className="modal-info">Precio: {anuncio.amount}</p>}
          {anuncio.location && (
            <p className="modal-info">Ubicación: {anuncio.location}</p>
          )}
        </div>
        {anuncio.location && (
          <div className="modal-map">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(anuncio.location)}&output=embed`}
              width="100%"
              height="150"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        )}

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
