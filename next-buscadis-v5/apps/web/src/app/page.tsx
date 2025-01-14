import { Suspense } from 'react';
import { ClasificadosList } from '@/components/clasificados/ClasificadosList';
import { CategoriasList } from '@/components/categorias/CategoriasList';
import { FeaturedClasificados } from '@/components/clasificados/FeaturedClasificados';
import { SearchFilters } from '@/components/search/SearchFilters';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Encuentra lo que buscas en Buscadis
            </h1>
            <p className="text-xl mb-8">
              La plataforma líder de clasificados en línea
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full max-w-lg px-6 py-3 rounded-l-lg text-gray-900"
              />
              <button className="bg-primary-500 hover:bg-primary-600 px-8 py-3 rounded-r-lg font-semibold transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Categorías Populares</h2>
          <Suspense fallback={<div>Cargando categorías...</div>}>
            <CategoriasList />
          </Suspense>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Anuncios Destacados</h2>
          <Suspense fallback={<div>Cargando anuncios destacados...</div>}>
            <FeaturedClasificados />
          </Suspense>
        </div>
      </section>

      {/* Main Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-1/4">
              <SearchFilters />
            </div>
            
            {/* Listings */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-bold mb-8">Clasificados Recientes</h2>
              <Suspense fallback={<div>Cargando clasificados...</div>}>
                <ClasificadosList />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
