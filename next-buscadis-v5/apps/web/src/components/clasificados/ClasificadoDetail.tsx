'use client';

import Image from 'next/image';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { ClasificadoBase } from '@buscadis/shared';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ImageGallery } from '@/components/ui/image-gallery';
import { ContactInfo } from './ContactInfo';

interface Props {
  clasificado: ClasificadoBase;
}

export function ClasificadoDetail({ clasificado }: Props) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ImageGallery 
          images={clasificado.multimedia.imagenes.map(img => img.original)} 
          alt={clasificado.titulo}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{clasificado.titulo}</h1>
          
          <div className="flex items-center gap-4 text-gray-500 mb-6">
            <span>{clasificado.ubicacion.ciudad}</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(clasificado.createdAt!), { 
                locale: es, 
                addSuffix: true 
              })}
            </span>
            {clasificado.premium && (
              <>
                <span>•</span>
                <span className="text-yellow-500 font-semibold">Premium</span>
              </>
            )}
          </div>

          {clasificado.detalles.precio && (
            <div className="text-2xl font-bold text-primary mb-6">
              {formatPrice(
                clasificado.detalles.precio as number, 
                clasificado.detalles.moneda as string
              )}
            </div>
          )}

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
            <p className="whitespace-pre-line">{clasificado.descripcion}</p>
          </div>

          {Object.entries(clasificado.detalles)
            .filter(([key]) => !['precio', 'moneda'].includes(key))
            .map(([key, value]) => (
              <div key={key} className="mt-4">
                <span className="font-semibold capitalize">{key}: </span>
                <span>{value}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
          <Button 
            className="w-full mb-4"
            onClick={() => setShowContact(true)}
          >
            Contactar
          </Button>

          {showContact && (
            <ContactInfo 
              contacto={clasificado.contacto}
              onClose={() => setShowContact(false)}
            />
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Ubicación</h3>
            <p>{clasificado.ubicacion.ciudad}</p>
            {clasificado.ubicacion.distrito && (
              <p>{clasificado.ubicacion.distrito}</p>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>ID: {clasificado.id}</p>
            <p>Vistas: {clasificado.estadisticas.vistas}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 