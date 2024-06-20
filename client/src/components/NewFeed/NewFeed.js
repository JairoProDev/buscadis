// NewFeed.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdList from '../AdList/AdList';
import CategoryButtons from '../CategoryButtons/CategoryButtons';

const categories = {
  Empleos: [ 'Tecnología', 'Salud', 'Educación', 'Construcción', 'Practicantes', 'Ventas', 'Servicio al Cliente', 'Transporte', 'Administración', 'Hotelería', 'Agencias', 'Hogar', 'Logística', 'Operaciones', 'Turismo', 'Contabilidad', 'Seguridad', 'Panadería', 'Secretaría', 'Almacén', 'Cuidado', 'Marketing', 'Gastronomía', 'Belleza', 'Farmacia', 'Otros'],
  Inmuebles: ['Habitaciones', 'Departamentos', 'Casas', 'Terrenos', 'Locales', 'Oficinas', 'Hoteles', 'Anticresis', 'Otros'],
  Vehicles: ['Autos', 'Camionetas', 'Motos', 'Bicicletas', 'Maquinaria', 'Otros'],
  Servicios: ['Educación', 'Reparaciones', 'Salud', 'Domésticos', 'Técnicos', 'Eventos', 'Otros'],
  Productos: ['Tecnología', 'Ropa y Accesorios', 'Hogar', 'Deportes', 'Libros', 'Juegos y Juguetes', 'Otros'],
  Otros: ['Eventos', 'Mascotas', 'Objetos Perdidos', 'Otros']
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
    if (!category) {
      filtered = anuncios; // Mostrar todos los anuncios cuando no hay categoría
    }
    setFilteredAnuncios(filtered);
  }, [anuncios, category, subcategory]);

  const handleCategoryClick = (category) => {
    if (category === null) {
      navigate('/');
    } else {
      navigate(`/${category}`);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/${category}/${subcategory}`);
  };

  return (
    <div className="feed">
      <CategoryButtons
        categories={categories}
        category={category}
        handleCategoryClick={handleCategoryClick}
        handleSubcategoryClick={handleSubcategoryClick}
      />
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
