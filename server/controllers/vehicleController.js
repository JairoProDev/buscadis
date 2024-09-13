// controllers/vehicleController.js
const Vehicle = require("../models/vehicleModel");

const createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json({ message: "Vehicle created successfully", vehicle });
  } catch (error) {
    console.error("Error al crear anuncio de vehículo:", error);
    res.status(500).json({ error: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).limit(100).exec();
    res.status(200).json(vehicles); // Siempre enviamos JSON válido
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los vehículos" });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Internal error fetching vehicle" });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    Object.assign(vehicle, req.body);
    await vehicle.save();
    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    res.status(500).json({ error: "Internal error updating vehicle" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    await vehicle.deleteOne();
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal error deleting vehicle" });
  }
};

// Incrementar vistas del anuncio
const incrementViewCount = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "View count updated", vehicle });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar las vistas" });
  }
};

// Incrementar contactos del anuncio
const incrementContactsCount = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $inc: { contactsCount: 1 } },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Contacts count updated", vehicle });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los contactos" });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  incrementViewCount,
  incrementContactsCount,
};
