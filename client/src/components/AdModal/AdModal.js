// AdModal.js
import React, { useState, useEffect } from "react";
import ContactButtons from "../ContactButtons/ContactButtons";
import "./adModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareSquare,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function AdModal({ ad, onHide }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!ad);
  }, [ad]);

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

  return (
    <div className={`modal ${isOpen ? "show" : ""}`} onClick={onHide}>
      <div
        className={`modal-content ${category}`}
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
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <button>
              <FontAwesomeIcon icon={faShareSquare} />
            </button>
            <button>
              <FontAwesomeIcon icon={faFlag} />
            </button>
          </div>
        </div>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          <p>{description}</p>
          {ad.images &&
            ad.images.map((image, index) => (
              <img key={index} src={image} alt={`Imagen ${index + 1}`} />
            ))}
          <p>{amount}</p>
          <p>{email}</p>
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
