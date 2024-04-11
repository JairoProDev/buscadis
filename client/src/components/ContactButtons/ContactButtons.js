import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, type, category }) {
  const isWhatsApp = type === "whatsapp";

  let message;
  switch (category) {
    case "Autos":
      message = "¡Hola! Vi su aviso en BuscAdis.com sobre el auto que tiene en venta y estoy interesado. ¿Podría proporcionarme más información, por favor?";
      break;
    case "Empleos":
      message = "Buen día, encontré su anuncio en BuscAdis.com y estoy muy interesado en el empleo que ofrece. ¿Podría proporcionarme más detalles al respecto?";
      break;
    case "Inmuebles":
      message = "Hola, vi su aviso en BuscAdis.com sobre la propiedad y me interesa. ¿Podría darme más información sobre la misma?";
      break;
    case "Servicios":
      message = "¡Hola! Vi su anuncio en BuscAdis.com y estoy interesado en los servicios que ofrece. ¿Podría proporcionarme más detalles al respecto?";
      break;
    default:
      message = "Buen día, vi su aviso en BuscAdis.com y me interesa, podría proporcionarme más información por favor?";
  }
const href = isWhatsApp
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
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

function ContactButtons({ phone, phone2, category }) {
  if (!phone && !phone2) return null;

  return (
    <>
      <div>
        {phone && <ContactButton phone={phone} type="call" category={category}/>}
        {phone && <ContactButton phone={phone} type="whatsapp" category={category} />}
      </div>
      <p>🌐BuscAdis.com🔗</p>
      <div>
        {phone2 && <ContactButton phone={phone2} type="call" category={category} />}
        {phone2 && <ContactButton phone={phone2} type="whatsapp" category={category} />}
      </div>
    </>
  );
}

export default ContactButtons;
