import React from 'react';
import './adsColumn.css';

function AdsColumn({ anuncios }) {
  return (
    <div className="columna-anuncios">
      {anuncios &&
        anuncios.slice(0, 100).map((anuncio) => (
          <Anuncio key={anuncio.id} anuncio={anuncio} />
        ))}
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
        <div className="anuncio-desc">{description}</div>{" "}
      </a>
    </div>
  );
}

export default AdsColumn;