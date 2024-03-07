// AdModal.js
import React, { useState, useEffect } from "react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./adModal.css";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareSquare, faFlag } from "@fortawesome/free-solid-svg-icons";

function AdModal({ ad, onHide }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // if (ad) {
    //   console.log(ad.images); // Imprime las URLs de las imágenes
    //   console.log(Array.isArray(ad.images)); // Imprime true si ad.images es un array
    // }
    setIsOpen(!!ad);
  }, [ad]);

  if (!ad) return null;

  const { category, title, description, amount, location, createdAt } = ad;

  const formattedDate = formatDistance(new Date(createdAt), new Date(), {
    locale: es,
    addSuffix: false,
  });

  
return (
  <div className={`modal ${isOpen ? "show" : ""}`} onClick={onHide}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div className="modal-header-left">
          <p className="ad-card__date">{formattedDate}</p>{" "}
        </div>
        <div className="modal-header-center">
          <p>{category}</p>
        </div>
        <div className="modal-header-right">
          <button><FontAwesomeIcon icon={faBookmark} /></button>
          <button><FontAwesomeIcon icon={faShareSquare} /></button>
          <button><FontAwesomeIcon icon={faFlag} /></button>
        </div>
      </div>
      <h2 className="modal-title">{title}</h2>
      <div className="modal-body">
        <p>{description}</p>
        <p>{amount}</p>
        <p>{location}</p>
      </div>
      <div className="modal-footer">
        <ContactButtons phone={ad.phone} />
      </div>
    </div>
  </div>
);
}

export default AdModal;
