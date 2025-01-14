import { prisma } from './prisma'

export async function searchClasificados(params: {
  query?: string
  categoria?: string
  ubicacion?: string
  precioMin?: number
  precioMax?: number
  ordenar?: 'reciente' | 'precio_asc' | 'precio_desc'
}) {
  const where = {
    OR: params.query
      ? [
          { titulo: { contains: params.query, mode: 'insensitive' } },
          { descripcion: { contains: params.query, mode: 'insensitive' } },
        ]
      : undefined,
    categoria: params.categoria ? { equals: params.categoria } : undefined,
    ubicacion: params.ubicacion ? { equals: params.ubicacion } : undefined,
    precio: {
      gte: params.precioMin,
      lte: params.precioMax,
    },
  }

  const orderBy = {
    createdAt: params.ordenar === 'reciente' ? 'desc' : undefined,
    precio:
      params.ordenar === 'precio_asc'
        ? 'asc'
        : params.ordenar === 'precio_desc'
        ? 'desc'
        : undefined,
  }

  return await prisma.clasificado.findMany({
    where,
    orderBy,
    include: {
      usuario: true,
      categoria: true,
    },
  })
} 