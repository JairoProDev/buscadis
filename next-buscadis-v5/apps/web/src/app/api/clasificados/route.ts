import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extraer los datos del FormData
    const tipo = formData.get('tipo') as string;
    const titulo = formData.get('titulo') as string;
    const descripcion = formData.get('descripcion') as string;
    const precio = formData.get('precio') ? Number(formData.get('precio')) : null;
    const moneda = formData.get('moneda') as string;
    const ciudad = formData.get('ciudad') as string;
    const telefono = formData.get('telefono') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const email = formData.get('email') as string;

    // Por ahora, guardamos sin imágenes
    const clasificado = await prisma.clasificado.create({
      data: {
        tipo,
        titulo,
        descripcion,
        precio,
        moneda,
        ciudad,
        telefono,
        whatsapp,
        email,
        imagenes: [], // Implementaremos la subida de imágenes después
      },
    });

    return NextResponse.json(clasificado, { status: 201 });
  } catch (error) {
    console.error('Error al crear clasificado:', error);
    return NextResponse.json(
      { message: 'Error al crear el clasificado' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { message: 'Error al obtener los clasificados' },
      { status: 500 }
    );
  }
} 