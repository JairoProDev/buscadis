const RealEstate = require("../models/realEstateModel");
const { incrementPostCounter } = require("./postCounterController");

const createRealEstate = async (req, res) => {
  try {
    const realEstate = new RealEstate(req.body);
    await realEstate.save();
    await incrementPostCounter(); // Incrementar el contador de avisos
    res.status(201).json({ message: "Real estate created successfully", realEstate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRealEstate = async (req, res) => {
  try {
    const realEstates = await RealEstate.find().sort({ createdAt: -1 }).limit(300).exec();
    res.status(200).json(realEstates);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los bienes raíces" });
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
    res.status(500).json({ error: "Error interno al obtener el bien raíz" });
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
    res.status(200).json({ message: "Real estate updated successfully", realEstate });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el bien raíz" });
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
    res.status(500).json({ error: "Error interno al eliminar el bien raíz" });
  }
};

module.exports = {
  createRealEstate,
  getRealEstate,
  getRealEstateById,
  updateRealEstate,
  deleteRealEstate,
};