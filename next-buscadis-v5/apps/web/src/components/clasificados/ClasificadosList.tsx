'use client';

import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface Clasificado {
  id: string
  titulo: string
  precio: number
  imagen: string | null
  ubicacion: string
  descripcion: string
}

export function ClasificadosList() {
  const [clasificados, setClasificados] = useState<Clasificado[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClasificados() {
      try {
        const res = await fetch('/api/clasificados')
        const data = await res.json()
        setClasificados(data)
      } catch (error) {
        console.error('Error al cargar clasificados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClasificados()
  }, [])

  if (loading) {
    return <div>Cargando clasificados...</div>
  }

  if (!clasificados.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No hay clasificados publicados aún</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {clasificados.map((clasificado) => (
        <Link 
          key={clasificado.id}
          href={`/clasificados/${clasificado.id}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex gap-4 p-4">
              <div className="relative w-32 h-32">
                <Image
                  src={clasificado.imagen || '/placeholder.png'}
                  alt={clasificado.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 128px"
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{clasificado.titulo}</h3>
                <p className="text-primary-600 font-bold mb-2">
                  {formatPrice(clasificado.precio)}
                </p>
                <p className="text-sm text-gray-500 mb-2">{clasificado.ubicacion}</p>
                <p className="text-sm text-gray-600">{clasificado.descripcion}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 