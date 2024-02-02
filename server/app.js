if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' });
}
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const adRoutes = require('./routes/adRoutes');
const cors = require('cors')

// Inicializar la aplicación
const app = express();

// Establecer el puerto en el que se ejecutará la aplicación
const PORT = process.env.PORT || 5000;

// Usar middleware para permitir solicitudes CORS
app.use(cors());

// Usar middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Usar middleware para servir archivos estáticos
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Contador para los intentos de conexión a la base de datos
let dbConnectionAttempts = 0;

// Función para conectar a la base de datos
const connectToDb = () => {
  // Intenta conectar a MongoDB
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Si la conexión es exitosa, registra un mensaje en la consola
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // Si la conexión falla, registra el error
    console.error('Error connecting to MongoDB', err);
    
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
app.use('/api', adRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejar todas las demás rutas enviando el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});