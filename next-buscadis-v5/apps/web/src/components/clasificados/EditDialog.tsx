'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PublicarForm } from './PublicarForm';
import { ClasificadoBase } from '@buscadis/shared';

interface Props {
  clasificado: ClasificadoBase;
  isOpen: boolean;
  onClose: () => void;
}

export function EditDialog({ clasificado, isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">
            Editar Clasificado
          </h2>
          <PublicarForm 
            initialData={clasificado}
            onSuccess={onClose}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 