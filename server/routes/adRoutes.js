const express = require("express");
const router = express.Router();
const { createAd, getAds, getAdById, updateAd, deleteAd, getAdsByCategory } = require("../controllers/adController");

router.post("/anuncios", createAd);
router.get("/anuncios", getAds);
router.get("/anuncios/:id", getAdById);
router.put("/anuncios/:id", updateAd);
router.delete("/anuncios/:id", deleteAd);
router.get("/anuncios/category/:category", getAdsByCategory); // Nueva ruta

module.exports = router;