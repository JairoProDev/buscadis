import React from 'react';
import './adsColumn.css';

function AdsColumn({ anuncios = [], selectedAdType }) {
  // we Ensure `anuncios` is an array before filtering
  const filteredAds = Array.isArray(anuncios)
    ? anuncios.filter(anuncio => anuncio.adType === selectedAdType)
    : [];

  return (
    <div className="columna-anuncios">
      {filteredAds.length > 0 ? (
        filteredAds.slice(0, 100).map((anuncio) => (
          <Anuncio key={anuncio._id} anuncio={anuncio} />
        ))
      ) : (
        <div>Selecciona, ¿qué tipo de aviso estás buscando?</div>
      )}
    </div>
  );
}

function Anuncio({ anuncio }) {
  const { title, description, phone } = anuncio;
  const message = encodeURIComponent(
    `Hola, estoy interesado en su aviso de https://Buscadis.com: ${title}`
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="anuncio separador">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="anuncio-desc">{description}</div>
      </a>
    </div>
  );
}

export default AdsColumn;
