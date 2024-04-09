// Importar las dependenc// Importar las dependencias necesarias
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}
const cloudinary = require("cloudinary").v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const adRoutes = require("./routes/adRoutes");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require('./routes/authRoutes');
const expressJwt = require('express-jwt');
console.log(expressJwt);
// const authenticateToken = require('./middlewares/authenticateToken');
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Este es el archivo principal de nuestra aplicación Express.js, app.js. Aquí es donde configuramos nuestra aplicación y definimos nuestras rutas.

// Primero, verificamos si estamos en un entorno de desarrollo. Si es así, utilizamos el módulo dotenv para cargar nuestras variables de entorno desde el archivo .env.

// Luego, importamos y configuramos cloudinary, que es el servicio que utilizamos para almacenar y servir imágenes. Las credenciales para cloudinary se almacenan en nuestras variables de entorno.

// Después de eso, importamos los módulos que necesitamos para nuestra aplicación. Esto incluye express para crear nuestra aplicación, mongoose para trabajar con MongoDB, path para trabajar con rutas de archivos, cors para permitir solicitudes CORS, y nuestras rutas personalizadas.

// Inicializamos nuestra aplicación Express y establecemos el puerto en el que se ejecutará. Luego, configuramos algunos middlewares: cors para permitir solicitudes CORS, express.json para parsear el cuerpo de las solicitudes JSON, y express.static para servir nuestros archivos estáticos.

// A continuación, definimos nuestras rutas. Tenemos rutas para las imágenes, los anuncios y la autenticación. También tenemos una ruta protegida que solo puede ser accedida por usuarios autenticados.

// Para conectar a nuestra base de datos MongoDB, utilizamos una función connectToDb que intenta conectarse a la base de datos y se reintentará hasta 5 veces si la conexión falla.

// Finalmente, manejamos todas las demás rutas enviando el archivo index.html, y configuramos un middleware de manejo de errores para manejar cualquier error que pueda ocurrir en nuestra aplicación.

// Una vez que todo está configurado, iniciamos nuestro servidor con app.listen.