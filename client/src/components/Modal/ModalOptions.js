import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFlag, faLink, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

function ModalOptions() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleShareMenu = (e) => {
    e.stopPropagation();
    setIsShareOpen(!isShareOpen);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Enlace copiado al portapapeles");
    });
  };

  return (
    <div className="modal-options-container" style={{ position: "relative" }}>
      <button className="modal-options-button" onClick={toggleShareMenu}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>

      {isShareOpen && (
        <div className="modal-options open">
          <ul>
            <li onClick={() => alert("Reportar anuncio")}>
              <FontAwesomeIcon icon={faFlag} /> Reportar
            </li>
            <li onClick={copyLinkToClipboard}>
              <FontAwesomeIcon icon={faLink} /> Copiar enlace
            </li>
            <li onClick={() => alert("Compartir")}>
              <FontAwesomeIcon icon={faShareAlt} /> Compartir
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModalOptions;
