'use client';

import { useQuery } from '@tanstack/react-query';
import { ClasificadoCard } from './ClasificadoCard';
import { fetchFavoritos } from '@/lib/api';

export function FavoritosList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['favoritos'],
    queryFn: fetchFavoritos
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los favoritos</div>;
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No tienes clasificados favoritos
        </h3>
        <p className="mt-2 text-gray-500">
          Marca como favorito los clasificados que te interesen
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((clasificado) => (
        <ClasificadoCard
          key={clasificado.id}
          clasificado={clasificado}
          showFavoriteButton
        />
      ))}
    </div>
  );
} 