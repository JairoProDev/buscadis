const Business = require("../models/businessModel");

const createBusiness = async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res
      .status(201)
      .json({ message: "Business created successfully", business });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching businesses" });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching business" });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    Object.assign(business, req.body);
    await business.save();
    res
      .status(200)
      .json({ message: "Business updated successfully", business });
  } catch (error) {
    res.status(500).json({ error: "Internal error updating business" });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    await business.deleteOne();
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal error deleting business" });
  }
};

module.exports = {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
