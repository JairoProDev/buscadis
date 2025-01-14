import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario de prueba
  const usuario = await prisma.usuario.create({
    data: {
      email: 'test@example.com',
      password: await hash('123456', 10),
      nombre: 'Usuario Prueba',
    },
  });

  // Crear clasificado de prueba
  await prisma.clasificado.create({
    data: {
      titulo: 'Se busca programador React',
      descripcion: 'Empresa busca desarrollador React con 2 años de experiencia',
      precio: 2500,
      tipo: 'empleos',
      categoria: 'tecnologia',
      imagenes: ['https://ejemplo.com/imagen.jpg'],
      contacto: {
        telefono: '123456789',
        email: 'empresa@example.com'
      },
      ubicacion: 'Cusco',
      usuarioId: usuario.id
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 