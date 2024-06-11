import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavList from '../NavList/NavList';
import AdList from '../AdList/AdList';

const categories = {
  Empleos: ['Restaurantes', 'Tecnología', 'Salud', 'Educación', 'Construcción', 'Practicantes', 'Ventas', 'Servicio al Cliente', 'Transporte', 'Administración', 'Hotelería', 'Agencias', 'Hogar', 'Logística', 'Operaciones', 'Turismo', 'Contabilidad', 'Seguridad', 'Panadería', 'Secretaría', 'Almacén', 'Cuidado', 'Marketing', 'Gastronomía', 'Belleza', 'Farmacia', 'Otros'],
  Inmuebles: ['Habitaciones', 'Minidepartamentos', 'Departamentos', 'Casas', 'Lotes', 'Terrenos', 'Locales', 'Oficinas', 'Hoteles', 'Anticresis', 'Otros'],
  // Vehicles: ['Autos', 'Camionetas', 'Motos', 'Bicicletas', 'Maquinaria', 'Otros'],
  // Servicios: ['Educación', 'Reparaciones', 'Salud', 'Domésticos', 'Técnicos', 'Eventos', 'Otros'],
  // Productos: ['Tecnología', 'Ropa y Accesorios', 'Hogar y Muebles', 'Deportes y Fitness', 'Libros y Educación', 'Juegos y Juguetes', 'Otros'],
  // Otros: ['Eventos', 'Mascotas', 'Ofertas Especiales', 'Objetos Perdidos', 'Coleccionables', 'Otros']
};

function Feed({ anuncios, setSelectedAd, error, isLoading, loader, setFilter, toggleForm }) {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    let filtered = anuncios;
    if (category) {
      filtered = filtered.filter(anuncio => anuncio.category === category);
    }
    if (subcategory) {
      filtered = filtered.filter(anuncio => anuncio.subcategory === subcategory);
    }
    setFilteredAnuncios(filtered);
  }, [anuncios, category, subcategory]);

  const handleCategoryClick = (category) => {
    navigate(`/${category}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/${category}/${subcategory}`);
  };

  return (
    <div className="feed">
      <NavList
        className="nav-list nav-list-top"
        toggleForm={toggleForm}
        setFilter={setFilter}
      />
      <div>
        <div>
          {Object.keys(categories).map((category) => (
            <button key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>

{category && categories[category] && (
  <div>
    {categories[category].map((subcategory) => (
      <button key={subcategory} onClick={() => handleSubcategoryClick(subcategory)}>
        {subcategory}
      </button>
    ))}
  </div>
)}
      </div>
      <AdList
        anuncios={filteredAnuncios}
        setSelectedAd={setSelectedAd}
        error={error}
        isLoading={isLoading}
        loader={loader}
      />
      {error && <div className="error">{error}</div>}
      {isLoading && (
        <div ref={loader}>
          Cargando anuncios publicados en BuscAdis.com...
        </div>
      )}
    </div>
  );
}

export default Feed;