import React from "react";
import "./adCard.css";

function AdCard({ anuncio, setSelectedAd, number }) {
  // console.log('AdCard anuncio:', anuncio)

  const sizeClass = `ad-size-${anuncio.size || 'normal'}`;

  const { category, subcategory, title, description, amount, location, createdAt } = anuncio;

  const adClass = `ad-card ${category.toLowerCase()} ${sizeClass}`;

  // Formatea la fecha de publicación
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
      return `${interval} d`;
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
    <div className={adClass} onClick={() => setSelectedAd(anuncio)}>
      <div className="ad-card__content">
        <div className="ad-card__header">
          <p className="ad-card__number">#{number}</p>
          <p className="ad-card__category">{category}</p>
          <p className="ad-card__date">{formattedDate}</p>{" "}
        </div>
        <h3 className="ad-card__title">{title}</h3>
        <p className="ad-card__description">{description}</p>
        <div className="ad-card__details">
          <p className="ad-card__price">{amount}</p>
          <p className="ad-card__location">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
