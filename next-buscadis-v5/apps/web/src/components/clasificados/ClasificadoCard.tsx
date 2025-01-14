import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Heart, MessageCircle, Eye } from 'lucide-react';

export function ClasificadoCard({ clasificado }) {
  return (
    <Link href={`/clasificados/${clasificado.id}`}>
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={clasificado.multimedia.imagenes[0] || '/placeholder.png'}
            alt={clasificado.titulo}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg line-clamp-2">{clasificado.titulo}</h3>
            <span className="text-lg font-bold text-primary-600">
              S/ {clasificado.precio}
            </span>
          </div>

          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {clasificado.descripcion}
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {clasificado.estadisticas.vistas}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {clasificado.estadisticas.mensajes}
              </span>
            </div>
            <time dateTime={clasificado.createdAt}>
              {formatDistanceToNow(new Date(clasificado.createdAt), { 
                locale: es,
                addSuffix: true 
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
} 