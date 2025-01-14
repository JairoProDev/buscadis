import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ClasificadoPage({
  params,
}: {
  params: { id: string }
}) {
  const clasificado = await prisma.clasificado.findUnique({
    where: { id: params.id },
  })

  if (!clasificado) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-96">
          <Image
            src={clasificado.imagen || '/placeholder.png'}
            alt={clasificado.titulo}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{clasificado.titulo}</h1>
          <p className="text-2xl font-bold text-primary-600 mb-4">
            {formatPrice(clasificado.precio)}
          </p>
          <p className="text-gray-600 mb-4">{clasificado.descripcion}</p>
          <div className="flex items-center text-gray-500">
            <span>📍 {clasificado.ubicacion}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 