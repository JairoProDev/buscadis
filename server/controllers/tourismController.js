const Tourism = require("../models/tourismModel");
const { incrementPostCounter } = require("./postCounterController");

const createTourism = async (req, res) => {
  try {
    const tourism = new Tourism(req.body);
    await tourism.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Tourism created successfully", tourism });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTourisms = async (req, res) => {
  try {
    const tourisms = await Tourism.find()
      .sort({ createdAt: -1 })
      .limit(300)
      .exec();
    res.status(200).json(tourisms);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los turismos" });
  }
};

const getTourismById = async (req, res) => {
  try {
    const tourism = await Tourism.findById(req.params.id);
    if (!tourism) {
      return res.status(404).json({ message: "Tourism not found" });
    }
    res.status(200).json(tourism);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener el turismo" });
  }
};

const updateTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findById(req.params.id);
    if (!tourism) {
      return res.status(404).json({ message: "Tourism not found" });
    }
    Object.assign(tourism, req.body);
    await tourism.save();
    res.status(200).json({ message: "Tourism updated successfully", tourism });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el turismo" });
  }
};

const deleteTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findById(req.params.id);
    if (!tourism) {
      return res.status(404).json({ message: "Tourism not found" });
    }
    await tourism.deleteOne();
    res.status(200).json({ message: "Tourism deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el turismo" });
  }
};

module.exports = {
  createTourism,
  getTourisms,
  getTourismById,
  updateTourism,
  deleteTourism,
};
