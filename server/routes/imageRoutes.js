const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;

router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.json({ message: 'No image file was provided.' });
        return;
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});

module.exports = router;