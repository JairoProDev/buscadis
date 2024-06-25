// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import useScroll from "../../hooks/useScroll";
import UserMenu from "../UserMenu/UserMenu";
import SearchBar from "../SearchBar/SearchBar";

function Header({ setFilter, toggleSidebar, openLoginForm, openRegisterForm, updateSearchTerm }) {
  const isHidden = useScroll();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => setIsFormVisible(true);

  const [ visitorCount, setVisitorCount] = useState(0);

  const [adCount, setAdCount] = useState(0);

  const totalVisitors = visitorCount + adCount + 2000;

  useEffect(() => {
    fetch('/visitorCount')
      .then(response => response.json())
      .then(data => setVisitorCount(data.visitorCount))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch('/adCount')
      .then(response => response.json())
      .then(data => setAdCount(data.adCount))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <div className="header-top">
        <Link to="/" className="header-left">
          <img src="../../images/logo.ico" alt="Logo" className="logo" />
          <h1 className="header-title">BuscAdis</h1>
        </Link>
        <SearchBar updateSearchTerm={updateSearchTerm} />
        {/* <button className="toggle-sidebar" onClick={toggleSidebar}>
          <span className="icon">📖</span>
        </button> */}
        <div className="counters">
          <p className="visitors"><span className="icon">🔎</span> <span className="text">Visitas:</span> <span className="number">{totalVisitors}</span></p>
          <p className="advertisers"><span className="icon">📢</span> <span className="text">Avisos:</span> <span className="number">{adCount}</span></p>
        </div>
        {/* <UserMenu
          openLoginForm={openLoginForm}
          openRegisterForm={openRegisterForm}
          toggleForm={showForm}
        /> */}
      </div>
    </header>
  );
}

export default Header;