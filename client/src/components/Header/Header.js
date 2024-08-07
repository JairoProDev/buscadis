// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import useScroll from "../../hooks/useScroll";
import SearchBar from "../SearchBar/SearchBar";

function Header({ setFilter, toggleSidebar, openLoginForm, openRegisterForm, updateSearchTerm, searchInputRef }) {
  const isHidden = useScroll();

  const [visitorCount, setVisitorCount] = useState(0);
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
        <SearchBar updateSearchTerm={updateSearchTerm} inputRef={searchInputRef} />
        <div className="counters">
          <p className="advertisers"><span className="icon">📢</span> <span className="text">Avisos:</span> <span className="number">{adCount}</span></p>
          <p className="visitors"><span className="icon">🔎</span> <span className="text">Visitas:</span> <span className="number">{totalVisitors}</span></p>
        </div>
      </div>
    </header>
  );
}

export default Header;
