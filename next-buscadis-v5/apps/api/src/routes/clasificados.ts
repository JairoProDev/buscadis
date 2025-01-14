import express from 'express';
import { getClasificados, createClasificado, updateClasificado } from '../controllers/clasificados.controller';
import { upload } from '../middleware/upload';

const router = express.Router();

// Rutas públicas
router.get('/', getClasificados);
router.get('/:id', getClasificados);

// Rutas que requieren autenticación
router.post('/', upload.array('imagenes', 10), createClasificado);
router.put('/:id', upload.array('imagenes', 10), updateClasificado);

export const clasificadosRouter = router; 