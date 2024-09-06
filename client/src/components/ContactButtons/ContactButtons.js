import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

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
    : `tel:${phone}`;

  const icon = isWhatsApp ? faWhatsapp : faPhone;

  const label = isWhatsApp ? "WhatsApp" : "Llamar";

  return (
    <a
      href={href}
      className={`contact-button ${isWhatsApp ? "contact-button--whatsapp" : "contact-button--call"}`}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} />
      {label}
    </a>
  );
}

function ShareButton({ url }) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleShareOptions = () => setShowShareOptions(!showShareOptions);

  const shareOptions = [
    { label: 'WhatsApp', link: `https://wa.me/?text=${encodeURIComponent(`Mira esta oportunidad: ${url}`)}`, icon: faWhatsapp },
    { label: 'Facebook', link: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: faFacebook },
    { label: 'Twitter', link: `https://twitter.com/intent/tweet?url=${url}`, icon: faTwitter },
    { label: 'Copiar enlace', link: '#', icon: faShareAlt, onClick: () => navigator.clipboard.writeText(url) }
  ];

  return (
    <div className="share-button-container">
      <button onClick={toggleShareOptions} className="contact-button contact-button--share">
        <FontAwesomeIcon icon={faShareAlt} /> Compartir
      </button>
      {showShareOptions && (
        <div className="share-options">
          {shareOptions.map((option, index) => (
            <a
              key={index}
              href={option.link}
              onClick={option.onClick}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option"
            >
              <FontAwesomeIcon icon={option.icon} /> {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactButtons({ phone, phone2, adType, url }) {
  return (
    <div className="contact-buttons-container">
      <div className="contact-button-group">
        {/* Botón de llamada */}
        {phone && <ContactButton phone={phone} type="call" adType={adType} url={url} />}
        {phone2 && <ContactButton phone={phone2} type="call" adType={adType} url={url} />}

        {/* Botón de compartir */}
        <ShareButton url={url} />

        {/* Botón de WhatsApp */}
        {phone && <ContactButton phone={phone} type="whatsapp" adType={adType} url={url} />}
        {phone2 && (
          <ContactButton phone={phone2} type="whatsapp" adType={adType} url={url} />
        )}
      </div>
    </div>
  );
}

export default ContactButtons;
