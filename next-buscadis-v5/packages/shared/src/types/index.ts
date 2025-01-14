export type TipoClasificado = 
  | 'empleos'
  | 'inmuebles'
  | 'vehiculos'
  | 'servicios'
  | 'productos';

export interface Ubicacion {
  ciudad: string;
  distrito?: string;
  direccion?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

export interface Contacto {
  telefono?: string;
  whatsapp?: string;
  email?: string;
}

export interface Multimedia {
  imagenes: {
    original: string;
    thumbnail: string;
  }[];
  videos?: string[];
}

export interface Estadisticas {
  vistas: number;
  favoritos: number;
  compartidos: number;
}

export interface ClasificadoBase {
  id?: string;
  tipo: TipoClasificado;
  categoria: string;
  subCategoria: string;
  titulo: string;
  descripcion: string;
  ubicacion: Ubicacion;
  contacto: Contacto;
  multimedia: Multimedia;
  estadisticas: Estadisticas;
  estado: 'activo' | 'pendiente' | 'eliminado' | 'expirado';
  premium: boolean;
  usuarioId: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt: Date;
} 