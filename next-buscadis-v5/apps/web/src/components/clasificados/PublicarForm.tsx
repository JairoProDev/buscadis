'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';

// Definir el esquema de validación
const clasificadoSchema = z.object({
  tipo: z.enum(['empleos', 'inmuebles', 'vehiculos', 'servicios', 'productos']),
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  precio: z.string().optional(),
  moneda: z.enum(['PEN', 'USD']).optional(),
  ciudad: z.string().min(1, 'Seleccione una ciudad'),
  telefono: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
});

type FormData = z.infer<typeof clasificadoSchema>;

export function PublicarForm() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(clasificadoSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      
      // Agregar los datos del formulario
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, String(value));
      });

      // Agregar las imágenes
      images.forEach((image, index) => {
        formData.append(`imagenes`, image);
      });

      const response = await fetch('/api/clasificados', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al publicar el clasificado');
      }

      router.push('/');
      router.refresh();
      
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error al publicar el clasificado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Tipo de Clasificado</label>
        <Select {...register('tipo')}>
          <option value="">Seleccione un tipo</option>
          <option value="empleos">Empleos</option>
          <option value="inmuebles">Inmuebles</option>
          <option value="vehiculos">Vehículos</option>
          <option value="servicios">Servicios</option>
          <option value="productos">Productos</option>
        </Select>
        {errors.tipo && (
          <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Título</label>
        <Input {...register('titulo')} />
        {errors.titulo && (
          <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descripción</label>
        <Textarea {...register('descripcion')} rows={5} />
        {errors.descripcion && (
          <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Imágenes</label>
        <ImageUpload
          value={images}
          onChange={setImages}
          maxFiles={10}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Precio</label>
          <Input {...register('precio')} type="number" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Moneda</label>
          <Select {...register('moneda')}>
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ciudad</label>
        <Select {...register('ciudad')}>
          <option value="">Seleccione una ciudad</option>
          <option value="lima">Lima</option>
          <option value="arequipa">Arequipa</option>
          <option value="trujillo">Trujillo</option>
        </Select>
        {errors.ciudad && (
          <p className="text-red-500 text-sm mt-1">{errors.ciudad.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <Input {...register('telefono')} type="tel" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">WhatsApp</label>
          <Input {...register('whatsapp')} type="tel" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input {...register('email')} type="email" />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Publicando...
          </>
        ) : (
          'Publicar Clasificado'
        )}
      </Button>
    </form>
  );
} 