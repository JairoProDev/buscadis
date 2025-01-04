import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTimes, faMapMarkerAlt, faCalendarAlt, faBuilding, faPhone, faEnvelope, faStar, faEye, faShareAlt, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./adDetailView.css";

function AdDetailView({ adiso, onClose, onNext, onPrev }) {
  const {
    title,
    description,
    amount,
    location,
    createdAt,
    images,
    businessName,
    businessLogo,
    phone,
    phone2,
    email,
    views,
    contactsCount,
    adType,
    category,
    subCategory,
  } = adiso;

  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ad-detail-view">
      <div className="ad-detail-header">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className="nav-button prev-button" onClick={onPrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="nav-button next-button" onClick={onNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="ad-detail-content">
        <div className="ad-detail-images">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img key={index} src={image} alt={`Imagen ${index + 1}`} className="ad-detail-image" />
            ))
          ) : (
            <div className="ad-detail-image-placeholder">Sin imagen</div>
          )}
        </div>
        <div className="ad-detail-info">
          <h2 className="ad-detail-title">{title}</h2>
          <p className="ad-detail-description">{description}</p>
          <p className="ad-detail-price">{amount}</p>
          <p className="ad-detail-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
          </p>
          <p className="ad-detail-date">
            <FontAwesomeIcon icon={faCalendarAlt} /> {formattedDate}
          </p>
          <div className="ad-detail-business">
            {businessLogo ? (
              <img src={businessLogo} alt={businessName} className="ad-detail-business-logo" />
            ) : (
              <div className="ad-detail-business-logo-placeholder">Logo</div>
            )}
            <div className="ad-detail-business-info">
              <p className="ad-detail-business-name">
                <FontAwesomeIcon icon={faBuilding} /> {businessName}
              </p>
              <p className="ad-detail-business-type">{adType}</p>
            </div>
          </div>
          <div className="ad-detail-contact">
            {phone && (
              <p>
                <FontAwesomeIcon icon={faPhone} /> {phone}
              </p>
            )}
            {phone2 && (
              <p>
                <FontAwesomeIcon icon={faPhone} /> {phone2}
              </p>
            )}
            {email && (
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {email}
              </p>
            )}
          </div>
          <div className="ad-detail-metrics">
            <p>
              <FontAwesomeIcon icon={faEye} /> {views} vistas
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} /> {contactsCount} contactos
            </p>
          </div>
          <div className="ad-detail-actions">
            <button className="ad-detail-action-button">
              <FontAwesomeIcon icon={faBookmark} /> Guardar
            </button>
            <button className="ad-detail-action-button">
              <FontAwesomeIcon icon={faShareAlt} /> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetailView;