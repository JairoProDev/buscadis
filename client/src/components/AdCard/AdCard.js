import React from "react";
import { useNavigate } from "react-router-dom";
import "./adCard.css";

function AdCard({ anuncio, setSelectedAd, number }) {
  const navigate = useNavigate();

  const handleAdClick = () => {
    navigate(
      `/${anuncio.adType}/${anuncio.category}/${anuncio.subCategory}/${anuncio._id}`
    );
    setSelectedAd(anuncio);
  };

  const sizeClass = `ad-size-${anuncio.size || "normal"}`;
  const { adType, category, title, description, amount, location, createdAt, image } =
    anuncio;
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
    <div className={adClass} onClick={handleAdClick}>
      <div className="ad-card__content">
        <div className="ad-card__header">
          <div className="ad-card__type">
            {adTypeEmojis[adTypeLower] || adType} {category}
          </div>
          <div className="ad-card__date">⏰{formattedDate}</div>
        </div>
        {image && <img src={image} alt={title} className="ad-card__image" />}
        <h3 className="ad-card__title">{title}</h3>
        <p className="ad-card__description">{description}</p>
        <div className="ad-card__details">
          <p className="ad-card__price">{amount}</p>
          {location && <p className="ad-card__location">🌎{location}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdCard;
