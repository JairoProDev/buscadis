import React from "react";
import { useNavigate } from "react-router-dom";
import "./adCard.css";


function AdCard({ anuncio, setSelectedAd, number }) {
  const navigate = useNavigate();
  // console.log('AdCard anuncio:', anuncio)

  const handleAdClick = () => {
    // Cambia la URL a la nueva ruta con adType, categoría y ID
    navigate(`/${anuncio.adType}/${anuncio.category}/${anuncio.id}`);
    // Establece el anuncio seleccionado
    setSelectedAd(anuncio);
  };
  
  const sizeClass = `ad-size-${anuncio.size || 'normal'}`;

  const { adType, category, title, description, amount, location, createdAt } = anuncio;

// En AdCard.js, antes de definir adClass, asegúrate de que adType esté definido
const adTypeLower = adType ? adType.toLowerCase() : 'default';
const adClass = `ad-card ${adTypeLower} ${sizeClass}`;

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
    otros: "🔍"
  };
  return (
    <div className={adClass} onClick={handleAdClick}>
      <div className="ad-card__content">
        <div className="ad-card__header">
          <p className="ad-card__number">#{number}</p>
          <p className="ad-adType">{adTypeEmojis[adType.toLowerCase()] || adType} {category}</p>
          <p className="ad-card__date">Hace {formattedDate}</p>{" "}
        </div>
        <h3 className="ad-card__title">{title}</h3>
        <p className="ad-card__description">{description}</p>
        <div className="ad-card__details">
          <p className="ad-card__price">{amount}</p>
          <p className="ad-card__location">🌎{location}</p>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
