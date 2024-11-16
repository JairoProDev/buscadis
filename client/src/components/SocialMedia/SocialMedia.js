// SocialMedia.js
import React from "react";
import "./SocialMedia.css";
import adisImage from "../../images/adis.webp"; // Ajusta la ruta según la ubicación real de la imagen

const SocialMedia = () => {
  return (
    <div className="social-media">
      <ul className="wrapper">
        {/* <li className="icon facebook">
          <span className="tooltip">Facebook</span>
          <a
            href="https://www.facebook.com/publicadis"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </li>
        <li className="icon instagram">
          <span className="tooltip">Instagram</span>
          <a
            href="https://www.instagram.com/publicadis"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li className="icon linkedin">
          <span className="tooltip">LinkedIn</span>
          <a
            href="https://www.linkedin.com/JairoProDev"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </li>
        <li className="icon tiktok">
          <span className="tooltip">TikTok</span>
          <a
            href="https://www.tiktok.com/@publicadis"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </li> */}
        <li className="icon whatsapp">
          <span className="tooltip">ADIS</span>
          <a href="https://api.whatsapp.com/send?phone=51937054328&text=Hola%2C%20vengo%20de%20la%20app%2C%20quiero%20unirme%20a%20la%20version%20beta%20de%20ADIS%20y%20probar%20su%inteligencia%artificial" target="_blank" rel="noreferrer">
          <img class="adis-image" src={adisImage} alt="WhatsApp" style={{ width: '80px', height: '80px' }} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialMedia;