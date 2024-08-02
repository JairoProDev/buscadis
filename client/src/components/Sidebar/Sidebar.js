import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

// Lista de enlaces categorizados
const categories = [
  {
    title: "Empleos",
    links: [
      { icon: "restaurant", label: "Cocina", path: "/cocina" },
      { icon: "directions_bus", label: "Conducción", path: "/conduccion" },
      { icon: "school", label: "Docencia", path: "/docencia" },
      { icon: "hotel", label: "Hoteles", path: "/hoteles" },
      { icon: "store_mall_directory", label: "Almacén", path: "/almacen" },
      { icon: "local_shipping", label: "Repartidor", path: "/repartidor" },
      { icon: "local_bar", label: "Bares", path: "/bares" },
    ],
  },
  {
    title: "Inmuebles",
    links: [
      { icon: "apartment", label: "Apartamentos", path: "/apartamentos" },
      { icon: "house", label: "Casas", path: "/casas" },
      { icon: "landscape", label: "Terrenos", path: "/terrenos" },
      { icon: "store", label: "Locales", path: "/locales" },
      { icon: "work", label: "Oficinas", path: "/oficinas" },
      { icon: "storefront", label: "Bodegas", path: "/bodegas" },
      { icon: "store_mall_directory", label: "Almacenes", path: "/almacenes" },
    ],
  },
  {
    title: "Vehículos",
    links: [
      { icon: "directions_car", label: "Autos", path: "/autos" },
      { icon: "directions_bike", label: "Motos", path: "/motos" },
      { icon: "local_shipping", label: "Camiones", path: "/camiones" },
    ],
  },
  {
    title: "Turismo",
    links: [
      { icon: "flight", label: "Vuelos", path: "/vuelos" },
      { icon: "hotel", label: "Hoteles", path: "/turismo/hoteles" },
      { icon: "local_activity", label: "Agencias de viaje", path: "/agencias-viaje" },
      { icon: "restaurant", label: "Restaurantes", path: "/restaurantes" },
    ],
  },
  {
    title: "Otros",
    links: [
      { icon: "local_grocery_store", label: "Alimentos", path: "/alimentos" },
      { icon: "kitchen", label: "Electrodomésticos", path: "/electrodomesticos" },
      { icon: "devices", label: "Tecnología", path: "/tecnologia" },
      { icon: "shopping_basket", label: "Moda y Accesorios", path: "/moda-accesorios" },
      { icon: "house", label: "Hogar y Jardín", path: "/hogar-jardin" },
      { icon: "spa", label: "Salud y Belleza", path: "/salud-belleza" },
      { icon: "theaters", label: "Entretenimiento", path: "/entretenimiento" },
      { icon: "pets", label: "Mascotas", path: "/mascotas" },
    ],
  },
  {
    title: "Varios",
    links: [
      { icon: "bar_chart", label: "Educación", path: "/educacion" },
      { icon: "shopping_basket", label: "Ropa", path: "/ropa" },
      { icon: "settings", label: "Servicios", path: "/servicios" },
      { icon: "engineering", label: "Profesionales", path: "/profesionales" },
      { icon: "school", label: "Clases y Cursos", path: "/clases-cursos" },
      { icon: "event", label: "Eventos", path: "/eventos" },
    ],
  },
];

function Sidebar({ isOpen, updateSearchTerm }) {
  const handleLinkClick = (searchTerm) => {
    updateSearchTerm(searchTerm);
  };

  return (
    <aside className="sidebar" style={{ display: isOpen ? "block" : "none" }}>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h4>{category.title}</h4>
          <ul className="enlaces">
            {category.links.map((link, linkIndex) => (
              <li key={linkIndex} onClick={() => handleLinkClick(link.label)}>
                <span className="material-symbols-outlined">{link.icon}</span>
                <Link to={link.path} data-search-term={link.label} style={{ textDecoration: 'none' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;