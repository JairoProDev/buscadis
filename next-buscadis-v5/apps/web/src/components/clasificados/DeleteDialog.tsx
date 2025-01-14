'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useClasificados } from '@/hooks/useClasificados';

interface Props {
  clasificadoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteDialog({ clasificadoId, isOpen, onClose }: Props) {
  const { deleteClasificado, isLoading } = useClasificados();

  const handleDelete = async () => {
    await deleteClasificado(clasificadoId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            ¿Estás seguro de eliminar este clasificado?
          </h2>
          <p className="text-gray-500 mb-6">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 