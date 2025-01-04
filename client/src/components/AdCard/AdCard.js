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
    description,
    amount,
    location,
    createdAt,
    image,
    _id,
  } = adiso;
  const adTypeLower = adType ? adType.toLowerCase() : "default";
  const adClass = `ad-card ${adTypeLower} ${sizeClass}`;

  // Calcular si el adiso tiene más de una semana
  const isOldAd =
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24) > 7;
  const oldAdClass = isOldAd ? "ad-card--taken" : "";

  // Lógica para marcar 1 de cada 10 adisos como caducado, solo si el adiso tiene más de una semana
  const hash = _id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isExpired = isOldAd && hash % 10 === 0; // 1 de cada 10 se marcará como caducado, pero solo si es viejo
  const expiredClass = isExpired ? "ad-card--expired" : "";

  const adStatusMessages = {
    empleos: "¡Contratación Exitosa!",
    inmuebles: "¡Propiedad Tomada!",
    vehiculos: "¡Vehículo Vendido!",
    servicios: "¡Servicio Contratado!",
    productos: "¡Producto Vendido!",
    otros: "¡Oportunidad Tomada!",
    default: "¡Anuncio Tomado!",
  };

  // Obtener el mensaje correspondiente al tipo de adiso
  const adStatusMessage =
    adStatusMessages[adTypeLower] || adStatusMessages.default;

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
    <div
      className={`${adClass} ${oldAdClass} ${expiredClass}`}
      onClick={isOldAd || isExpired ? null : handleAdClick}
    >
      {isOldAd && (
        <div className="ad-card__overlay">
          <span className="ad-card__overlay-text">{adStatusMessage}</span>
        </div>
      )}
      {isExpired && (
        <div className="ad-card__expired-overlay">
          <span className="ad-card__expired-text">¡Anuncio Caducado!</span>
        </div>
      )}
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