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
      await incrementPostCounter(); // Incrementar el contador de avisos
      console.log("Ad saved successfully");
      res
        .status(201)
        .json({ mensaje: "Anuncio creado exitosamente", anuncio: newAd });
    } catch (error) {
      console.error("Error al guardar el anuncio:", error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error("Error al crear el anuncio:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAds = async (req, res) => {
  try {
    const anuncios = await Ad.find().sort({ createdAt: -1 }).limit(100).exec();

    if (!anuncios || anuncios.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ error: "Error interno al obtener los anuncios" });
  }
};

const getAdById = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    res.status(200).json(anuncio);
  } catch (error) {
    console.error("Error al obtener el anuncio:", error);
    res.status(500).json({ error: "Error interno al obtener el anuncio" });
  }
};

const getAdsByAdType = async (req, res) => {
  try {
    const adType = req.params.adType;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const anuncios = await Ad.find({ adType })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    if (!anuncios || anuncios.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ error: "Error interno al obtener los anuncios" });
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
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ error: "Error interno al obtener los anuncios" });
  }
};

const updateAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    Object.assign(anuncio, req.body);

    await anuncio.save();
    res
      .status(200)
      .json({ mensaje: "Anuncio actualizado exitosamente", anuncio });
  } catch (error) {
    console.error("Error al actualizar el anuncio:", error);
    res.status(500).json({ error: "Error interno al actualizar el anuncio" });
  }
};

const deleteAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    await anuncio.deleteOne();
    res.status(200).json({ mensaje: "Anuncio eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el anuncio:", error);
    res.status(500).json({ error: "Error interno al eliminar el anuncio" });
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