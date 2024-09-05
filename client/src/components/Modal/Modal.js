import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShareAlt, 
  faFlag,  
  faCopy, 
  faArrowLeft, 
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebook, 
  faTwitter, 
  faWhatsapp 
} from "@fortawesome/free-brands-svg-icons";
import "./modal.css";
import ContactButtons from "../ContactButtons/ContactButtons";
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton 
} from "react-share";

function Modal({ anuncio, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  let touchStartX = 0;

  useEffect(() => {
    setIsOpen(true);
    const modalElement = document.getElementById("modal-content");
    if (modalElement) modalElement.focus();

    // Agregar evento de teclado para cambio de anuncio
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext]);

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      onNext();
    } else if (touchEndX - touchStartX > 50) {
      onPrev();
    }
  };

  const toggleShareMenu = (e) => {
    e.stopPropagation();
    setIsShareOpen(!isShareOpen);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Enlace copiado al portapapeles");
  };

  const handleReport = () => {
    alert("Anuncio reportado");
  };

  // Detectar si estamos dentro de un WebView
  const isWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (userAgent.includes('wv') || userAgent.includes('WebView')) || 
           (userAgent.includes('Android') && userAgent.includes('Chrome') && userAgent.includes('Version'));
  };

  // Si estamos en un WebView, probar si el iframe carga o es bloqueado
  useEffect(() => {
    if (isWebView() && anuncio.location) {
      // Usamos un temporizador para ver si el iframe fue bloqueado
      const iframeCheckTimeout = setTimeout(() => {
        setIframeBlocked(true); // Si en este tiempo no carga, consideramos que fue bloqueado
      }, 3000); // Ajusta el tiempo según la velocidad de carga esperada

      return () => clearTimeout(iframeCheckTimeout); // Limpia el timeout cuando se desmonte
    }
  }, [anuncio.location]);

  const shareUrl = window.location.href;
  const title = anuncio.title;

  return (
    <div 
      className={`modal-overlay ${isOpen ? "show" : ""}`} 
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        id="modal-content"
        className={`modal-content ${anuncio.adType.toLowerCase()} show`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-info">
            <p className="ad-card__date">
              {new Date(anuncio.createdAt).toLocaleDateString()} a las{" "}
              {new Date(anuncio.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              {anuncio.adType}/{anuncio.category}/{anuncio.subCategory}
            </p>
          </div>
          <div className="modal-header-icons">
            <button onClick={handleCopyLink}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
            <div className="share-icon" onClick={toggleShareMenu}>
              <FontAwesomeIcon icon={faShareAlt} />
              {isShareOpen && (
                <div className="share-menu" onClick={(e) => e.stopPropagation()}>
                  <FacebookShareButton url={shareUrl} quote={title} className="facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={title} className="twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={title} className="whatsapp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </WhatsappShareButton>
                  <button className="more-options">...</button>
                </div>
              )}
            </div>
            <button onClick={handleReport}>
              <FontAwesomeIcon icon={faFlag} />
            </button>
          </div>
        </div>
        <h2 id="modal-title" className="modal-title">
          {anuncio.title}
        </h2>
        <div id="modal-description" className="modal-body">
          <p className="modal-description">{anuncio.description}</p>
          {anuncio.images &&
            anuncio.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                onError={(e) => {
                  e.target.src = "/path/to/default-image.png";
                }}
              />
            ))}
          {anuncio.email && (
            <p className="modal-info">
              Email: <a href={`mailto:${anuncio.email}`}>{anuncio.email}</a>
            </p>
          )}
          {anuncio.amount && (
            <p className="modal-info">Precio: {anuncio.amount}</p>
          )}
          {anuncio.location && (
            <p className="modal-info">Ubicación: {anuncio.location}</p>
          )}
        </div>
        {anuncio.location && (
          <div className="modal-map">
            {!iframeBlocked ? (
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(anuncio.location)}&output=embed`}
                width="100%"
                height="250"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title={`Mapa de la ubicación: ${anuncio.location}`}
              ></iframe>
            ) : (
              // Mostrar un enlace a Google Maps si el iframe es bloqueado
              <a 
                href={`https://www.google.com/maps?q=${encodeURIComponent(anuncio.location)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ver ubicación en Google Maps
              </a>
            )}
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
      </div>

      {/* Flechas de navegación fuera del modal */}
      <div
        className="navigation-arrow navigation-arrow-left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div
        className="navigation-arrow navigation-arrow-right"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default Modal;
