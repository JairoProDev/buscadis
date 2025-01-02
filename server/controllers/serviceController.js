const Service = require("../models/serviceModel");
const { incrementPostCounter } = require("./postCounterController");

const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ createdAt: -1 })
      .limit(300)
      .exec();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los servicios" });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener el servicio" });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    Object.assign(service, req.body);
    await service.save();
    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el servicio" });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el servicio" });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
