'use client';

import { useState } from 'react';

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold mb-6">Filtros</h3>
      
      {/* Categoría */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Categoría</label>
        <select className="w-full rounded-lg border-gray-200">
          <option value="">Todas las categorías</option>
          <option value="vehiculos">Vehículos</option>
          <option value="inmuebles">Inmuebles</option>
          <option value="empleos">Empleos</option>
          <option value="servicios">Servicios</option>
        </select>
      </div>

      {/* Ubicación */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Ubicación</label>
        <select className="w-full rounded-lg border-gray-200">
          <option value="">Todas las ubicaciones</option>
          <option value="lima">Lima</option>
          <option value="arequipa">Arequipa</option>
          <option value="trujillo">Trujillo</option>
        </select>
      </div>

      {/* Rango de Precio */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rango de Precio</label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 rounded-lg border-gray-200"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 rounded-lg border-gray-200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      {/* Botón Aplicar */}
      <button className="w-full bg-primary-600 text-white rounded-lg py-2 hover:bg-primary-700 transition-colors">
        Aplicar Filtros
      </button>
    </div>
  );
} 