const express = require("express");
const router = express.Router();
const {
  createAd,
  getAds,
  getAdById,
  updateAd,
  deleteAd,
  getAdsByAdType,
  getAdsByAdTypeAndCategory
} = require("../controllers/adController");

router.post("/anuncios", createAd);
router.get("/anuncios", getAds);
router.get("/anuncios/:id", getAdById);
router.put("/anuncios/:id", updateAd);
router.delete("/anuncios/:id", deleteAd);
router.get("/anuncios/adType/:adType", getAdsByAdType);
router.get("/anuncios/adType/:adType/category/:category", getAdsByAdTypeAndCategory); // Nueva ruta

module.exports = router;
