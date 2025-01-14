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
        precio: parseFloat(data.precio),
        moneda: data.moneda,
        categoria: data.categoria,
        subcategoria: data.subcategoria,
        condicion: data.condicion,
        imagenes: data.imagenes,
        ubicacion: data.ubicacion,
        ciudad: data.ciudad,
        estado: data.estado,
        pais: data.pais,
        contacto: {
          create: {
            nombre: data.contacto.nombre,
            email: data.contacto.email,
            telefono: data.contacto.telefono,
            whatsapp: data.contacto.whatsapp,
            mostrarEmail: data.contacto.mostrarEmail,
            mostrarTelefono: data.contacto.mostrarTelefono,
            mostrarWhatsapp: data.contacto.mostrarWhatsapp,
          }
        }
      },
      include: {
        contacto: true
      }
    })

    return NextResponse.json(clasificado)
  } catch (error) {
    console.error('Error al crear clasificado:', error)
    
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify({
        error: 'Datos inválidos',
        details: error.errors,
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    return new NextResponse(JSON.stringify({
      error: 'Error al crear el clasificado',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoria = searchParams.get('categoria')
    const ciudad = searchParams.get('ciudad')
    const precio_min = searchParams.get('precio_min')
    const precio_max = searchParams.get('precio_max')
    
    const where = {
      ...(categoria && { categoria }),
      ...(ciudad && { ciudad }),
      ...(precio_min || precio_max) && {
        precio: {
          ...(precio_min && { gte: parseFloat(precio_min) }),
          ...(precio_max && { lte: parseFloat(precio_max) }),
        },
      },
      estado_publicacion: 'activo'
    }

    const clasificados = await prisma.clasificado.findMany({
      where,
      include: {
        contacto: true
      },
      orderBy: [
        { destacado: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 50
    })

    return NextResponse.json(clasificados)
  } catch (error) {
    console.error('Error al obtener clasificados:', error)
    return new NextResponse(JSON.stringify({
      error: 'Error al obtener clasificados',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 