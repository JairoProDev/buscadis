// CategoryList.js
import React from 'react';

const CategoryList = () => {
  const categories = {
    'Empleos': ['Turismo', 'Restaurantes', 'Hotelería', 'Ventas'],
    'Inmuebles': ['Habitaciones', 'Departamentos', 'Casas'],
    'Vehículos': ['Autos', 'Camionetas', 'Motos'],
    'Servicios': ['Educación', 'Reparaciones', 'Salud'],
    'Productos': ['Tecnología', 'Ropa', 'Hogar']
  };

  return (
    <div className="categories-nav">
      {Object.entries(categories).map(([adType, subs]) => (
        <div key={adType}>
          <h3>{adType}</h3>
          <ul>
            {subs.map(sub => <li key={sub}>{sub}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
