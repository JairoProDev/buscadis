const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const adRoutes = require("./routes/adRoutes");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require('./routes/authRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const VisitorCount = require('./models/VisitorCount');
const adModel = require('./models/adModel');

// Verificar que las variables de entorno necesarias están definidas
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET || 
    !process.env.MONGODB_URI) {
  console.error("Por favor configura todas las variables de entorno necesarias.");
  process.exit(1);
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 5000;

if (!PORT) {
  console.error("El puerto no está definido.");
  process.exit(1);
}

// Middleware de seguridad
app.use(helmet()); // Protege la aplicación estableciendo varias cabeceras HTTP
app.set('trust proxy', 1); // Esto le dice a Express que confíe en el proxy
// Configuración personalizada de CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.google.com"],
      scriptSrc: ["'self'", "https://maps.googleapis.com", "https://www.googletagmanager.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "https://maps.googleapis.com", "https://maps.gstatic.com", "data:"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
    },
  })
);


// Limitador de solicitudes para prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 100 // Límite de 100 solicitudes por IP por ventana
});
app.use(limiter);

// Middleware común
app.use(cors());
app.use(express.json()); // Parsear solicitudes JSON

// Configurar morgan dependiendo del entorno
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common')); // Logs simples en producción
} else {
  app.use(morgan('dev')); // Logs detallados en desarrollo
}

// Contador para los intentos de conexión a la base de datos
let dbConnectionAttempts = 0;

// Función para conectar a la base de datos
const connectToDb = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);

      dbConnectionAttempts++;
      if (dbConnectionAttempts < 5) {
        console.log(`Reintentando conectar a MongoDB (Intento ${dbConnectionAttempts}/5)...`);
        setTimeout(connectToDb, 5000); // Reintenta después de 5 segundos
      } else {
        console.error("No se pudo conectar a MongoDB después de 5 intentos.");
        process.exit(1);
      }
    });
};

// Intenta conectar a la base de datos por primera vez
connectToDb();

// Rutas de la API
app.use("/api", adRoutes);
app.use("/api/images", imageRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/pdf", pdfRoutes);

// Contador de visitas
app.get('/visitorCount', async (req, res) => {
  try {
    let visitorCount = await VisitorCount.findOne();
    if (!visitorCount) {
      visitorCount = new VisitorCount();
    }
    visitorCount.count++;
    await visitorCount.save();
    res.json({ visitorCount: visitorCount.count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Contador de Avisos
app.get('/adCount', async (req, res) => {
  try {
    const adCount = await adModel.countDocuments();
    res.json({ adCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Servir archivos estáticos desde el cliente
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Manejar todas las demás rutas enviando el archivo index.html del frontend
app.get("*", (req, res) => {
  console.log(`Handling route: ${req.originalUrl}`);
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  console.error(`Ruta no encontrada: ${req.originalUrl}`);
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
