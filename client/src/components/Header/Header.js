// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.ico";
import useScroll from "../../hooks/useScroll";
import NavList from "../NavList/NavList";
import UserMenu from "../UserMenu/UserMenu";

function Header({ setFilter, toggleSidebar, openLoginForm, openRegisterForm }) {
  const isHidden = useScroll();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => setIsFormVisible(true);

  const [ visitorCount, setVisitorCount] = useState(0);

  const [adCount, setAdCount] = useState(0);

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
        <Logo />
        <NavList setFilter={setFilter} />
        <div className="visitor-count">
          <p>Visitantes: {visitorCount}</p>
          <p>Anunciantes: {adCount}</p>
        </div>


        <UserMenu
          openLoginForm={openLoginForm}
          openRegisterForm={openRegisterForm}
          toggleForm={showForm}
        />
      </div>
    </header>
  );
}

function Logo({ setFilter }) {
  return (
    <Link to="/" className="header-left" onClick={() => setFilter(null)}>
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="header-title">PublicAdis</h1>
    </Link>
  );
}

export default Header;