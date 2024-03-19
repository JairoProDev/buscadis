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
          setFilter={setFilter}
        />
        <NavItem
          icon="house"
          link="/Inmuebles"
          label="Inmuebles"
          setFilter={setFilter}
        />

        <NavItem icon="campaign" onClick={toggleForm} label="Anunciar" />

        <NavItem
          icon="directions_car"
          link="/Autos"
          label="Autos"
          setFilter={setFilter}
        />
        <NavItem
          icon="engineering"
          link="/Servicios"
          label="Servicios"
          setFilter={setFilter}
        />
      </ul>
    </nav>
  );
}

function NavItem({ icon, link, label, setFilter, onClick }) {
  return (
    <li
      className="nav-item"
      onClick={onClick || (setFilter ? () => setFilter(label) : undefined)}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <Link to={link}>{label}</Link>
    </li>
  );
}

export default NavList;
