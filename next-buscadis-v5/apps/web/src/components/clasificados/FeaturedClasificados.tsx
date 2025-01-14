'use client';

import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Clasificado {
  id: string;
  titulo: string;
  precio: number;
  imagen: string;
  ubicacion: string;
}

const FEATURED_CLASIFICADOS: Clasificado[] = [
  {
    id: '1',
    titulo: 'iPhone 13 Pro Max',
    precio: 4500,
    imagen: '/placeholder.png',
    ubicacion: 'Lima'
  },
  {
    id: '2',
    titulo: 'MacBook Pro 2023',
    precio: 7800,
    imagen: '/placeholder.png',
    ubicacion: 'Arequipa'
  },
  {
    id: '3',
    titulo: 'PlayStation 5',
    precio: 2800,
    imagen: '/placeholder.png',
    ubicacion: 'Trujillo'
  }
];

export function FeaturedClasificados() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURED_CLASIFICADOS.map((clasificado) => (
        <Link 
          key={clasificado.id}
          href={`/clasificados/${clasificado.id}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={clasificado.imagen}
                alt={clasificado.titulo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{clasificado.titulo}</h3>
              <p className="text-primary-600 font-bold mb-2">
                {formatPrice(clasificado.precio)}
              </p>
              <p className="text-sm text-gray-500">{clasificado.ubicacion}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
