// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../images/logo.ico';
import useScroll from '../../hooks/useScroll';

function Header() {
    const isHidden = useScroll();

    return (
        <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
            <Logo />
            <SearchBar />
            <NavList />
            <UserMenu />
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
            <input type="text" placeholder="Buscar en PublicAdis" className="search-input" />
        </div>
    );
}

function NavList() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <NavItem icon="work" link="/Empleos" label="Empleos" />
                <NavItem icon="house" link="/Inmuebles" label="Inmuebles" />
                <NavItem icon="directions_car" link="/Autos" label="Autos" />
                <NavItem icon="engineering" link="/Servicios" label="Servicios" />
            </ul>
        </nav>
    );
}

function NavItem({ icon, link, label }) {
    return (
        <li className="nav-item">
            <span className="material-symbols-outlined">{icon}</span>
            <Link to={link}>{label}</Link>
        </li>
    );
}

function UserMenu() {
    return (
        <div className="header-right">
            <NavItem icon="account_circle" link="/perfil" label="Mi Perfil" />
            <NavItem icon="notifications_none" link="/notificaciones" label="Notificaciones" />
            <NavItem icon="message" link="/mensajes" label="Mensajes" />
            <NavItem icon="settings" link="/configuracion" label="Configuración" />
            <NavItem icon="campaign" link="/anunciar" label="Anunciar" />
        </div>
    );
}

export default Header;