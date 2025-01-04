import React from "react";
import { useNavigate } from "react-router-dom";
import "./adCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faMapMarkerAlt, faCalendarAlt, faStore, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function AdCard({ adiso, setSelectedAd, viewMode }) {
  const navigate = useNavigate();

  const handleAdClick = () => {
    navigate(
      `/${adiso.adType}/${adiso.category}/${adiso.subCategory}/${adiso._id}`
    );
    setSelectedAd(adiso);
  };

  const {
    adType,
    category,
    subCategory,
    title,
    amount,
    location,
    createdAt,
    images,
    businessName,
    businessLogo,
    businessType,
  } = adiso;
  const adTypeLower = adType ? adType.toLowerCase() : "default";
  const adClass = `ad-card ${adTypeLower} ${viewMode}`;

  const formattedDate = formatShortDistance(new Date(createdAt));

  function formatShortDistance(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} años`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} meses`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} días`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval}h`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} min`;
    }
    return `${Math.floor(seconds)} seg`;
  }

  return (
    <div className={adClass} onClick={handleAdClick}>
      {images && images.length > 0 && (
        <div className="ad-card__image-container">
          <img src={images[0]} alt={title} className="ad-card__image" />
        </div>
      )}
      <div className="ad-card__content">
        <div className="ad-card__business">
          {businessLogo ? (
            <img src={businessLogo} alt={businessName} className="ad-card__business-logo" />
          ) : (
            <div className="ad-card__business-logo-placeholder"></div>
          )}
          <div className="ad-card__business-info">
            <p className="ad-card__business-name">
              <FontAwesomeIcon icon={faStore} /> {businessName}
            </p>
            <p className="ad-card__business-type">{businessType}</p>
          </div>
        </div>
        <div className="ad-card__header">
          <div className="ad-card__type">{category} / {subCategory}</div>
          <div className="ad-card__date">
            <FontAwesomeIcon icon={faCalendarAlt} /> {formattedDate}
          </div>
        </div>
        <h3 className="ad-card__title">{title}</h3>
        <div className="ad-card__details">
          <p className="ad-card__price">{amount}</p>
          {location && (
            <p className="ad-card__location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
            </p>
          )}
        </div>
        
        <button className="ad-card__save-button">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
        <button className="ad-card__options-button">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
    </div>
  );
}

export default AdCard;