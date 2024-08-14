import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaSearch, FaRegNewspaper, FaBullhorn, FaUser } from 'react-icons/fa';
import './bottomNavBar.css';
import useScroll from '../../hooks/useScroll';
import { AuthContext } from '../../components/Auth/AuthContext'; 

const navItems = [
  { name: 'Revista', icon: FaRegNewspaper, path: '/' },
  { name: 'TikShop', icon: FaMobileAlt, path: '/' },
  { name: 'Anunciar', icon: FaBullhorn, isButton: true },
  { name: 'Buscar', icon: FaSearch, isSearch: true },
  { name: 'Perfil', icon: FaUser }
];

function BottomNavBar({ showForm, searchInputRef }) {
  const [activeItem, setActiveItem] = useState(navItems[0].name);
  const isHidden = useScroll();
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item.name);

    if (item.isSearch && searchInputRef?.current) {
      searchInputRef.current.focus();
    } else if (item.isButton && showForm) {
      showForm();
    } else if (item.name === 'Perfil') {
      if (user) {
        navigate('/profile'); 
      } else {
        navigate('/auth'); 
      }
    } else {
      navigate(item.path); 
    }
  };

  return (
    <div className={`bottom-nav ${isHidden ? 'hidden' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.name} className="bottom-nav-item" onClick={() => handleClick(item)}>
            <div className={`nav-item-container ${activeItem === item.name ? 'active' : ''}`}>
              <Icon className="bottom-nav-icon" />
            </div>
            <div className="bottom-nav-text">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomNavBar;
