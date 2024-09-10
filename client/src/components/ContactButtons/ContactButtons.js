import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, phone2, type, adType, url }) {
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

  const href = type === "whatsapp"
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `tel:${phone}`;

  const href2 = phone2 && (type === "whatsapp"
    ? `https://wa.me/${phone2}?text=${encodeURIComponent(message)}`
    : `tel:${phone2}`);

  const icon = type === "whatsapp" ? faWhatsapp : faPhone;
  const label = type === "whatsapp" ? "WhatsApp" : "Llamar";

  return (
    <div className="contact-button-wrapper">
      <a
        href={href}
        className={`contact-button ${type === "whatsapp" ? "contact-button--whatsapp" : "contact-button--call"}`}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={icon} />
        <span className="button-label desktop-label">{label}</span> {/* Texto en desktop */}
        <span className="button-label mobile-label">1</span> {/* Texto en mobile */}
      </a>
      {phone2 && (
        <a
          href={href2}
          className={`contact-button small-icon ${type === "whatsapp" ? "contact-button--whatsapp" : "contact-button--call"}`}
          aria-label={`${label} 2`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={icon} />
          <span className="button-label desktop-label">{label} 2</span> {/* Texto en desktop */}
          <span className="button-label mobile-label">2</span> {/* Texto en mobile */}
        </a>
      )}
    </div>
  );
}

function ContactButtons({ phone, phone2, adType, url }) {
  return (
    <div className="contact-buttons-container">
      <div className="contact-button-group">
        {/* Botones de llamada */}
        <ContactButton phone={phone} phone2={phone2} type="call" adType={adType} url={url} />

        {/* Botón de compartir */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Mira esta oportunidad: ${url}`)}`}
          className="contact-button contact-button--share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faShareAlt} />
          <span className="button-label desktop-label">Compartir</span>
        </a>

        {/* Botones de WhatsApp */}
        <ContactButton phone={phone} phone2={phone2} type="whatsapp" adType={adType} url={url} />
      </div>
    </div>
  );
}

export default ContactButtons;
