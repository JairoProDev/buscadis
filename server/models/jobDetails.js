const mongoose = require('mongoose');

const jobDetailsSchema = new mongoose.Schema({
  employmentType: String, // Tipo de empleo: tiempo completo, medio tiempo, etc.
  schedule: String, // Horario de trabajo para empleos, si aplica.
  jobTitle: String, // Título del empleo, si aplica.
  company: String, // Empresa para empleos, si aplica.
  experience: String, // Experiencia requerida para empleos, si aplica.
  education: String, // Educación requerida para empleos, si aplica.
  salary: Number, // Salario para empleos, si aplica.
  benefits: [String], // Beneficios para empleos, si aplica.
  skills: [String], // Habilidades requeridas para empleos, si aplica.
  languages: [String], // Idiomas requeridos para empleos, si aplica.
  certifications: [String], // Certificaciones requeridas para empleos, si aplica.
  tools: [String], // Herramientas requeridas para empleos, si aplica.
  requirements: [String], // Requisitos para empleos, si aplica.
  responsibilities: [String], // Responsabilidades para empleos, si aplica.
  conditions: [String], // Condiciones para empleos, si aplica.
});

module.exports = jobDetailsSchema;