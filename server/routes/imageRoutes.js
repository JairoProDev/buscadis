const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de multer para subir archivos a la carpeta temporal local
const storage = multer.memoryStorage(); // Almacenar las imágenes en memoria

const upload = multer({ storage: storage });

// Ruta para subir las imágenes a Cloudinary y eliminar los archivos locales después de la subida
router.post('/upload', upload.array('image', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No image files provided");
    return res.status(400).json({ message: 'No image files were provided.' });
  }

  try {
    const imageUrls = [];

    // Subir cada archivo desde la memoria a Cloudinary
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        stream.end(file.buffer); // Subir el archivo desde el buffer
      });
      imageUrls.push(result.secure_url); // Guardar la URL de Cloudinary en el array
    }

    console.log("Image URLs:", imageUrls); // Asegúrate de que las URLs sean correctas

    // Responder con las URLs de las imágenes subidas
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Error al subir las imágenes a Cloudinary:', error);

    res.status(500).json({ error: 'Error uploading images', message: error.message });
  }
});

module.exports = router;
