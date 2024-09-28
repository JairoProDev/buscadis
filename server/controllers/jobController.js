const Job = require("../models/jobModel");

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(300).exec();
    res.status(200).json(jobs); // Siempre enviamos JSON válido
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
    res.status(500).json({ error: "Internal error fetching job" });
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
    res.status(500).json({ error: "Internal error updating job" });
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
    res.status(500).json({ error: "Internal error deleting job" });
  }
};

// Incrementar vistas del anuncio
const incrementViewCount = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "View count updated", job });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar las vistas" });
  }
};

// Incrementar contactos del anuncio
const incrementContactsCount = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { contactsCount: 1 } },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Contacts count updated", job });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los contactos" });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob, incrementViewCount, incrementContactsCount };
