const Ad = require("../models/adModel");

const createAd = async (req, res) => {
  try {
    const { category, title, description, amount, location, phone, phone2, email } =
      req.body;
    const newAd = new Ad({
      category: category,
      title: title,
      description: description,
      amount: amount,
      location: location,
      phone: phone,
      phone2: phone2,
      email: email,
    });

    await newAd.save();
    res
      .status(201)
      .json({ mensaje: "Anuncio creado exitosamente", anuncio: newAd });
  } catch (error) {
    // res.status(500).json({ error: "Error al crear el anuncio" });
    res.status(500).json({ error: error.message });
  }
};

const getAds = async (req, res) => {
  try {
    const anuncios = await Ad.find()
    console.log(anuncios);
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 200;

    //   .skip((page - 1) * limit)
    //   .limit(limit);

    if (!anuncios || anuncios.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ error: "Error interno al obtener los anuncios" });
  }
};

// Devuelve un solo anuncio por su ID
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
// Actaulizar anuncio (modificar)
const updateAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    anuncio.category = req.body.category || anuncio.category;
    anuncio.title = req.body.title || anuncio.title;
    anuncio.description = req.body.description || anuncio.description;
    anuncio.amount = req.body.amount || anuncio.amount;
    anuncio.location = req.body.location || anuncio.location;
    anuncio.phone = req.body.phone || anuncio.phone;
    anuncio.phone2 = req.body.phone2 || anuncio.phone2;
    
    anuncio.email = req.body.email || anuncio.email;

    await anuncio.save();
    res.status(200).json({ mensaje: "Anuncio actualizado", anuncio: anuncio });
  } catch (error) {
    console.error("Error al actualizar el anuncio:", error);
    res.status(500).json({ error: "Error interno al actualizar el anuncio" });
  }
};
// Eliminar anuncio
const deleteAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    await anuncio.remove();
    res.status(200).json({ mensaje: "Anuncio eliminado", anuncio: anuncio });
  } catch (error) {
    console.error("Error al eliminar el anuncio:", error);
    res.status(500).json({ error: "Error interno al eliminar el anuncio" });
  }
};

module.exports = { createAd, getAds, getAdById, updateAd, deleteAd };
