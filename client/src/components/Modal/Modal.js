import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ModalOptions from "./ModalOptions";
import { QRCodeCanvas } from "qrcode.react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./modal.css";

function Modal({ adiso, onClose, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState("detalles");
  const [viewCount, setViewCount] = useState(adiso.viewCount || 0);
  const [contactsCount, setContactsCount] = useState(adiso.contactsCount || 0);
  const [remainingTime, setRemainingTime] = useState("");
  const [viewedAnuncios, setViewedAnuncios] = useState({});

  // Nuevo estado para la imagen ampliada
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsOpen(true);

    if (!viewedAnuncios[adiso.id]) {
      setViewedAnuncios((prev) => ({ ...prev, [adiso.id]: true }));
      setViewCount((prevCount) => prevCount + 1);
      if (adiso.id) {
        fetch(`/api/adisos/${adiso.id}/increment-view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              console.error(
                "Error al incrementar vistas:",
                response.statusText
              );
            }
          })
          .catch((error) =>
            console.error("Error incrementando vistas:", error)
          );
      }
    }

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);
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
      clearInterval(intervalId);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [adiso, onPrev, onNext]);

  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const createdAt = new Date(adiso.createdAt);
    const timeElapsed = currentTime - createdAt;
    const totalDuration = 72 * 60 * 60;
    const remainingTimeSec = totalDuration - Math.floor(timeElapsed / 1000);

    if (remainingTimeSec <= 0) {
      setRemainingTime("Aviso Expirado");
    } else {
      const remainingHours = Math.floor(remainingTimeSec / 3600);
      const remainingMinutes = Math.floor((remainingTimeSec % 3600) / 60);
      const remainingSeconds = remainingTimeSec % 60;
      setRemainingTime(
        `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`
      );
    }
  };

  // Nueva función para mostrar la imagen ampliada
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Nueva función para cerrar el modal de imagen ampliada
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleContactClick = (method) => {
    setContactsCount((prevCount) => prevCount + 1);

    // Enviar el click de contacto al backend
    fetch(`/api/adisos/${adiso.id}/register-contact`, {
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

  const formattedDate = new Date(adiso.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(adiso.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (
      userAgent.includes("wv") ||
      userAgent.includes("WebView") ||
      (userAgent.includes("Android") &&
        userAgent.includes("Chrome") &&
        userAgent.includes("Version"))
    );
  };

  useEffect(() => {
    if (isWebView() && adiso.location) {
      const iframeCheckTimeout = setTimeout(() => {
        setIframeBlocked(true);
      }, 3000);
      return () => clearTimeout(iframeCheckTimeout);
    }
  }, [adiso.location]);

  const shareUrl = window.location.href;

  const navigateToPrevImage = () => {
    const currentIndex = adiso.images.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + adiso.images.length) % adiso.images.length;
    setSelectedImage(adiso.images[prevIndex]);
  };

  const navigateToNextImage = () => {
    const currentIndex = adiso.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % adiso.images.length;
    setSelectedImage(adiso.images[nextIndex]);
  };

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        id="modal-content"
        className={`modal-content ${adiso.adType.toLowerCase()} show`}
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
              {adiso.adType} / {adiso.category} / {adiso.subCategory}
            </div>
          </div>
          <div className="modal-header-right">
            <div className="modal-date-time">
              <p>{new Date(adiso.createdAt).toLocaleDateString()}</p>
              <p>{new Date(adiso.createdAt).toLocaleTimeString()}</p>
            </div>
            <ModalOptions />
          </div>
        </div>

        <div className="modal-body">
          <h2 id="modal-title" className="modal-title">
            {adiso.title}
          </h2>
          <div className="modal-description-map">
            <div className="modal-left">
              {/* <div className="modal-business-info">
                <div className="business-logo">
                  <img src={adiso.logo ? adiso.logo : "/images/logo192.png"} alt="Logo" className="business-logo-img" />
                </div>
                <div className="business-name">
                  <p>{adiso.businessName ? adiso.businessName : adiso.adType} disponibles en Buscadis:</p>
                </div>
              </div> */}
              <div className="modal-description" id="modal-description">
                <QRCodeCanvas
                  className="qr-code-description"
                  value={window.location.href}
                  size={100}
                />
                <p>{adiso.description.replace(/\d{9}/g, "")}</p>
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
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        adiso.location
                      )}&output=embed`}
                      width="100%"
                      height="250"
                      frameBorder="0"
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                      title={`Mapa de la ubicación: ${adiso.location}`}
                    ></iframe>
                  ) : (
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        adiso.location
                      )}`}
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

              {activeRightTab === "detalles" && (
                <div className="detalles-content">
                  <p>
                    <strong>Estadísticas:</strong>
                  </p>
                  <ul>
                    <li>
                      ⌛ Tiempo restante: <span>{remainingTime}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <ContactButtons
            phone={adiso.phone}
            phone2={adiso.phone2}
            adType={adiso.adType}
            url={window.location.href}
            onContactClick={handleContactClick}
          />
        </div>
      </div>

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

      {/* Modal para la imagen ampliada */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="ampliada-img"
            />
            <button className="close-button" onClick={closeImageModal}>
              X
            </button>
            {/* Agrega los botones de navegación para cambiar de imagen */}
            <button
              className="prev-image"
              onClick={(e) => {
                e.stopPropagation();
                navigateToPrevImage();
              }}
            >
              ←
            </button>
            <button
              className="next-image"
              onClick={(e) => {
                e.stopPropagation();
                navigateToNextImage();
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
