const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

const cloudinary = require("cloudinary").v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const express = require("express");
const mongoose = require("mongoose");
const adRoutes = require("./routes/adRoutes");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require('./routes/authRoutes');
const expressJwt = require('express-jwt');
const VisitorCount = require('./models/VisitorCount');
const adModel = require('./models/adModel');

console.log(expressJwt);

// Inicializar la aplicación
const app = express();
// Establecer el puerto en el que se ejecutará la aplicación
const PORT = process.env.PORT || 5000;
// Usar middleware para permitir solicitudes CORS
app.use(cors());
// Usar middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());
// Usar las rutas de imágenes
app.use("/api/images", imageRoutes);

const pdfRoutes = require('./routes/pdfRoutes')
// Contador para los intentos de conexión a la base de datos
let dbConnectionAttempts = 0;

// Función para conectar a la base de datos
const connectToDb = () => {
  // Intenta conectar a MongoDB
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // Si la conexión es exitosa, registra un mensaje en la consola
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      // Si la conexión falla, registra el error
      console.error("Error connecting to MongoDB", err);

      // Incrementa el contador de intentos de conexión
      dbConnectionAttempts++;

      // Si hemos intentado conectar menos de 5 veces...
      if (dbConnectionAttempts < 5) {
        // ... intenta conectar de nuevo después de 5 segundos
        setTimeout(connectToDb, 5000);
      } else {
        // Si hemos intentado conectar 5 veces y todas han fallado, detén la aplicación
        process.exit(1);
      }
    });
};

// Intenta conectar a la base de datos por primera vez
connectToDb();

// Usar las rutas de la API
app.use("/api", adRoutes);
app.use('/api/auth', authRoutes);

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

// Usar middleware para servir archivos estáticos
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Manejar todas las demás rutas enviando el archivo index.html
app.get("*", (req, res) => {
  console.log(`Handling route: ${req.originalUrl}`);
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res
  .status(err.status || 500)
  .json({ error: err.message || "Error interno del servidor" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Usar la ruta de generación de PDF
app.use("/api/pdf", pdfRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
