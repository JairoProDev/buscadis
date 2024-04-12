import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, type, category, url }) {
  const isWhatsApp = type === "whatsapp";

let message;
switch (category) {
  case "Autos":
    message = `¡Hola! Vi su aviso sobre el auto que tiene en venta aquí: ${url} y me interesa. ¿Podría proporcionarme más información, por favor?`;
    break;
  case "Empleos":
    message = `Buen día, encontré su anuncio sobre el empleo que ofrece aquí: ${url} y estoy muy interesado. ¿Podría proporcionarme más detalles al respecto?`;
    break;
  case "Inmuebles":
    message = `Hola, vi su aviso sobre la propiedad aquí: ${url} y me interesa. ¿Podría brindarme más información sobre la misma?`;
    break;
  case "Servicios":
    message = `¡Hola! Vi su anuncio sobre los servicios que ofrece aquí: ${url} y los necesito. ¿Podría proporcionarme más detalles al respecto?`;
    break;
  default:
    message = `Buen día, vi su aviso aquí: ${url} y me interesa, podría proporcionarme más información por favor?`;
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

function ContactButtons({ phone, phone2, category, url }) {
  if (!phone && !phone2) return null;

  return (
    <>
      <div>
        {phone && <ContactButton phone={phone} type="call" category={category} url={url} />}
        {phone && <ContactButton phone={phone} type="whatsapp" category={category} url={url} />}
      </div>
      <p>🌐BuscAdis🔗</p>
      <div>
        {phone2 && <ContactButton phone={phone2} type="call" category={category} url={url} />}
        {phone2 && <ContactButton phone={phone2} type="whatsapp" category={category} url={url} />}
      </div>
    </>
  );
}

export default ContactButtons;
