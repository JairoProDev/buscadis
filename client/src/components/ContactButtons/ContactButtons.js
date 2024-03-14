import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, type }) {
  const isWhatsApp = type === "whatsapp";
  const href = isWhatsApp
    ? `https://wa.me/${phone}?text=${encodeURIComponent(
        "Hola, vi su anuncio en BuscAdis.com y me interesa, podría proporcionarme más información por favor?"
      )}`
    : `tel:${phone}`;
  const icon = isWhatsApp ? faWhatsapp : faPhone;
  const label = isWhatsApp ? "Contactar por WhatsApp" : "Llamar";

  return (
    <a
      href={href}
      className="ad-card__button ad-card__button--contact"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

function ContactButtons({ phone, phone2 }) {
  if (!phone && !phone2) return null;

  return (
    <>
      <div>
        {phone && <ContactButton phone={phone} type="call" />}
        {phone && <ContactButton phone={phone} type="whatsapp" />}
      </div>
      <p>🌐BuscAdis.com🔗</p>
      <div>
        {phone2 && <ContactButton phone={phone2} type="call" />}
        {phone2 && <ContactButton phone={phone2} type="whatsapp" />}
      </div>
    </>
  );
}

export default ContactButtons;
