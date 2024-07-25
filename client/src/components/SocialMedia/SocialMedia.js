// SocialMedia.js
import React from "react";
import "./SocialMedia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

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
          <span className="tooltip">WhatsApp</span>
          <a href="https://api.whatsapp.com/send?phone=51937054328&text=Hola%2C%20vengo%20de%20la%20app%2C%20quiero%20unirme%20a%20la%20comunidad%20de%20WhatsApp%20y%20obtener%20m%C3%A1s%20beneficios" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialMedia;
