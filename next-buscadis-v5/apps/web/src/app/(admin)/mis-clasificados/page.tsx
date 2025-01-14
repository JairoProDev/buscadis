import { Suspense } from 'react';
import { MisClasificadosList } from '@/components/clasificados/MisClasificadosList';
import { LoadingClassifieds } from '@/components/ui/loading';

export default function MisClasificadosPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Clasificados</h1>
      </div>

      <Suspense fallback={<LoadingClassifieds />}>
        <MisClasificadosList />
      </Suspense>
    </div>
  );
} 