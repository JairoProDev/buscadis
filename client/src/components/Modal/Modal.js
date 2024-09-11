import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalOptions from "./ModalOptions";
import { QRCodeCanvas } from "qrcode.react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./modal.css";

function Modal({ anuncio, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState("detalles");
  const [viewCount, setViewCount] = useState(anuncio.viewCount || 0);
  const [contactsCount, setContactsCount] = useState(anuncio.contactsCount || 0);
  const [remainingTime, setRemainingTime] = useState("");
  const [viewedAnuncios, setViewedAnuncios] = useState({}); // Estado para llevar el registro de anuncios ya vistos.
  // let touchStartX = 0;

  useEffect(() => {
    setIsOpen(true);

    // Si el anuncio no ha sido visto, incrementa la vista y marca como visto.
    if (!viewedAnuncios[anuncio.id]) {
      setViewedAnuncios((prev) => ({ ...prev, [anuncio.id]: true }));
      setViewCount((prevCount) => prevCount + 1);

      // Enviar las vistas al backend
      if (anuncio.id) {
        fetch(`/api/anuncios/${anuncio.id}/increment-view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            console.error("Error al incrementar vistas:", response.statusText);
          }
        }).catch((error) => console.error("Error incrementando vistas:", error));
      }
    }

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000); // Actualiza cada segundo

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
      clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anuncio, onPrev, onNext]);

  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const createdAt = new Date(anuncio.createdAt);
    const timeElapsed = currentTime - createdAt;
    const totalDuration = 72 * 60 * 60; // 72 horas en segundos
    const remainingTimeSec = totalDuration - Math.floor(timeElapsed / 1000);

    if (remainingTimeSec <= 0) {
      setRemainingTime("Aviso Expirado");
    } else {
      const remainingHours = Math.floor(remainingTimeSec / 3600);
      const remainingMinutes = Math.floor((remainingTimeSec % 3600) / 60);
      const remainingSeconds = remainingTimeSec % 60;
      setRemainingTime(`${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`);
    }
  };

  // const handleTouchStart = (e) => {
  //   touchStartX = e.touches[0].clientX;
  // };

  // const handleTouchMove = (e) => {
  //   const touchEndX = e.touches[0].clientX;
  //   if (touchStartX - touchEndX > 200) {
  //     onNext();
  //   } else if (touchEndX - touchStartX > 50) {
  //     onPrev();
  //   }
  // };

  const handleContactClick = (method) => {
    setContactsCount((prevCount) => prevCount + 1);

    // Enviar el click de contacto al backend
    fetch(`/api/anuncios/${anuncio.id}/register-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ method }),
    })
    .then((response) => {
      if (!response.ok) {
        console.error("Error al registrar contacto:", response.statusText);
      }
    })
    .catch((error) => console.error("Error registrando contacto:", error));
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
    return (
      userAgent.includes("wv") ||
      userAgent.includes("WebView") ||
      (userAgent.includes("Android") && userAgent.includes("Chrome") && userAgent.includes("Version"))
    );
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

  return (
    <div
      className={`modal-overlay ${isOpen ? "show" : ""}`}
      onClick={onClose}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
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
          <div className="modal-header-left">
            <a href="https://publicadis.com" className="modal-header-link">
              BuscAdis.com
            </a>
            <div className="modal-route">
              {anuncio.adType} / {anuncio.category} / {anuncio.subCategory}
            </div>
          </div>
          <div className="modal-header-right">
            <div className="modal-date-time">
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </div>
            <ModalOptions />
          </div>
        </div>

        <div className="modal-body">
          <h2 id="modal-title" className="modal-title">
            {anuncio.title}
          </h2>
          <div className="modal-description-map">
            <div className="modal-left">
              {/* <div className="modal-business-info">
                <div className="business-logo">
                  <img src={anuncio.logo ? anuncio.logo : "/images/logo192.png"} alt="Logo" className="business-logo-img" />
                </div>
                <div className="business-name">
                  <p>{anuncio.businessName ? anuncio.businessName : anuncio.adType} disponibles en Buscadis:</p>
                </div>
              </div> */}
              <div className="modal-description" id="modal-description">
                <QRCodeCanvas className="qr-code-description" value={window.location.href} size={100} />
                <p>{anuncio.description.replace(/\d{9}/g, "")}</p>
              </div>
            </div>

            <div className="modal-right">
              <div className="right-tabs">
                <button
                  className={activeRightTab === "detalles" ? "active" : ""}
                  onClick={() => setActiveRightTab("detalles")}
                >
                  Detalles
                </button>
                <button
                  className={activeRightTab === "mapa" ? "active" : ""}
                  onClick={() => setActiveRightTab("mapa")}
                >
                  Ubicación
                </button>
                <button
                  className={activeRightTab === "imagenes" ? "active" : ""}
                  onClick={() => setActiveRightTab("imagenes")}
                >
                  Imágenes
                </button>
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
                      {anuncio.images && anuncio.images.length > 0 ? (
                          anuncio.images.map((imageUrl, index) => (
                              <img key={index} src={imageUrl} alt={`Imagen ${index + 1}`} />
                          ))
                      ) : (
                          <p>Este anuncio no tiene imágenes.</p>
                      )}
                  </div>
              )}


              {activeRightTab === "detalles" && (
                <div className="detalles-content">
                  <p><strong>Estadísticas:</strong></p>
                  <ul>
                    <li>⌛ Tiempo restante: <span>{remainingTime}</span></li>
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
            onContactClick={handleContactClick}
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