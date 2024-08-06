import React from 'react';
import useScroll from '../../hooks/useScroll';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaSearch, FaRegNewspaper, FaBullhorn, FaUser } from 'react-icons/fa'; // Asegúrate de incluir FaHome

import './bottomNavBar.css'; // Importa el nuevo CSS

function BottomNavBar({ showForm }) {
    const isHidden = useScroll(); // Mantén el uso del hook personalizado

    return (
        <div className={`bottom-nav ${isHidden ? 'hidden' : ''}`}>
            <Link to="/" className="bottom-nav-item">
                <FaRegNewspaper className="bottom-nav-icon" />
                <div className="bottom-nav-text">Revista</div>
            </Link>
            <Link to="/tikshop" className="bottom-nav-item">
                <FaMobileAlt className="bottom-nav-icon" />
                <div className="bottom-nav-text">TikShop</div>
            </Link>
            <button onClick={showForm} className="highlight bottom-nav-item">
                <FaBullhorn className="bottom-nav-icon" />
                <div className="bottom-nav-text">Anunciar</div>
            </button>
            <Link to="/buscar" className="bottom-nav-item"> {/* Link para la ruta de búsqueda */}
                <FaSearch className="bottom-nav-icon" />
                <div className="bottom-nav-text">Buscar</div>
            </Link>
            <a href="https://wa.me/937054328" target="_blank" rel="noopener noreferrer" className="bottom-nav-item">
                <FaUser className="bottom-nav-icon" />
                <div className="bottom-nav-text">Perfil</div>
            </a>
        </div>
    );
}

export default BottomNavBar;