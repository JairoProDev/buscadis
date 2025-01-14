import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ClasificadoDetail } from '@/components/clasificados/ClasificadoDetail';
import { LoadingDetail } from '@/components/ui/loading';
import { fetchClasificadoById } from '@/lib/api';

interface Props {
  params: {
    id: string;
  };
}

export default async function ClasificadoPage({ params }: Props) {
  try {
    const clasificado = await fetchClasificadoById(params.id);

    return (
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingDetail />}>
          <ClasificadoDetail clasificado={clasificado} />
        </Suspense>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 