// PublishButton.js
import React from "react";
import "./PublishButton.css"; // Asegúrate de cambiar esto a la ruta de tu archivo PublishButton.css

const PublishButton = ({ onClick }) => {
  return (
    <button type="submit" className="publish-button" onClick={onClick}>
      Publicar adiso
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default PublishButton;
