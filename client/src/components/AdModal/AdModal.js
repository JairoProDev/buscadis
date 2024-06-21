// AdModal.js
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAdNavigation from "../../hooks/useAdNavigation";
import "./adModal.css";

import ContactButtons from "../ContactButtons/ContactButtons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareSquare,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function AdModal({ anuncios }) {
  const { adType, id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef();

  const adIndex = anuncios.findIndex((anuncio) => anuncio._id === id);
  const [prevAdIndex, setPrevAdIndex] = useState(adIndex);

  useEffect(() => {
    if (adIndex !== prevAdIndex) {
      setPrevAdIndex(adIndex);
    }
  }, [adIndex, prevAdIndex]);

  const isForwardNavigation = adIndex > prevAdIndex;

  const ad = anuncios[adIndex];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!ad);
  }, [ad]);

  const handleClose = useCallback(() => {
    // Navegar a la URL anterior correspondiente a la adType y categoría
  //   if (adType && category) {
  //     navigate(`/${adType}/${category}`);
  //   } else if (adType) {
  //     navigate(`/${adType}`);
  //   } else {
  //     navigate('/');
  //   }
  // }, [adType, category, navigate]);
  navigate('/');

  }, [navigate]);
  const handleClickOutside = useCallback((event) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useAdNavigation(anuncios);

  if (!ad) return null;

  const { title, description, amount, location, email, createdAt } = ad;

  const date = new Date(createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
    alert("Reported!");
  };

  const adUrl = window.location.href;

  const modalClass = `modal-content ${adType.toLowerCase()} ${isForwardNavigation ? 'transition-right' : 'transition-left'}`;

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      onClick={handleClickOutside}
      ref={modalRef}
    >
      <div
        className={modalClass}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <p className="ad-card__date">{formattedDate.split(" a las ")[0]}</p>
            <p className="ad-card__time">
              a las {formattedDate.split(" a las ")[1]}
            </p>
          </div>
          <div className="modal-header-center">
            <p>{adType}</p>
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
          <ContactButtons phone={ad.phone} phone2={ad.phone2} adType={ad.adType} url={adUrl} />
        </div>
      </div>
    </div>
  );
}

export default AdModal;
