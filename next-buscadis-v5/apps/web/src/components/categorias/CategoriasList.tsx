'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, Home, Car, Wrench, 
  Smartphone, Sofa, GraduationCap, 
  Plane, PartyPopper, Building2, 
  LucideIcon 
} from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: 'Empleos', icon: Briefcase, count: 2345, color: 'from-blue-500 to-blue-600' },
  { id: 2, nombre: 'Inmuebles', icon: Home, count: 1876, color: 'from-green-500 to-green-600' },
  { id: 3, nombre: 'Vehículos', icon: Car, count: 1234, color: 'from-red-500 to-red-600' },
  { id: 4, nombre: 'Servicios', icon: Wrench, count: 890, color: 'from-purple-500 to-purple-600' },
  { id: 5, nombre: 'Productos', icon: Smartphone, count: 765, color: 'from-yellow-500 to-yellow-600' },
  { id: 6, nombre: 'Hogar', icon: Sofa, count: 654, color: 'from-pink-500 to-pink-600' },
  { id: 7, nombre: 'Educación', icon: GraduationCap, count: 543, color: 'from-indigo-500 to-indigo-600' },
  { id: 8, nombre: 'Turismo', icon: Plane, count: 432, color: 'from-cyan-500 to-cyan-600' },
  { id: 9, nombre: 'Eventos', icon: PartyPopper, count: 321, color: 'from-orange-500 to-orange-600' },
  { id: 10, nombre: 'Negocios', icon: Building2, count: 210, color: 'from-teal-500 to-teal-600' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategoriasList() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {CATEGORIAS.map((categoria) => {
        const IconComponent = categoria.icon;
        return (
          <motion.div
            key={categoria.id}
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-px shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${categoria.color} opacity-75 transition-opacity group-hover:opacity-100`} />
            <div className="relative flex flex-col items-center bg-white p-6 dark:bg-gray-900">
              <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-3 dark:from-gray-800 dark:to-gray-700">
                <IconComponent className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                {categoria.nombre}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {categoria.count.toLocaleString()} anuncios
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}