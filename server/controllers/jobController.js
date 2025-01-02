const Job = require("../models/jobModel");
const { incrementPostCounter } = require("./postCounterController");

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    await incrementPostCounter(); // Incrementar el contador de adisos
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(300).exec();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener los empleos" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener el empleo" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    Object.assign(job, req.body);
    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el empleo" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el empleo" });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
