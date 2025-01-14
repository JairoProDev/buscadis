import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { CustomError } from '../utils/errors';
import { ZodError } from 'zod';
import { MulterError } from 'multer';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });

  // Errores personalizados
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details
    });
  }

  // Errores de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'Conflicto de datos únicos',
          details: error.meta?.target
        });
      case 'P2025':
        return res.status(404).json({
          error: 'Registro no encontrado'
        });
      default:
        return res.status(500).json({
          error: 'Error de base de datos',
          code: error.code
        });
    }
  }

  // Errores de validación Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Error de validación',
      details: error.errors
    });
  }

  // Errores de Multer (subida de archivos)
  if (error instanceof MulterError) {
    return res.status(400).json({
      error: 'Error en la subida de archivos',
      details: error.message
    });
  }

  // Error por defecto
  res.status(500).json({
    error: 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}; 