import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import useScroll from "../../hooks/useScroll";

function Header({ setFilter, toggleSidebar, openLoginForm, openRegisterForm, updateSearchTerm, searchInputRef }) {
  const isHidden = useScroll();

  const [visitorCount, setVisitorCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  const totalVisitors = visitorCount + postCount;

  useEffect(() => {
    fetch('/visitorCount')
      .then(response => response.json())
      .then(data => setVisitorCount(data.visitorCount))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch('/postCount')
      .then(response => response.json())
      .then(data => setPostCount(data.postCount))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <div className="header-top">
        <Link to="/" className="header-left">
          <img src="../../images/logo.ico" alt="Logo" className="logo" />
          <h1 className="header-title">BuscAdis</h1>
        </Link>
        <div className="counters">
          <p className="advertisers"><span className="icon">📢</span> <span className="text">Avisos:</span> <span className="number">{postCount}</span></p>
          <p className="visitors"><span className="icon">🔎</span> <span className="text">Visitas:</span> <span className="number">{totalVisitors}</span></p>
        </div>
      </div>
    </header>
  );
}

export default Header;