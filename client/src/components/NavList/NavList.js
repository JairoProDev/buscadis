// NavList.js
import React from "react";
import { Link } from "react-router-dom";
import "./navList.css";
import JobsIcon from '../../icons/jobs.png';
import EstateIcon from '../../icons/estate.png';
import CarsIcon from '../../icons/vehicles.png';
import ServiceIcon from '../../icons/services.png';
import PublishIcon from '../../icons/publish.png';

function NavList({ setFilter, toggleForm }) {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <NavItem
          icon={JobsIcon}
          link="/Empleos"
          label="Empleos"
          onClick={() => setFilter("Empleos")}
        />
        <NavItem
          icon={EstateIcon}
          link="/Inmuebles"
          label="Inmuebles"
          onClick={() => setFilter("Inmuebles")}
        />
        <NavItem
          icon={PublishIcon}
          onClick={toggleForm}
          label="Anunciar"
        />
        <NavItem
          icon={CarsIcon}
          link="/Autos"
          label="Autos"
          onClick={() => setFilter("Autos")}
        />
        <NavItem
          icon={ServiceIcon}
          link="/Servicios"
          label="Servicios"
          onClick={() => setFilter("Servicios")}
        />
      </ul>
    </nav>
  );
}

function NavItem({ icon, link, label, onClick }) {
  return (
    <li
      className="nav-item"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}  
    >
      <img src={icon} alt="" className="nav-item-icon" />
      <Link to={link}>
        <div>{label}</div> {/* Agrega el nombre debajo del icono */}
      </Link>
    </li>
  );
}

export default NavList;