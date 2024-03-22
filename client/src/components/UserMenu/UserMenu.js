import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBell,
  faEnvelope,
  faCog,
  faBullhorn,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./userMenu.css";

function UserMenu({ openLoginForm, openRegisterForm, toggleForm }) {
  const token = localStorage.getItem("token");
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  if (!token) {
    return (
      <div className="header-right">
        <button onClick={openLoginForm}>Iniciar sesión</button>
        <button onClick={openRegisterForm}>Registrarse</button>
      </div>
    );
  }

  return (
    <div className="header-right" ref={menuRef}>
      <div className="menu-item" onClick={() => setActiveMenu("messages")}>
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Mensajes</span>
        {activeMenu === "messages" && (
          <div className="menu-options">
            {/* Aquí puedes agregar las opciones de mensajes */}
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => setActiveMenu("notifications")}>
        <FontAwesomeIcon icon={faBell} />
        <span>Notificaciones</span>
        {activeMenu === "notifications" && (
          <div className="menu-options">
            {/* Aquí puedes agregar las opciones de notificaciones */}
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => setActiveMenu("profile")}>
        <FontAwesomeIcon icon={faUserCircle} />
        <span>Perfil</span>
        {activeMenu === "profile" && (
          <div className="menu-options">
            <div
              onClick={() => {
                setActiveMenu(null);
              }}
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <span>Ver perfil</span>
            </div>
            <div onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Cerrar sesión</span>
            </div>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => setActiveMenu("settings")}>
        <FontAwesomeIcon icon={faCog} />
        <span>Configuración</span>
        {activeMenu === "settings" && (
          <div className="menu-options">
            <div
              onClick={() => {
                setActiveMenu(null);
              }}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Configuración de cuenta</span>
            </div>
            <div
              onClick={() => {
                setActiveMenu(null);
              }}
            >
              <FontAwesomeIcon icon={faBullhorn} />
              <span>Configuración de notificaciones</span>
            </div>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => setActiveMenu("announce")}>
        <FontAwesomeIcon icon={faBullhorn} />
        <span>Anunciar</span>
        {activeMenu === "announce" && (
          <div className="menu-options">
            {/* Aquí puedes agregar las opciones de anunciar */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;

// Este es el componente UserMenu de nuestra aplicación React. Este componente se utiliza para mostrar el menú del usuario en la cabecera de nuestra aplicación.

// Primero, importo las dependencias necesarias, incluyendo React, useState de React para el estado del componente, FontAwesomeIcon de @fortawesome/react-fontawesome para los iconos, y los iconos específicos que necesito de @fortawesome/free-solid-svg-icons.

// Luego, defino mi componente UserMenu. Este componente toma dos props: openLoginForm y openRegisterForm, que son funciones que se llaman cuando el usuario hace clic en los botones de iniciar sesión y registrarse, respectivamente.

// Dentro de mi componente, obtengo el token del almacenamiento local y creo una variable de estado activeMenu para rastrear qué submenú está actualmente activo.

// También defino una función logout que elimina el token del almacenamiento local. Esta función se llama cuando el usuario hace clic en la opción de cerrar sesión.

// A continuación, verifico si hay un token. Si no hay un token, eso significa que el usuario no está autenticado, por lo que muestro los botones de iniciar sesión y registrarse.

// Si hay un token, eso significa que el usuario está autenticado, por lo que muestro el menú del usuario. Este menú incluye varias opciones, cada una de las cuales tiene un icono, un texto y un submenú que se muestra cuando esa opción está activa.

// Sugerencias de mejora a futuro:

// Manejo de clics fuera del menú: Actualmente, los submenús se mantienen abiertos hasta que se hace clic en otra opción del menú. Podrías considerar cerrar el submenú activo cuando se hace clic fuera del menú.

// Navegación: Podrías considerar añadir navegación a las opciones del menú. Por ejemplo, cuando se hace clic en "Ver perfil", podrías navegar al perfil del usuario.

// Rellenar los submenús: Actualmente, los submenús de mensajes, notificaciones y anunciar están vacíos. Podrías considerar añadir opciones a estos submenús.
