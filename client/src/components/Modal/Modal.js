import React from "react";
import "./modal.css";

function Modal({ anuncio, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{anuncio.title}</h2>
        <p>{anuncio.description}</p>
        {anuncio.image && <img src={anuncio.image} alt={anuncio.title} />}
        <p>Ubicación: {anuncio.location}</p>
        <p>Contacto: {anuncio.phone}</p>


      </div>
    </div>
  );
}

export default Modal;
