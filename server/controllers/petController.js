const Pet = require("../models/petModel");
const { incrementPostCounter } = require("./postCounterController");

const createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Pet created successfully", pet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 }).limit(300).exec();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener las mascotas" });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener la mascota" });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    Object.assign(pet, req.body);
    await pet.save();
    res.status(200).json({ message: "Pet updated successfully", pet });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar la mascota" });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    await pet.deleteOne();
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar la mascota" });
  }
};

module.exports = {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
};
