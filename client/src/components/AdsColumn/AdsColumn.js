import React from "react";
import "./adsColumn.css";

function AdsColumn({ adisos = [], selectedAdType }) {
  // Esto se asegura de que `adisos` es un array antes de filtrar
  const filteredAds = Array.isArray(adisos)
    ? adisos.filter((adiso) => adiso && adiso.adType === selectedAdType)
    : [];

  return (
    <div className="columna-adisos">
      {filteredAds.length > 0 ? (
        filteredAds
          .slice(0, 100)
          .map((adiso) => <Anuncio key={adiso._id} adiso={adiso} />)
      ) : (
        <div>Selecciona, ¿qué tipo de adiso estás buscando?</div>
      )}
    </div>
  );
}

function Anuncio({ adiso }) {
  // Nos aseguramos de que `adiso` tiene las propiedades necesarias
  const { title, description, phone } = adiso || {};
  if (!title || !description || !phone) {
    return null; // No renderizar si faltan propiedades
  }

  const message = encodeURIComponent(
    `Hola, estoy interesado en su adiso de https://Buscadis.com: ${title}`
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="adiso separador">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="adiso-desc">{description}</div>
      </a>
    </div>
  );
}

export default AdsColumn;
