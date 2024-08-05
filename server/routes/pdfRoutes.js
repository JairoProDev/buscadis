const express = require('express');
const generatePDF = require('../pdf/generatePdf');
const router = express.Router();

router.get('/download-pdf', async (req, res) => {
  try {
    const pdfPath = await generatePDF();
    res.download(pdfPath, 'anuncios.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

module.exports = router;
