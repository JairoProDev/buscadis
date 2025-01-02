const Event = require("../models/eventModel");
const { incrementPostCounter } = require("./postCounterController");

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(300).exec();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los eventos" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener el evento" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    Object.assign(event, req.body);
    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el evento" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el evento" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
