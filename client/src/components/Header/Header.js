// Header.js

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.ico";
import useScroll from "../../hooks/useScroll";

function Header({ setFilter }) {
  const isHidden = useScroll();

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <Logo />
      <NavList setFilter={setFilter} />
      <SearchBar />
      <UserMenu setFilter={setFilter} />
    </header>
  );
}

function Logo() {
  return (
    <div className="header-left">
      <img src={logo} alt="Logo" className="logo" />
      <div className="header-title">PublicAdis</div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar en PublicAdis"
        className="search-input"
      />
    </div>
  );
}

function NavList({ setFilter }) {
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

function UserMenu({ setFilter }) {
  return (
    <div className="header-right">
      <NavItem
        icon="account_circle"
        link="/perfil"
        label="Mi Perfil"
        setFilter={setFilter}
      />
      <NavItem
        icon="notifications_none"
        link="/notificaciones"
        label="Notificaciones"
        setFilter={setFilter}
      />
      <NavItem
        icon="message"
        link="/mensajes"
        label="Mensajes"
        setFilter={setFilter}
      />
      <NavItem
        icon="settings"
        link="/configuracion"
        label="Configuración"
        setFilter={setFilter}
      />
      <NavItem
        icon="campaign"
        link="/anunciar"
        label="Anunciar"
        setFilter={setFilter}
      />
    </div>
  );
}

function NavItem({ icon, link, label, setFilter }) {
  return (
    <li className="nav-item">
      <span className="material-symbols-outlined">{icon}</span>
      <Link to={link} onClick={() => setFilter(label)}>
        {label}
      </Link>
    </li>
  );
}

export default Header;
