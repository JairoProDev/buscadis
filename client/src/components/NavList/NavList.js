// NavList.js
import React from "react";
import { Link } from "react-router-dom";
import "./navList.css";

function NavList({ setFilter, toggleForm }) {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <NavItem
          icon="work"
          link="/Empleos"
          label="Empleos"
          onClick={() => setFilter("Empleos")}
        />
        <NavItem
          icon="house"
          link="/Inmuebles"
          label="Inmuebles"
          onClick={() => setFilter("Inmuebles")}
        />

        <NavItem icon="campaign" onClick={toggleForm} label="Anunciar" />

        <NavItem
          icon="directions_car"
          link="/Autos"
          label="Autos"
          onClick={() => setFilter("Autos")}
        />
        <NavItem
          icon="engineering"
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
      <span className="material-symbols-outlined">{icon}</span>
      <Link to={link}>{label}</Link>
    </li>
  );
}

export default NavList;