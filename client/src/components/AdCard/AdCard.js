import React from "react";
import "./adCard.css";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

function AdCard({ anuncio, setSelectedAd, number }) {
  // console.log('AdCard anuncio:', anuncio)

  const { category, title, description, amount, location, createdAt } = anuncio;

  const adClass = `ad-card ${category.toLowerCase()}`;

  // Formatea la fecha de publicación
  const formattedDate = formatDistance(new Date(createdAt), new Date(), {
    locale: es,
    addSuffix: false,
  });

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
