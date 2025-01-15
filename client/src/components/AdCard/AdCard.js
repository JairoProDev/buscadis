import React from "react";
import { useNavigate } from "react-router-dom";
import "./adCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faMapMarkerAlt, faCalendarAlt, faStore, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function AdCard({ adiso, setSelectedAd, viewMode }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleAdClick = () => {
    navigate(
      `/${adiso.adType}/${adiso.category}/${adiso.subCategory}/${adiso._id}`
    );
    setSelectedAd(adiso);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
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
  const adClass = `ad-card ${adTypeLower} ${viewMode} ${images?.length ? 'has-image' : ''}`;

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
      {images?.length > 0 && (
        <div className="ad-card__image-container">
          <img src={images[0]} alt={title} className="ad-card__image" />
        </div>
      )}
      
      <div className="ad-card__content">
        <div className="ad-card__business">
          {businessLogo && (
            <img src={businessLogo} alt={businessName} className="ad-card__business-logo" />
          )}
          <div className="ad-card__business-info">
            <p className="ad-card__business-name">{businessName}</p>
            <p className="ad-card__business-type">{businessType} <span className="ad-card__category">{subCategory}</span></p>
          </div>
        </div>
  
        <h3 className="ad-card__title">{title}</h3>
        
        <p className="ad-card__price">{amount}</p>
  
        <div className="ad-card__metadata">
          {location && (
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
            </span>
          )}
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} /> {formattedDate}
          </span>
        </div>
  
        <div className="ad-card__actions">
          <button className="ad-card__action-button">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <button className="ad-card__action-button">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdCard;