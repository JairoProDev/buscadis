const Other = require("../models/otherModel");

const createOther = async (req, res) => {
  try {
    const other = new Other(req.body);
    await other.save();
    res.status(201).json({ message: "Other ad created successfully", other });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOthers = async (req, res) => {
  try {
    const others = await Other.find().sort({ createdAt: -1 }).limit(100).exec();
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching other ads" });
  }
};

const getOtherById = async (req, res) => {
  try {
    const other = await Other.findById(req.params.id);
    if (!other) {
      return res.status(404).json({ message: "Other ad not found" });
    }
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching other ad" });
  }
};

const updateOther = async (req, res) => {
  try {
    const other = await Other.findById(req.params.id);
    if (!other) {
      return res.status(404).json({ message: "Other ad not found" });
    }
    Object.assign(other, req.body);
    await other.save();
    res.status(200).json({ message: "Other ad updated successfully", other });
  } catch (error) {
    res.status(500).json({ error: "Internal error updating other ad" });
  }
};

const deleteOther = async (req, res) => {
  try {
    const other = await Other.findById(req.params.id);
    if (!other) {
      return res.status(404).json({ message: "Other ad not found" });
    }
    await other.deleteOne();
    res.status(200).json({ message: "Other ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal error deleting other ad" });
  }
};

module.exports = {
  createOther,
  getOthers,
  getOtherById,
  updateOther,
  deleteOther,
};
