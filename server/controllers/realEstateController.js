const RealEstate = require("../models/realEstateModel");

const createRealEstate = async (req, res) => {
  try {
    const realEstate = new RealEstate(req.body);
    await realEstate.save();
    res
      .status(201)
      .json({ message: "Real estate created successfully", realEstate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRealEstates = async (req, res) => {
  try {
    const realEstates = await RealEstate.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();
    res.status(200).json(realEstates);
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
  getRealEstates,
  getRealEstateById,
  updateRealEstate,
  deleteRealEstate,
};
