const PostCounter = require("../models/postCounterModel");
const Job = require("../models/jobModel");
const RealEstate = require("../models/realEstateModel");
const Vehicle = require("../models/vehicleModel");
const Service = require("../models/serviceModel");
const Product = require("../models/productModel");
const Business = require("../models/businessModel");

const initializePostCounter = async () => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalRealEstate = await RealEstate.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const totalAds = totalJobs + totalRealEstate + totalVehicles + totalServices + totalProducts + totalBusinesses;

    await PostCounter.findOneAndUpdate(
      { name: "postCounter" },
      { count: totalAds },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Error initializing post counter:", error);
  }
};

const incrementPostCounter = async () => {
  try {
    const counter = await PostCounter.findOneAndUpdate(
      { name: "postCounter" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    return counter.count;
  } catch (error) {
    console.error("Error incrementing post counter:", error);
  }
};

const getPostCount = async (req, res) => {
  try {
    const counter = await PostCounter.findOne({ name: "postCounter" });
    const postCount = counter ? counter.count : 0;
    res.json({ postCount });
  } catch (error) {
    console.error("Error getting post count:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  initializePostCounter,
  incrementPostCounter,
  getPostCount,
};