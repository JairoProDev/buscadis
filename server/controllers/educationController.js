const Education = require("../models/educationModel");
const { incrementPostCounter } = require("./postCounterController");

const createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res
      .status(201)
      .json({ message: "Education created successfully", education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEducations = async (req, res) => {
  try {
    const educations = await Education.find()
      .sort({ createdAt: -1 })
      .limit(300)
      .exec();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener las educaciones" });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener la educación" });
  }
};

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    Object.assign(education, req.body);
    await education.save();
    res
      .status(200)
      .json({ message: "Education updated successfully", education });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar la educación" });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    await education.deleteOne();
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar la educación" });
  }
};

module.exports = {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
