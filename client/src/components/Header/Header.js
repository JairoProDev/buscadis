// Header.js

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.ico";
import useScroll from "../../hooks/useScroll";
import NavList from "../NavList/NavList";
import UserMenu from "../UserMenu/UserMenu";

function Header({ setFilter, toggleSidebar }) {
  const isHidden = useScroll();

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <button onClick={toggleSidebar} className="hamburger-menu">
        &#9776;
      </button>
      <Logo />
      <NavList setFilter={setFilter} />
      <SearchBar />
      <UserMenu />
    </header>
  );
}

function Logo({ setFilter }) {
  return (
    <Link to="/" className="header-left" onClick={() => setFilter(null)}>
      <img src={logo} alt="Logo" className="logo" />
      <div className="header-title">PublicAdis</div>
    </Link>
  );
}

function SearchBar() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar en PublicAdis"
        className="search-input"
      />
    </div>
  );
}


export default Header;
