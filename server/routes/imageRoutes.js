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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio temporal donde se almacenan los archivos antes de subir a Cloudinary
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar los archivos con un identificador único
  }
});

const upload = multer({ storage: storage });

// Ruta para subir las imágenes a Cloudinary y eliminar los archivos locales después de la subida
router.post('/upload', upload.array('image', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No image files provided");
    return res.status(400).json({ message: 'No image files were provided.' });
  }

  try {
    const imageUrls = [];

    // Subir cada archivo a Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path); // Subida a Cloudinary
      imageUrls.push(result.secure_url); // Guardar la URL de Cloudinary en el array

      // Eliminar el archivo local después de la subida
      fs.unlinkSync(file.path);
    }

    console.log("Image URLs:", imageUrls); // Asegúrate de que las URLs sean correctas

    // Responder con las URLs de las imágenes subidas
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Error al subir las imágenes a Cloudinary:', error);

    // Eliminar los archivos locales si hay un error
    req.files.forEach(file => fs.unlinkSync(file.path));

    res.status(500).json({ error: 'Error uploading images', message: error.message });
  }
});

module.exports = router;
