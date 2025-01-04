import React from "react";
import { useNavigate } from "react-router-dom";
import "./adCard.css";

function AdCard({ adiso, setSelectedAd, number }) {
  const navigate = useNavigate();

  const handleAdClick = () => {
    navigate(
      `/${adiso.adType}/${adiso.category}/${adiso.subCategory}/${adiso._id}`
    );
    setSelectedAd(adiso);
  };

  const sizeClass = `ad-size-${adiso.size || "normal"}`;
  const {
    adType,
    category,
    title,
    amount,
    location,
    createdAt,
    image,
    _id,
  } = adiso;
  const adTypeLower = adType ? adType.toLowerCase() : "default";
  const adClass = `ad-card ${adTypeLower} ${sizeClass}`;

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

  const adTypeEmojis = {
    empleos: "💼",
    inmuebles: "🏠",
    vehiculos: "🚗",
    servicios: "🔧",
    tecnologia: "📱",
    hogar: "🏡",
    moda: "👗",
    deportes: "⚽",
    mascotas: "🐶",
    otros: "🔍",
  };

  return (
    <div className={`${adClass}`} onClick={handleAdClick}>
      <div className="ad-card__image-container">
        {image && <img src={image} alt={title} className="ad-card__image" />}
      </div>
      <div className="ad-card__content">
        <div className="ad-card__header">
          <div className="ad-card__type">
            {adTypeEmojis[adTypeLower] || adType} {category}
          </div>
          <div className="ad-card__date">⏰{formattedDate}</div>
        </div>
        <h3 className="ad-card__title">{title}</h3>
        <div className="ad-card__details">
          <p className="ad-card__price">{amount}</p>
          {location && <p className="ad-card__location">🌎{location}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdCard;