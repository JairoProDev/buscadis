// SubCategoryList.js
import React from 'react';

const SubCategoryList = () => {
  const subcategories = {
    'Empleos': ['Turismo', 'Restaurantes', 'Hotelería', 'Ventas'],
    'Inmuebles': ['Habitaciones', 'Departamentos', 'Casas'],
    'Vehículos': ['Autos', 'Camionetas', 'Motos'],
    'Servicios': ['Educación', 'Reparaciones', 'Salud'],
    'Productos': ['Tecnología', 'Ropa', 'Hogar']
  };

  return (
    <div className="subcategories-nav">
      {Object.entries(subcategories).map(([category, subs]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {subs.map(sub => <li key={sub}>{sub}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryList;
