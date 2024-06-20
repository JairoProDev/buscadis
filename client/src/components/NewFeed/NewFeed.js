// NewFeed.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdList from '../AdList/AdList';
import AdTypeButtons from '../AdTypeButtons/AdTypeButtons';

const adTypes = {
  Empleos: [ 'Tecnología', 'Salud', 'Educación', 'Construcción', 'Practicantes', 'Ventas', 'Servicio al Cliente', 'Transporte', 'Administración', 'Hotelería', 'Agencias', 'Hogar', 'Logística', 'Operaciones', 'Turismo', 'Contabilidad', 'Seguridad', 'Panadería', 'Secretaría', 'Almacén', 'Cuidado', 'Marketing', 'Gastronomía', 'Belleza', 'Farmacia', 'Otros'],
  Inmuebles: ['Habitaciones', 'Departamentos', 'Casas', 'Terrenos', 'Locales', 'Oficinas', 'Hoteles', 'Anticresis', 'Otros'],
  Vehicles: ['Autos', 'Camionetas', 'Motos', 'Bicicletas', 'Maquinaria', 'Otros'],
  Servicios: ['Educación', 'Reparaciones', 'Salud', 'Domésticos', 'Técnicos', 'Eventos', 'Otros'],
  Productos: ['Tecnología', 'Ropa y Accesorios', 'Hogar', 'Deportes', 'Libros', 'Juegos y Juguetes', 'Otros'],
  Otros: ['Eventos', 'Mascotas', 'Objetos Perdidos', 'Otros']
};

function Feed({ anuncios, setSelectedAd, error, isLoading, loader, setFilter, toggleForm }) {
  const { adType, category } = useParams();
  const navigate = useNavigate();
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    let filtered = anuncios;
    if (adType) {
      filtered = filtered.filter(anuncio => anuncio.adType === adType);
    }
    if (category) {
      filtered = filtered.filter(anuncio => anuncio.category === category);
    }
    if (!adType) {
      filtered = anuncios; // Mostrar todos los anuncios cuando no hay adType
    }
    setFilteredAnuncios(filtered);
  }, [anuncios, adType, category]);

  const handleAdTypeClick = (adType) => {
    if (adType === null) {
      navigate('/');
    } else {
      navigate(`/${adType}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/${adType}/${category}`);
  };

  return (
    <div className="feed">
      <AdTypeButtons
        adTypes={adTypes}
        adType={adType}
        handleAdTypeClick={handleAdTypeClick}
        handleCategoryClick={handleCategoryClick}
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
