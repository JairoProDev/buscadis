import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomError } from '../utils/errors';

const clasificadoSchema = z.object({
  tipo: z.enum(['empleos', 'inmuebles', 'vehiculos', 'servicios', 'productos']),
  categoria: z.string().min(1),
  subCategoria: z.string().min(1),
  titulo: z.string().min(5).max(100),
  descripcion: z.string().min(20).max(2000),
  ubicacion: z.object({
    ciudad: z.string(),
    distrito: z.string().optional(),
    direccion: z.string().optional(),
    coordenadas: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }),
  contacto: z.object({
    telefono: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().email().optional()
  }).refine(data => 
    data.telefono || data.whatsapp || data.email, 
    { message: "Al menos un método de contacto es requerido" }
  ),
  detalles: z.record(z.unknown()),
  precio: z.number().optional(),
  moneda: z.enum(['PEN', 'USD']).optional()
});

export const validateClasificado = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = clasificadoSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new CustomError('Datos de clasificado inválidos', 400, error.errors);
    }
    next(error);
  }
}; 