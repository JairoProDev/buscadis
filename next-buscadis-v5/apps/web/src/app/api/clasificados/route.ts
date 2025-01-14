import { clasificadoSchema } from '@/types/clasificado'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const data = clasificadoSchema.parse(json)
    
    const clasificado = await prisma.clasificado.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio: data.precio,
        ubicacion: data.ubicacion,
        imagen: data.imagen,
      },
    })

    return NextResponse.json(clasificado)
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify({
        error: 'Datos inválidos',
        details: error.errors,
      }), { status: 400 })
    }
    
    console.error('Error al crear clasificado:', error)
    return new NextResponse('Error al crear el clasificado', { status: 500 })
  }
}

export async function GET() {
  try {
    const clasificados = await prisma.clasificado.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(clasificados);
  } catch (error) {
    console.error('Error al obtener clasificados:', error);
    return new NextResponse('Error al obtener clasificados', { status: 500 });
  }
} 