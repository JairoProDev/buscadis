'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClasificadoCard } from './ClasificadoCard';
import { DeleteDialog } from './DeleteDialog';
import { EditDialog } from './EditDialog';
import { fetchMisClasificados } from '@/lib/api';
import { ClasificadoBase } from '@buscadis/shared';

export function MisClasificadosList() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingClasificado, setEditingClasificado] = useState<ClasificadoBase | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['misClasificados'],
    queryFn: fetchMisClasificados
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los clasificados</div>;
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No tienes clasificados publicados
        </h3>
        <p className="mt-2 text-gray-500">
          Comienza publicando tu primer clasificado
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((clasificado) => (
          <ClasificadoCard
            key={clasificado.id}
            clasificado={clasificado}
            actions={
              <div className="flex gap-2 mt-4">
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditingClasificado(clasificado)}
                >
                  Editar
                </button>
                <button 
                  className="text-red-600 hover:underline"
                  onClick={() => setDeleteId(clasificado.id)}
                >
                  Eliminar
                </button>
              </div>
            }
          />
        ))}
      </div>

      {deleteId && (
        <DeleteDialog
          clasificadoId={deleteId}
          isOpen={true}
          onClose={() => setDeleteId(null)}
        />
      )}

      {editingClasificado && (
        <EditDialog
          clasificado={editingClasificado}
          isOpen={true}
          onClose={() => setEditingClasificado(null)}
        />
      )}
    </>
  );
} 