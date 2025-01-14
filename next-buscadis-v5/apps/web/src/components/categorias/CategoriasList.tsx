'use client';

import { 
  Car, 
  Home, 
  Briefcase, 
  Wrench, 
  Smartphone, 
  Sofa,
  LucideIcon 
} from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
  icon: LucideIcon;
  count: number;
}

const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: 'Empleos', icon: Briefcase, count: 2345 },
  { id: 2, nombre: 'Inmuebles', icon: Home, count: 1876 },
  { id: 3, nombre: 'Vehículos', icon: Car, count: 1234 },
  { id: 4, nombre: 'Servicios', icon: Wrench, count: 890 },
  { id: 5, nombre: 'Productos', icon: Smartphone, count: 765 },
  { id: 6, nombre: 'Mascotas', icon: Sofa, count: 654 },
  { id: 7, nombre: 'Educación', icon: Briefcase, count: 543 },
  { id: 8, nombre: 'Turismo', icon: Home, count: 432 },
  { id: 9, nombre: 'Eventos', icon: Wrench, count: 321 },
  { id: 10, nombre: 'Negocios', icon: Briefcase, count: 210 },
];

export function CategoriasList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {CATEGORIAS.map((categoria) => {
        const IconComponent = categoria.icon;
        return (
          <div
            key={categoria.id}
            className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary-600" />
            <h3 className="font-semibold mb-2">{categoria.nombre}</h3>
            <p className="text-sm text-gray-500">{categoria.count} anuncios</p>
          </div>
        );
      })}
    </div>
  );
} 