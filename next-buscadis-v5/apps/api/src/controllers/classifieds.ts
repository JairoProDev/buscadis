import { Request, Response } from 'express';
import { PrismaClient } from '@buscadis/database';
import { uploadToS3 } from '../utils/s3';
import { optimizeImage } from '../utils/images';
import { ClasificadoBase } from '../types';

const prisma = new PrismaClient();

export async function getClasificados(req: Request, res: Response) {
  const {
    tipo,
    categoria,
    subCategoria,
    ciudad,
    page = 1,
    limit = 20,
    orden = 'reciente'
  } = req.query;

  try {
    const skip = (Number(page) - 1) * Number(limit);
    
    const where = {
      ...(tipo && { tipo: String(tipo) }),
      ...(categoria && { categoria: String(categoria) }),
      ...(subCategoria && { subCategoria: String(subCategoria) }),
      ...(ciudad && { 'ubicacion.ciudad': String(ciudad) }),
      estado: 'activo'
    };

    const [clasificados, total] = await Promise.all([
      prisma.clasificado.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
          ...(orden === 'reciente' && { createdAt: 'desc' }),
          ...(orden === 'precio' && { 'detalles.precio': 'asc' })
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
      clasificados,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener clasificados:', error);
    res.status(500).json({ error: 'Error al obtener clasificados' });
  }
}

export async function createClasificado(req: Request, res: Response) {
  const clasificadoData = req.body;
  const files = req.files as Express.Multer.File[];

  try {
    // Procesar y subir imágenes
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const optimizedImage = await optimizeImage(file.buffer);
        return await uploadToS3(optimizedImage, `clasificados/${Date.now()}-${file.originalname}`);
      })
    );

    const clasificado = await prisma.clasificado.create({
      data: {
        ...clasificadoData,
        multimedia: {
          imagenes: imageUrls
        },
        usuarioId: req.user.id // From auth middleware
      }
    });

    res.status(201).json(clasificado);
  } catch (error) {
    console.error('Error al crear clasificado:', error);
    res.status(500).json({ error: 'Error al crear clasificado' });
  }
}