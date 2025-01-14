import { z } from 'zod'

const contactoSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido').optional().nullable(),
  telefono: z.string().min(8, 'Teléfono inválido').optional().nullable(),
  whatsapp: z.string().min(8, 'WhatsApp inválido').optional().nullable(),
  mostrarEmail: z.boolean().default(false),
  mostrarTelefono: z.boolean().default(true),
  mostrarWhatsapp: z.boolean().default(true),
})

export const clasificadoSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  precio: z.string().or(z.number()).transform(val => typeof val === 'string' ? parseFloat(val) : val),
  moneda: z.enum(['USD', 'PYG']).default('USD'),
  categoria: z.string().min(1, 'Debes seleccionar una categoría'),
  subcategoria: z.string().optional(),
  condicion: z.enum(['nuevo', 'usado']).default('nuevo'),
  imagenes: z.array(z.string().url('URL de imagen inválida')).default([]),
  ubicacion: z.string().min(3, 'La ubicación debe tener al menos 3 caracteres'),
  ciudad: z.string().min(3, 'La ciudad debe tener al menos 3 caracteres'),
  estado: z.string().optional(),
  pais: z.string().default('Paraguay'),
  contacto: contactoSchema,
})

export type ClasificadoInput = z.infer<typeof clasificadoSchema> 