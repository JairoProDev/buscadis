import { z } from 'zod'

export const clasificadoSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  precio: z.string().transform((val) => parseFloat(val)),
  ubicacion: z.string().min(3, 'La ubicación debe tener al menos 3 caracteres'),
  imagen: z.string().url().optional().nullable(),
})

export type ClasificadoInput = z.infer<typeof clasificadoSchema> 