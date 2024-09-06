import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { QRCodeCanvas } from "qrcode.react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./modal.css";

function Modal({ anuncio, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState("detalles");
  const [viewCount, setViewCount] = useState(250); // Simulación de vistas
  const [applicationsCount, setApplicationsCount] = useState(15); // Simulación de aplicaciones
  const [availablePositions, setAvailablePositions] = useState(2); // Posiciones disponibles
  
  let touchStartX = 0;

  useEffect(() => {
    setIsOpen(true);
    const modalElement = document.getElementById("modal-content");
    if (modalElement) modalElement.focus();

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

  const formattedDate = new Date(anuncio.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(anuncio.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (userAgent.includes('wv') || userAgent.includes('WebView')) || 
           (userAgent.includes('Android') && userAgent.includes('Chrome') && userAgent.includes('Version'));
  };

  useEffect(() => {
    if (isWebView() && anuncio.location) {
      const iframeCheckTimeout = setTimeout(() => {
        setIframeBlocked(true);
      }, 3000);
      return () => clearTimeout(iframeCheckTimeout);
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
          <a href="https://publicadis.com" className="modal-header-link">
            BuscAdis.com
          </a>
          <div className="modal-route">
            {anuncio.adType} / {anuncio.category} / {anuncio.subCategory}
          </div>
          <p className="ad-card__date">{formattedDate} a las {formattedTime}</p>
          <button className="modal-options-button" onClick={toggleShareMenu}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>

        {isShareOpen && (
          <div className="modal-options">
            <ul>
              <li onClick={() => alert("Reportar anuncio")}>
                Reportar
              </li>
              <li onClick={() => alert("Copiar enlace")}>
                Copiar enlace
              </li>
              <li onClick={() => alert("Compartir")}>
                Compartir
              </li>
            </ul>
          </div>
        )}

        <h2 id="modal-title" className="modal-title">{anuncio.title}</h2>

        <div className="modal-body">
          <div className="modal-description-map">
            {/* Columna izquierda: Logo, QR, descripción */}
            <div className="modal-left">
              <div className="modal-business-info">
                <div className="business-logo">
                  <img
                    src={anuncio.logo ? anuncio.logo : "/images/logo192.png"}
                    alt="Logo"
                    className="business-logo-img"
                  />
                </div>
                <div className="business-name">
                  <p>{anuncio.businessName ? anuncio.businessName : anuncio.adType} disponibles en Buscadis:</p>
                </div>
              </div>
              <div className="modal-description" id="modal-description">
                <QRCodeCanvas className="qr-code-description" value={shareUrl} size={100} />
                <p>{anuncio.description.replace(/\d{9}/g, "")}</p>
              </div>
            </div>

            {/* Columna derecha: Mapas/Imágenes/Detalles */}
            <div className="modal-right">
              <div className="right-tabs">
                <button className={activeRightTab === "detalles" ? "active" : ""} onClick={() => setActiveRightTab("detalles")}>Detalles</button>
                <button className={activeRightTab === "mapa" ? "active" : ""} onClick={() => setActiveRightTab("mapa")}>Mapa</button>
                <button className={activeRightTab === "imagenes" ? "active" : ""} onClick={() => setActiveRightTab("imagenes")}>Imágenes</button>
              </div>

              {activeRightTab === "mapa" && (
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

              {activeRightTab === "imagenes" && (
                <div className="modal-images">
                  {anuncio.image1 ? (
                    <>
                      <img src={anuncio.image1} alt="Imagen 1" />
                      <img src={anuncio.image2} alt="Imagen 2" />
                    </>
                  ) : (
                    <p>Este anuncio no tiene imágenes.</p>
                  )}
                </div>
              )}

              {activeRightTab === "detalles" && (
                <div className="detalles-content">
                  <p><strong>Estadísticas:</strong></p>
                  <ul>
                    <li>{viewCount} personas han visto este anuncio.</li>
                    <li>{applicationsCount} personas han aplicado.</li>
                    <li>{availablePositions} posiciones disponibles.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
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
        <div className="navigation-arrow navigation-arrow-left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="navigation-arrow navigation-arrow-right" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
    </div>
  );
}

export default Modal;
