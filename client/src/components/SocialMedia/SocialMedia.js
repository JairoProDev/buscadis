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
        <li className="icon facebook">
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
            href="https://www.tiktok.com/publicadis"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </li>
        <li className="icon whatsapp">
          <span className="tooltip">WhatsApp</span>
          <a href="https://wa.me/921963484" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialMedia;
