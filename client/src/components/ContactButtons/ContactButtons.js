// ContactButtons.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButtons({ phone, phone2 }) {
  if (!phone) return null;

  return (
    <>
      <a
        href={`tel:${phone}`}
        className="ad-card__button ad-card__button--contact"
        aria-label="llamar"
      >
        <FontAwesomeIcon icon={faPhone} />
      </a>
      <p>🌐BuscAdis.com🔗</p>
      <a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(
          "Hola, vi su anuncio en PublicAdis.com y me interesa, podría proporcionarme más información por favor?"
        )}`}
        className="ad-card__button ad-card__button--contact"
        aria-label="Contactar por WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </>
  );
}

export default ContactButtons;
