// BottomNavBar.js
import React, { useState } from 'react';
import { FaMobileAlt, FaSearch, FaRegNewspaper, FaBullhorn, FaUser } from 'react-icons/fa';
import './bottomNavBar.css';
import useScroll from '../../hooks/useScroll';

const navItems = [
  { name: 'Revista', icon: FaRegNewspaper, path: '/' },
  { name: 'TikShop', icon: FaMobileAlt, path: '/tikshop' },
  { name: 'Anunciar', icon: FaBullhorn, isButton: true },
  { name: 'Buscar', icon: FaSearch, isSearch: true },
  { name: 'Perfil', icon: FaUser, path: 'https://wa.me/937054328', isExternal: true }
];

function BottomNavBar({ showForm, searchInputRef }) {
  const [activeItem, setActiveItem] = useState(navItems[0].name);
  const isHidden = useScroll();

  const handleClick = (item) => {
    setActiveItem(item.name);
    console.log('searchInputRef in BottomNavBar:', searchInputRef); // Log para verificar la referencia
    if (item.isSearch) {
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.focus(); // Enfoca el campo de búsqueda del encabezado
      } else {
        console.error("searchInputRef.current is undefined");
      }
    } else if (item.isButton) {
      showForm();
    }
  };

  return (
    <div className={`bottom-nav ${isHidden ? 'hidden' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        if (item.isSearch) {
          return (
            <div key={item.name} className="bottom-nav-item" onClick={() => handleClick(item)}>
              <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
                <Icon className="bottom-nav-icon" />
              </div>
              <div className="bottom-nav-text">{item.name}</div>
            </div>
          );
        } else if (item.isExternal) {
          return (
            <a href={item.path} target="_blank" rel="noopener noreferrer" key={item.name} className="bottom-nav-item">
              <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
                <Icon className="bottom-nav-icon" />
              </div>
              <div className="bottom-nav-text">{item.name}</div>
            </a>
          );
        } else {
          return (
            <div key={item.name} className="bottom-nav-item" onClick={() => handleClick(item)}>
              <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
                <Icon className="bottom-nav-icon" />
              </div>
              <div className="bottom-nav-text">{item.name}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default BottomNavBar;
