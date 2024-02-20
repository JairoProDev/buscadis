// Header.js

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.ico";
import useScroll from "../../hooks/useScroll";
import NavList from "../NavList/NavList";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";

function Header({ setFilter, toggleSidebar }) {
  const isHidden = useScroll();

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <div className="header-top">
        {/*<button onClick={toggleSidebar} className="hamburger-menu">
          &#9776;
        </button>*/}
        <Logo />
        {/* <SearchBar /> */}
        <NavList setFilter={setFilter} />
        <UserMenu />
      </div>
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

export default Header;
