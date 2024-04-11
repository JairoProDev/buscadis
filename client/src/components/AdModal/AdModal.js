// AdModal.js
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ContactButtons from "../ContactButtons/ContactButtons";
import "./adModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareSquare,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function AdModal({ anuncios }) {
  // Asegúrate de pasar 'anuncios' como prop
  const { id } = useParams();
  const navigate = useNavigate(); // Obtén la función navigate
  const modalRef = useRef();

  const ad = anuncios ? anuncios.find((anuncio) => anuncio._id === id) : null;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!ad);
  }, [ad]);

  const handleClose = useCallback(() => {
    navigate("/"); // Navega a la página principal
  }, [navigate]); // Añade las dependencias necesarias aquí
  

  const handleClickOutside = useCallback((event) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  }, [handleClose]); // Añade las dependencias necesarias aquí
  

  useEffect(() => {
    // Agrega el manejador de eventos al documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpia el manejador de eventos cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // Dependencias vacías para que se ejecute solo una vez

  if (!ad) return null;

  const { category, title, description, amount, location, email, createdAt } =
    ad;

  const date = new Date(createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript comienzan desde 0
  const year = date.getFullYear().toString().slice(2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} a las ${hours}:${minutes}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported on this browser, do it manually.");
    }
  };

  const handleReport = () => {
    // Aquí es donde manejas el reporte. Por ejemplo, podrías mostrar un formulario de reporte.
    alert("Reported!");
  };
  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      onClick={handleClickOutside}
      ref={modalRef}
    >
      <div
        className={`modal-content ${category.toLowerCase()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <p className="ad-card__date">{formattedDate.split(" a las ")[0]}</p>
            <p className="ad-card__time">
              a las {formattedDate.split(" a las ")[1]}
            </p>{" "}
          </div>
          <div className="modal-header-center">
            <p>{category}</p>
          </div>
          <div className="modal-header-right">
            <button>
              <FontAwesomeIcon icon={faBookmark} color="green" />
            </button>
            <button onClick={handleShare}>
              <FontAwesomeIcon icon={faShareSquare} color="yellow" />
            </button>
            <button onClick={handleReport}>
              <FontAwesomeIcon icon={faFlag} color="red" />
            </button>
            {/* <button onClick={handleClose}>X</button> */}
          </div>
        </div>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          <p className="modal-description">{description}</p>
          {ad.images &&
            ad.images.map((image, index) => (
              <img key={index} src={image} alt={`Imagen ${index + 1}`} />
            ))}
          <p>{amount}</p>
          <p>{email}</p>
          <p>{location}</p>
        </div>
        <div className="modal-footer">
          <ContactButtons phone={ad.phone} phone2={ad.phone2} category={ad.category}/>
        </div>
      </div>
    </div>
  );
}

export default AdModal;
