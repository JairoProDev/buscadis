import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFlag, faLink, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import "./modalOptions.css";

function ModalOptions() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleShareMenu = (e) => {
    e.stopPropagation();
    setIsShareOpen(!isShareOpen);
  };

  const copyLinkToClipboard = () => {
    // Intentar copiar el enlace al portapapeles
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("Enlace copiado al portapapeles");
      })
      .catch(() => {
        alert("Hubo un error al intentar copiar el enlace");
      });
  };

  const shareAd = () => {
    if (navigator.share) {
      // Usar la API Web Share si está disponible
      navigator.share({
        title: 'BuscAdis.com',
        text: 'Echa un vistazo a este anuncio en BuscAdis!',
        url: window.location.href,
      })
        .then(() => console.log('Anuncio compartido exitosamente'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      alert("Tu navegador no soporta la funcionalidad de compartir.");
    }
  };

  const reportAd = () => {
    // Aquí puedes reemplazar este alert con tu lógica real para reportar un anuncio.
    alert("Reportar anuncio: Abriendo formulario de reporte...");
    // Ejemplo de redireccionar a una página de reporte
    // window.location.href = `/report?adId=${window.location.href}`;
  };

  return (
    <div className="modal-options-container" style={{ position: "relative" }}>
      <button className="modal-options-button" onClick={toggleShareMenu}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>

      {isShareOpen && (
        <div className="modal-options open">
          <ul>
            <li onClick={reportAd}>
              <FontAwesomeIcon icon={faFlag} /> Reportar
            </li>
            <li onClick={copyLinkToClipboard}>
              <FontAwesomeIcon icon={faLink} /> Copiar enlace
            </li>
            <li onClick={shareAd}>
              <FontAwesomeIcon icon={faShareAlt} /> Compartir
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModalOptions;
