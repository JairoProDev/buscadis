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
  { id: 1, nombre: 'Empleos', icon: Briefcase, count: 2345, color: 'from-blue-400 to-blue-500' },
  { id: 2, nombre: 'Inmuebles', icon: Home, count: 1876, color: 'from-green-400 to-green-500' },
  { id: 3, nombre: 'Vehículos', icon: Car, count: 1234, color: 'from-red-400 to-red-500' },
  { id: 4, nombre: 'Servicios', icon: Wrench, count: 890, color: 'from-purple-400 to-purple-500' },
  { id: 5, nombre: 'Productos', icon: Smartphone, count: 765, color: 'from-yellow-400 to-yellow-500' },
  { id: 6, nombre: 'Hogar', icon: Sofa, count: 654, color: 'from-pink-400 to-pink-500' },
  { id: 7, nombre: 'Educación', icon: GraduationCap, count: 543, color: 'from-indigo-400 to-indigo-500' },
  { id: 8, nombre: 'Turismo', icon: Plane, count: 432, color: 'from-cyan-400 to-cyan-500' },
  { id: 9, nombre: 'Eventos', icon: PartyPopper, count: 321, color: 'from-orange-400 to-orange-500' },
  { id: 10, nombre: 'Negocios', icon: Building2, count: 210, color: 'from-teal-400 to-teal-500' },
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
            className="group relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br p-px shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${categoria.color} opacity-85 transition-opacity group-hover:opacity-100`} />
            <div className="relative flex flex-col items-center justify-center h-full bg-white/90">
              <div className="rounded-full bg-white/80 p-4 shadow-md">
                <IconComponent className="h-10 w-10 text-gray-800" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                {categoria.nombre}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {categoria.count.toLocaleString()} anuncios
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}