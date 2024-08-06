import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaSearch, FaRegNewspaper, FaBullhorn, FaUser } from 'react-icons/fa';
import './bottomNavBar.css';
import useScroll from '../../hooks/useScroll';

const navItems = [
  { name: 'Revista', icon: FaRegNewspaper, path: '/' },
  { name: 'TikShop', icon: FaMobileAlt, path: '/tikshop' },
  { name: 'Anunciar', icon: FaBullhorn, isButton: true },
  { name: 'Buscar', icon: FaSearch, path: '/buscar' },
  { name: 'Perfil', icon: FaUser, path: 'https://wa.me/937054328', isExternal: true }
];

function BottomNavBar({ showForm }) {
  const [activeItem, setActiveItem] = useState(navItems[0].name);
  const isHidden = useScroll();

  const handleClick = (item) => {
    setActiveItem(item.name);
    if (item.isButton) {
      showForm();
    }
  };

  return (
    <div className={`bottom-nav ${isHidden ? 'hidden' : ''}`}> {/* Esto añade la clase 'hidden' cuando se desplaza hacia abajo */}
      {navItems.map((item) => {
        const Icon = item.icon;
        return item.isExternal ? (
          <a href={item.path} target="_blank" rel="noopener noreferrer" key={item.name} className="bottom-nav-item" onClick={() => handleClick(item)}>
            <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
              <Icon className="bottom-nav-icon" />
              {activeItem === item.name && <div className="bottom-nav-highlight" />}
            </div>
            <div className="bottom-nav-text">{item.name}</div>
          </a>
        ) : (
          <Link to={item.path} key={item.name} className="bottom-nav-item" onClick={() => handleClick(item)}>
            <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
              <Icon className="bottom-nav-icon" />
              {activeItem === item.name && <div className="bottom-nav-highlight" />}
            </div>
            <div className="bottom-nav-text">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default BottomNavBar;
