const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No image file was provided.' });
        return;
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Eliminar el archivo del sistema de archivos local
        fs.unlinkSync(req.file.path);

        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);

        // Eliminar el archivo del sistema de archivos local en caso de error
        fs.unlinkSync(req.file.path);

        res.status(500).json({ error: 'Error uploading image', message: error.message });
    }
});

module.exports = router;