const RealEstate = require("../models/realEstateModel");

const createRealEstate = async (req, res) => {
  try {
    console.log("Datos recibidos en el cuerpo de la solicitud:", req.body); // Agregar este log
    const realEstate = new RealEstate(req.body);
    await realEstate.save();
    res.status(201).json({ message: "Real estate created successfully", realEstate });
  } catch (error) {
    console.error("Error al crear anuncio de bienes raíces:", error); // Agregar este log para detectar errores
    res.status(500).json({ error: error.message });
  }
};

const getRealEstate = async (req, res) => {
  try {
    const realEstate = await RealEstate.find()
      .sort({ createdAt: -1 })
      .limit(300)
      .exec();
    res.status(200).json(realEstate);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching real estates" });
  }
};

const getRealEstateById = async (req, res) => {
  try {
    const realEstate = await RealEstate.findById(req.params.id);
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate not found" });
    }
    res.status(200).json(realEstate);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching real estate" });
  }
};

const updateRealEstate = async (req, res) => {
  try {
    const realEstate = await RealEstate.findById(req.params.id);
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate not found" });
    }
    Object.assign(realEstate, req.body);
    await realEstate.save();
    res
      .status(200)
      .json({ message: "Real estate updated successfully", realEstate });
  } catch (error) {
    res.status(500).json({ error: "Internal error updating real estate" });
  }
};

const deleteRealEstate = async (req, res) => {
  try {
    const realEstate = await RealEstate.findById(req.params.id);
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate not found" });
    }
    await realEstate.deleteOne();
    res.status(200).json({ message: "Real estate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal error deleting real estate" });
  }
};

module.exports = {
  createRealEstate,
  getRealEstate,
  getRealEstateById,
  updateRealEstate,
  deleteRealEstate,
};
