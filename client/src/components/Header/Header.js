// Header.js

import React, { useEffect, useState } from 'react';
import './header.css';
import logo from '../../images/logo.ico';
function Header() {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollTop(st <= 0 ? 0 : st);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
                <div className="header-title">PublicAdis</div>
                <div className="search-container">
                    <input type="text" placeholder="Buscar en PublicAdis" className="search-input" />
                </div>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                    <span className="material-symbols-outlined">work</span>
                        <a href="/Empleos">Empleos</a>
                    </li>
                    <li className="nav-item">
                    <span className="material-symbols-outlined">house</span>
                        <a href="/Inmuebles">Inmuebles</a>
                    </li>
                    <li className="nav-item">
                    <span className="material-symbols-outlined">directions_car</span>
                        <a href="/Autos">Autos</a>
                    </li>
                    <li className="nav-item">
                    <span className="material-symbols-outlined">engineering</span>
                        <a href="/Servicios">Servicios</a>
                        </li>
                </ul>
            </nav>
            <div className="header-right">
            <div className="nav-item">
                <span className="material-symbols-outlined">account_circle</span>
                <a href="/perfil">Mi Perfil</a>
            </div>
            <div className="nav-item">
                <span className="material-symbols-outlined">notifications_none</span>
                <a href="/notificaciones">Notificaciones</a>
            </div>
            <div className="nav-item">
                <span className="material-symbols-outlined">message</span>
                <a href="/mensajes">Mensajes</a>
            </div>
            <div className="nav-item">
                <span className="material-symbols-outlined">settings</span>
                <a href="/configuracion">Configuración</a>
            </div>
            <div className="nav-item">
                <span className="material-symbols-outlined">campaign</span>
                <a href="/anunciar">Anunciar</a>
            </div>
        </div>
        </header>
        
    );
}

export default Header;