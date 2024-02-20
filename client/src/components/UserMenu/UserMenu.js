import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userMenu.css";
import {
  faUserCircle,
  faBell,
  faEnvelope,
  faCog,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

function UserMenu() {
  return (
    <div className="header-right">
      <Link to="/perfil">
        <FontAwesomeIcon icon={faUserCircle} />
        <span>Perfil</span>
      </Link>
      <Link to="/notificaciones">
        <FontAwesomeIcon icon={faBell} />
        <span>Notificaciones</span>
      </Link>
      <Link to="/mensajes">
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Mensajes</span>
      </Link>
      <Link to="/configuracion">
        <FontAwesomeIcon icon={faCog} />
        <span>Configuración</span>
      </Link>
      <Link to="/anunciar">
        <FontAwesomeIcon icon={faBullhorn} />
        <span>Anunciar</span>
      </Link>
    </div>
  );
}

export default UserMenu;
