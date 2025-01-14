'use client';

import { useQuery } from '@tanstack/react-query';
import { MensajeItem } from './MensajeItem';
import { fetchMensajes } from '@/lib/api';

export function MensajesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mensajes'],
    queryFn: fetchMensajes
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los mensajes</div>;
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No tienes mensajes
        </h3>
        <p className="mt-2 text-gray-500">
          Los mensajes de tus clasificados aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((mensaje) => (
        <MensajeItem key={mensaje.id} mensaje={mensaje} />
      ))}
    </div>
  );
} 