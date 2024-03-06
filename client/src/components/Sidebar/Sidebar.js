import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ isOpen }) {
  return (
    <aside className="sidebar" style={{ display: isOpen ? "block" : "none" }}>
      <ul className="category-list">
        <h4>Empleos</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">restaurant</span>
            <Link to="#">Cocina</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">directions_bus</span>
            <Link to="#">Conducción</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">school</span>
            <Link to="#">Docencia</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">hotel</span>
            <Link to="#">Hoteles</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">
              store_mall_directory
            </span>
            <Link to="#">Almacén</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">local_shipping</span>
            <Link to="#">Repartidor</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">local_bar</span>
            <Link to="#">Bares</Link>
          </li>
        </ul>

        <h4>Inmuebles</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">apartment</span>
            <Link to="#">Apartamentos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">house</span>
            <Link to="#">Casas</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">landscape</span>
            <Link to="#">Terrenos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">store</span>
            <Link to="#">Locales</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">work</span>
            <Link to="#">Oficinas</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">storefront</span>
            <Link to="#">Bodegas</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">
              store_mall_directory
            </span>
            <Link to="#">Almacenes</Link>
          </li>
        </ul>

        <h4>Vehículos</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">directions_car</span>
            <Link to="#">Autos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">directions_bike</span>
            <Link to="#">Motos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">local_shipping</span>
            <Link to="#">Camiones</Link>
          </li>
        </ul>

        <h4>Turismo</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">flight</span>
            <Link to="#">Vuelos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">hotel</span>
            <Link to="#">Hoteles</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">local_activity</span>
            <Link to="#">Agencias de viaje</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">restaurant</span>
            <Link to="#">Restaurantes</Link>
          </li>
        </ul>

        <h4>Servicios</h4>

        <h4>Otros</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">
              local_grocery_store
            </span>
            <Link to="#">Alimentos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">kitchen</span>
            <Link to="#">Electrodomésticos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">devices</span>
            <Link to="#">Tecnología</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">shopping_basket</span>
            <Link to="#">Moda y Accesorios</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">house</span>
            <Link to="#">Hogar y Jardín</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">spa</span>
            <Link to="#">Salud y Belleza</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">theaters</span>
            <Link to="#">Entretenimiento</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">pets</span>
            <Link to="#">Mascotas</Link>
          </li>
        </ul>

        <h4>Varios</h4>
        <ul className="enlaces">
          <li>
            <span className="material-symbols-outlined">bar_chart</span>
            <Link to="#">Educación</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">shopping_basket</span>
            <Link to="#">Ropa</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">settings</span>
            <Link to="#">Servicios</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">engineering</span>
            <Link to="#">Profesionales</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">school</span>
            <Link to="#">Clases y Cursos</Link>
          </li>
          <li>
            <span className="material-symbols-outlined">event</span>
            <Link to="#">Eventos</Link>
          </li>
        </ul>
      </ul>
    </aside>
  );
}

export default Sidebar;
