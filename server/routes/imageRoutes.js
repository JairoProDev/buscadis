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

router.post('/upload', upload.array('image'), async (req, res) => {
    if (!req.files) {
        res.status(400).json({ message: 'No image files were provided.' });
        return;
    }

    try {
        const results = await Promise.all(req.files.map(file => 
            cloudinary.uploader.upload(file.path)
        ));

        // Eliminar los archivos del sistema de archivos local
        req.files.forEach(file => fs.unlinkSync(file.path));

        const imageUrls = results.map(result => result.secure_url);
        res.json({ imageUrls });
    } catch (error) {
        console.error(error);

        // Eliminar los archivos del sistema de archivos local en caso de error
        req.files.forEach(file => fs.unlinkSync(file.path));

        res.status(500).json({ error: 'Error uploading images', message: error.message });
    }
});

module.exports = router;