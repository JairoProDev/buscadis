import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClasificado, updateClasificado, deleteClasificado } from '@/lib/api';
import { toast } from 'react-hot-toast';

export function useClasificados() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createClasificado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['misClasificados'] });
      toast.success('Clasificado publicado exitosamente');
    },
    onError: () => {
      toast.error('Error al publicar el clasificado');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      updateClasificado(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['misClasificados'] });
      toast.success('Clasificado actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el clasificado');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClasificado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['misClasificados'] });
      toast.success('Clasificado eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el clasificado');
    }
  });

  return {
    createClasificado: createMutation.mutate,
    updateClasificado: updateMutation.mutate,
    deleteClasificado: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
} 