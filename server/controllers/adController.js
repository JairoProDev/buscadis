const Ad = require("../models/adModel");
const { incrementPostCounter } = require("./postCounterController");

const createAd = async (req, res) => {
  try {
    console.log("Creating new ad with data:", req.body);
    const {
      adType,
      category,
      subCategory,
      title,
      description,
      amount,
      location,
      phone,
      phone2,
      email,
      images,
      size,
    } = req.body;

    if (
      !adType ||
      !category ||
      !subCategory ||
      !title ||
      !description ||
      !phone ||
      !size
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const newAd = new Ad({
      adType: adType,
      category: category,
      subCategory: subCategory,
      title: title,
      description: description,
      amount: amount,
      location: location,
      phone: phone,
      phone2: phone2,
      email: email,
      images: images,
      size: size,
    });

    console.log("New ad:", newAd);
    try {
      await newAd.save();
      await incrementPostCounter(); // Incrementar el contador de adisos
      console.log("Ad saved successfully");
      res
        .status(201)
        .json({ mensaje: "Anuncio creado exitosamente", adiso: newAd });
    } catch (error) {
      console.error("Error al guardar el adiso:", error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error("Error al crear el adiso:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAds = async (req, res) => {
  try {
    const adisos = await Ad.find().sort({ createdAt: -1 }).limit(100).exec();

    if (!adisos || adisos.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(adisos);
  } catch (error) {
    console.error("Error al obtener los adisos:", error);
    res.status(500).json({ error: "Error interno al obtener los adisos" });
  }
};

const getAdById = async (req, res) => {
  try {
    const adiso = await Ad.findById(req.params.id);

    if (!adiso) {
      return res.status(404).json({ mensaje: "No se encontró el adiso" });
    }

    res.status(200).json(adiso);
  } catch (error) {
    console.error("Error al obtener el adiso:", error);
    res.status(500).json({ error: "Error interno al obtener el adiso" });
  }
};

const getAdsByAdType = async (req, res) => {
  try {
    const adType = req.params.adType;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const adisos = await Ad.find({ adType })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (!adisos || adisos.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(adisos);
  } catch (error) {
    console.error("Error al obtener los adisos:", error);
    res.status(500).json({ error: "Error interno al obtener los adisos" });
  }
};

const getAdsByAdTypeAndCategory = async (req, res) => {
  try {
    const { adType, category } = req.params;
    const query = { adType, category };

    const ads = await Ad.find(query).sort({ createdAt: -1 }).limit(400).exec();

    if (!ads || ads.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(ads);
  } catch (error) {
    console.error("Error al obtener los adisos:", error);
    res.status(500).json({ error: "Error interno al obtener los adisos" });
  }
};

const updateAd = async (req, res) => {
  try {
    const adiso = await Ad.findById(req.params.id);

    if (!adiso) {
      return res.status(404).json({ mensaje: "No se encontró el adiso" });
    }

    Object.assign(adiso, req.body);

    await adiso.save();
    res
      .status(200)
      .json({ mensaje: "Anuncio actualizado exitosamente", adiso });
  } catch (error) {
    console.error("Error al actualizar el adiso:", error);
    res.status(500).json({ error: "Error interno al actualizar el adiso" });
  }
};

const deleteAd = async (req, res) => {
  try {
    const adiso = await Ad.findById(req.params.id);

    if (!adiso) {
      return res.status(404).json({ mensaje: "No se encontró el adiso" });
    }

    await adiso.deleteOne();
    res.status(200).json({ mensaje: "Anuncio eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el adiso:", error);
    res.status(500).json({ error: "Error interno al eliminar el adiso" });
  }
};

module.exports = {
  createAd,
  getAds,
  getAdById,
  getAdsByAdType,
  getAdsByAdTypeAndCategory,
  updateAd,
  deleteAd,
};
