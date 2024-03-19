// Header.js
import React, { useState } from "react"; // Importa useState de react
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo.ico";
import useScroll from "../../hooks/useScroll";
import NavList from "../NavList/NavList";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import AdForm from "../AdForm/AdForm"; // Importa el formulario de publicación del anuncio

function Header({ openLoginModal, openRegisterModal, setFilter, toggleSidebar }) {
  const isHidden = useScroll();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const showForm = () => setIsFormVisible(true); // Esta es la única declaración de showForm que necesitas
  const hideForm = () => setIsFormVisible(false);

  return (
    <header className={`header ${isHidden ? "header-hidden" : ""}`}>
      <div className="header-top">
        {/*<button onClick={toggleSidebar} className="hamburger-menu">
          &#9776;
        </button>*/}
        <Logo />
        {/* <SearchBar /> */}
        <NavList

          setFilter={setFilter}
        />{" "}
      <UserMenu openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} toggleForm={showForm} />
      </div>
      {isFormVisible && <AdForm hideForm={hideForm} />}{" "}
      {/* Muestra el formulario si isFormVisible es true */}
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
