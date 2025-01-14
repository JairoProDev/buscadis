import { Suspense } from 'react';
import { FavoritosList } from '@/components/clasificados/FavoritosList';
import { LoadingClassifieds } from '@/components/ui/loading';

export default function FavoritosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>
      
      <Suspense fallback={<LoadingClassifieds />}>
        <FavoritosList />
      </Suspense>
    </div>
  );
} 