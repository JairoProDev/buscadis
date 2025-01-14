import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@buscadis/database';
import { clasificadosRouter } from './routes/clasificados';
import { usuariosRouter } from './routes/usuarios';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/clasificados', clasificadosRouter);

// Rutas protegidas
app.use('/api/usuarios', authMiddleware, usuariosRouter);

// Manejador de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log('📦 Conexión a la base de datos establecida');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

bootstrap();