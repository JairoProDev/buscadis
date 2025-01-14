import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToCloudinary } from '../utils/cloudinary';
import { CustomError } from '../utils/errors';

const prisma = new PrismaClient();

export const getClasificados = async (req: Request, res: Response) => {
  try {
    const {
      tipo,
      categoria,
      subCategoria,
      ciudad,
      page = 1,
      limit = 20,
      orden = 'reciente'
    } = req.query;

    const where = {
      ...(tipo && { tipo: String(tipo) }),
      ...(categoria && { categoria: String(categoria) }),
      ...(subCategoria && { subCategoria: String(subCategoria) }),
      ...(ciudad && { 'ubicacion': { path: ['ciudad'], equals: String(ciudad) } }),
      estado: 'activo'
    };

    const [clasificados, total] = await Promise.all([
      prisma.clasificado.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
          ...(orden === 'reciente' && { createdAt: 'desc' }),
          ...(orden === 'precio' && { 'detalles': { path: ['precio'], sort: 'asc' } })
        },
        include: {
          usuario: {
            select: {
              nombre: true,
              avatar: true,
              verificado: true
            }
          }
        }
      }),
      prisma.clasificado.count({ where })
    ]);

    res.json({
      data: clasificados,
      meta: {
        total,
        pagina: Number(page),
        porPagina: Number(limit),
        paginas: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    throw new CustomError('Error al obtener clasificados', 500, error);
  }
};

export const createClasificado = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const clasificadoData = req.body;

    // Subir imágenes a Cloudinary
    const imageUrls = await Promise.all(
      files.map(file => uploadToCloudinary(file.path))
    );

    const clasificado = await prisma.clasificado.create({
      data: {
        ...clasificadoData,
        multimedia: {
          imagenes: imageUrls
        },
        usuarioId: req.user.id,
        estado: 'activo',
        estadisticas: {
          vistas: 0,
          favoritos: 0,
          compartidos: 0
        },
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
      }
    });

    res.status(201).json(clasificado);
  } catch (error) {
    throw new CustomError('Error al crear clasificado', 500, error);
  }
};

export const updateClasificado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    const clasificadoData = req.body;

    // Verificar propiedad del clasificado
    const clasificadoExistente = await prisma.clasificado.findUnique({
      where: { id }
    });

    if (!clasificadoExistente) {
      throw new CustomError('Clasificado no encontrado', 404);
    }

    if (clasificadoExistente.usuarioId !== req.user.id) {
      throw new CustomError('No autorizado para editar este clasificado', 403);
    }

    // Procesar nuevas imágenes si las hay
    let imageUrls = clasificadoExistente.multimedia.imagenes as string[];
    if (files.length > 0) {
      const nuevasUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file.path))
      );
      imageUrls = [...imageUrls, ...nuevasUrls];
    }

    const clasificadoActualizado = await prisma.clasificado.update({
      where: { id },
      data: {
        ...clasificadoData,
        multimedia: {
          imagenes: imageUrls
        }
      }
    });

    res.json(clasificadoActualizado);
  } catch (error) {
    throw new CustomError('Error al actualizar clasificado', 500, error);
  }
};

export const deleteClasificado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar propiedad
    const clasificado = await prisma.clasificado.findUnique({
      where: { id }
    });

    if (!clasificado) {
      throw new CustomError('Clasificado no encontrado', 404);
    }

    if (clasificado.usuarioId !== req.user.id) {
      throw new CustomError('No autorizado para eliminar este clasificado', 403);
    }

    // Soft delete
    await prisma.clasificado.update({
      where: { id },
      data: { estado: 'eliminado' }
    });

    res.json({ message: 'Clasificado eliminado correctamente' });
  } catch (error) {
    throw new CustomError('Error al eliminar clasificado', 500, error);
  }
}; 