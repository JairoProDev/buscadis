import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import "./contactButtons.css";

function ContactButton({ phone, type, adType, url }) {
  const isWhatsApp = type === "whatsapp";
  const isShare = type === "share";

  let message;
  switch (adType) {
    case "Vehicles":
      message = `¡Hola! Vi su aviso sobre el Vehículo que tiene en venta aquí: ${url} y me interesa. ¿Podría proporcionarme más información, por favor?`;
      break;
    case "Empleos":
      message = `Buen día, encontré su anuncio sobre el empleo que ofrece aquí: ${url} y estoy muy interesado. ¿Podría proporcionarme más detalles al respecto?`;
      break;
    case "Inmuebles":
      message = `Hola, vi su aviso sobre la propiedad aquí: ${url} y me interesa. ¿Podría brindarme más información por favor?`;
      break;
    case "Servicios":
      message = `¡Hola! Vi su anuncio sobre los servicios que ofrece aquí: ${url} y los necesito. ¿Podría proporcionarme más detalles al respecto?`;
      break;
    default:
      message = `Buen día, vi su aviso aquí: ${url} y me interesa, podría proporcionarme más información por favor?`;
  }

  const href = isWhatsApp
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : isShare
    ? `https://wa.me/?text=${encodeURIComponent(`Mira este anuncio: ${url}`)}`
    : `tel:${phone}`;

  const icon = isWhatsApp
    ? faWhatsapp
    : isShare
    ? faShareAlt
    : faPhone;

  const label = isWhatsApp
    ? "WhatsApp"
    : isShare
    ? "Compartir"
    : "Llamar";

  const buttonClass = isWhatsApp
    ? "contact-button--whatsapp"
    : isShare
    ? "contact-button--share"
    : "contact-button--call";

  return (
    <a
      href={href}
      className={`contact-button ${buttonClass}`}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} />
      {label}
    </a>
  );
}

function ContactButtons({ phone, phone2, adType, url }) {
  return (
    <div className="contact-buttons-container">
      <div className="contact-button-group">
        {/* Botón de llamada */}
        <ContactButton phone={phone} type="call" adType={adType} url={url} />
        {phone2 && (
          <ContactButton phone={phone2} type="call" adType={adType} url={url} />
        )}

        {/* Botón de compartir */}
        <ContactButton type="share" adType={adType} url={url} />

        {/* Botón de WhatsApp */}
        <ContactButton phone={phone} type="whatsapp" adType={adType} url={url} />
      </div>
    </div>
  );
}

export default ContactButtons;
