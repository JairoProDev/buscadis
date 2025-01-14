'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          value={searchParams.get('tipo') || ''}
          onChange={(e) => router.push(`/?${createQueryString('tipo', e.target.value)}`)}
        >
          <option value="">Todos los tipos</option>
          <option value="empleos">Empleos</option>
          <option value="inmuebles">Inmuebles</option>
          <option value="vehiculos">Vehículos</option>
          <option value="servicios">Servicios</option>
          <option value="productos">Productos</option>
        </Select>

        <Input
          type="text"
          placeholder="Buscar..."
          value={searchParams.get('q') || ''}
          onChange={(e) => router.push(`/?${createQueryString('q', e.target.value)}`)}
        />

        <Select
          value={searchParams.get('ciudad') || ''}
          onChange={(e) => router.push(`/?${createQueryString('ciudad', e.target.value)}`)}
        >
          <option value="">Todas las ciudades</option>
          <option value="lima">Lima</option>
          <option value="arequipa">Arequipa</option>
          <option value="trujillo">Trujillo</option>
        </Select>

        <Select
          value={searchParams.get('orden') || 'reciente'}
          onChange={(e) => router.push(`/?${createQueryString('orden', e.target.value)}`)}
        >
          <option value="reciente">Más recientes</option>
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
        </Select>
      </div>
    </div>
  );
} 