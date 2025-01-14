export interface CustomError extends Error {
  status?: number;
}

export interface ClasificadoBase {
  tipo: string;
  categoria: string;
  subCategoria?: string;
  titulo: string;
  descripcion: string;
  precio?: number;
  ubicacion?: {
    ciudad: string;
    direccion?: string;
  };
  contacto: {
    telefono?: string;
    email?: string;
    whatsapp?: string;
  };
}