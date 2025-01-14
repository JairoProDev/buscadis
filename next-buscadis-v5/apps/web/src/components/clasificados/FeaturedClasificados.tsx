'use client';

import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Verified, MapPin, Star } from 'lucide-react';

interface Clasificado {
  id: string;
  titulo: string;
  precio: number;
  imagen: string;
  ubicacion: string;
  vendedor: {
    nombre: string;
    avatar: string;
    verificado: boolean;
    rating: number;
  };
  etiquetas: string[];
  destacado: boolean;
}

const FEATURED_CLASIFICADOS: Clasificado[] = [
  {
    id: '1',
    titulo: 'iPhone 14 Pro Max - 256GB',
    precio: 4500,
    imagen: '/productos/iphone.jpg',
    ubicacion: 'Lima',
    vendedor: {
      nombre: 'Tech Store Premium',
      avatar: '/avatars/store1.jpg',
      verificado: true,
      rating: 4.8
    },
    etiquetas: ['Nuevo', 'Garantía', 'Envío Gratis'],
    destacado: true
  },
  // Añade más clasificados aquí...
];

export function FeaturedClasificados() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {FEATURED_CLASIFICADOS.map((clasificado) => (
        <Link
          key={clasificado.id}
          href={`/clasificados/${clasificado.id}`}
          className="group"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={clasificado.imagen}
                  alt={clasificado.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              {clasificado.destacado && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Destacado
                </Badge>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Avatar src={clasificado.vendedor.avatar} alt={clasificado.vendedor.nombre} />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">
                      {clasificado.vendedor.nombre}
                    </span>
                    {clasificado.vendedor.verificado && (
                      <Verified className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{clasificado.vendedor.rating}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {clasificado.titulo}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{clasificado.ubicacion}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {clasificado.etiquetas.map((etiqueta) => (
                  <Badge key={etiqueta} variant="secondary">
                    {etiqueta}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary-600">
                  {formatPrice(clasificado.precio)}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Ver Detalles
                </motion.button>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </motion.div>
  );
}
