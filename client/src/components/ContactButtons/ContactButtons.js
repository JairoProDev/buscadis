import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, type, adType, url }) {
  const isWhatsApp = type === "whatsapp";
  const isEmail = type === "email";

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
    : isEmail
    ? `mailto:${phone}`
    : `tel:${phone}`;

  const icon = isWhatsApp
    ? faWhatsapp
    : isEmail
    ? faEnvelope
    : faPhone;
    
  const label = isWhatsApp
    ? "Contactar por WhatsApp"
    : isEmail
    ? "Enviar Email"
    : "Llamar";
    
  const buttonClass = isWhatsApp
    ? "contact-button--whatsapp"
    : isEmail
    ? "contact-button--email"
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

function ContactButtons({ phone, phone2, email, adType, url }) {
  if (!phone && !phone2 && !email) return null;

  return (
    <div className="contact-buttons-container">
      {phone && (
        <div className="contact-button-row">
          <h4>Contacto 1:</h4>
          <div className="contact-button-group">
            <ContactButton
              phone={phone}
              type="whatsapp"
              adType={adType}
              url={url}
            />
            <ContactButton
              phone={phone}
              type="call"
              adType={adType}
              url={url}
            />
          </div>
        </div>
      )}
      {phone2 && (
        <div className="contact-button-row">
          <h4>Contacto 2:</h4>
          <div className="contact-button-group">
            <ContactButton
              phone={phone2}
              type="whatsapp"
              adType={adType}
              url={url}
            />
            <ContactButton
              phone={phone2}
              type="call"
              adType={adType}
              url={url}
            />
          </div>
        </div>
      )}
      {email && (
        <div className="contact-button-group">
          <h4>Contacto por Email:</h4>
          <ContactButton
            phone={email}
            type="email"
            adType={adType}
            url={url}
          />
        </div>
      )}
    </div>
  );
}

export default ContactButtons;
