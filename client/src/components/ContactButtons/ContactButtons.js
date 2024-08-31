import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./contactButtons.css";

function ContactButton({ phone, type, adType, url }) {
  const isWhatsApp = type === "whatsapp";

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
    : `tel:${phone}`;
  const icon = isWhatsApp ? faWhatsapp : faPhone;
  const label = isWhatsApp ? "Contactar por WhatsApp" : "Llamar";
  const buttonClass = isWhatsApp ? "contact-button--whatsapp" : "contact-button--call";

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
  if (!phone && !phone2) return null;

  // Mensaje dividido en partes para fácil lectura
  const part1 = `Buen día, hemos publicado GRATIS su aviso de ${adType} por todo el día en nuestra plataforma para ayudarle a que más personas vean lo que ofrece.`;
  const part2 = `Puede verlo aquí: ${url}.`;
  const part3 = "Si desea que su aviso esté publicado por más días, avísenos para no eliminarlo hoy. También podemos agregar imágenes, actualizar detalles o publicar un nuevo anuncio si es que lo necesita.";

  // Concatenar con \n para saltos de línea y luego codificar toda la cadena
  const adminMessage = part1 + "\n\n" + part2 + "\n\n" + part3;
  const encodedMessage = encodeURIComponent(adminMessage);

  // Crear el enlace de WhatsApp
  const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <div className="contact-buttons-container">
      {phone && (
        <div className="contact-button-group">
          <ContactButton
            phone={phone}
            type="call"
            adType={adType}
            url={url}
          />
          <ContactButton
            phone={phone}
            type="whatsapp"
            adType={adType}
            url={url}
          />
        </div>
      )}
      {phone2 && (
        <div className="contact-button-group">
          <ContactButton
            phone={phone2}
            type="call"
            adType={adType}
            url={url}
          />
          <ContactButton
            phone={phone2}
            type="whatsapp"
            adType={adType}
            url={url}
          />
        </div>
      )}
      <a href="https://Publicadis.com" className="admin-button" target="_blank" rel="noopener noreferrer">PublicAdis.com</a>
    </div>
  );
}

export default ContactButtons;
