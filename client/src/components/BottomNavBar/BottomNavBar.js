// BottomNavBar.js
import React from 'react';
import useScroll from '../../hooks/useScroll'; // Asegúrate de ajustar la ruta de importación según la estructura de tu proyecto
import './bottomNavBar.css'; // Asegúrate de crear este archivo CSS para estilizar tu barra de navegación
import { Link } from 'react-router-dom';


import revistaIcon from '../../assets/icons/revista.png'; // Ajusta la ruta según sea necesario
import anunciarIcon from '../../assets/icons/publish.png';
import perfilIcon from '../../assets/icons/profile.png';

function BottomNavBar({showForm}) {
    const isHidden = useScroll();

    return (
        <div className={`bottom-nav ${isHidden ? 'hidden' : ''}`}>
            <Link to="/"><img src={revistaIcon} alt="Revista" /></Link>
            <button onClick={showForm} className="highlight">
                <img src={anunciarIcon} alt="Anunciar" />
            </button>
            <Link to="/profile"><img src={perfilIcon} alt="Perfil" /></Link>
        </div>
  );
}

export default BottomNavBar;