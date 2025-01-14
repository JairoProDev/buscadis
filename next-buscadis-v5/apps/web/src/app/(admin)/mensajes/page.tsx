import { Suspense } from 'react';
import { MensajesList } from '@/components/mensajes/MensajesList';
import { LoadingMessages } from '@/components/ui/loading';

export default function MensajesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mensajes</h1>
      
      <Suspense fallback={<LoadingMessages />}>
        <MensajesList />
      </Suspense>
    </div>
  );
} 