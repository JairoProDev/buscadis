const mongoose = require("mongoose");
const validator = require("validator");

const detailsSchema = new mongoose.Schema({
  transactionType: String, // Tipo de transacción como venta, alquiler, etc.
  propertyType: String, // Tipo de propiedad como casa, departamento, etc.
  brand: String, // Marca del producto o vehículo, si aplica.
  condition: String, // Condición del producto o vehículo, si aplica.
  modelYear: Number, // Año del modelo para vehículos, si aplica.
  mileage: Number, // Kilometraje para vehículos, si aplica.
  engineSize: String, // Tamaño del motor para vehículos, si aplica.
  employmentType: String, // Tipo de empleo: tiempo completo, medio tiempo, etc.
  schedule: String, // Horario de trabajo para empleos, si aplica.
  rooms: Number, // Número de habitaciones para inmuebles, si aplica.
  bathrooms: Number, // Número de baños para inmuebles, si aplica.
  area: Number, // Área en metros cuadrados para inmuebles, si aplica.
  petsAllowed: Boolean, // Se permiten mascotas en inmuebles, si aplica.
  furnished: Boolean, // Amoblado en inmuebles, si aplica.
  parking: Boolean, // Cochera en inmuebles, si aplica.
  delivery: Boolean, // Entrega a domicilio para productos, si aplica.
  warranty: Boolean, // Garantía para productos, si aplica.
  negotiable: Boolean, // Precio negociable para productos, si aplica.
  exchange: Boolean, // Se aceptan intercambios para productos, si aplica.
  shipping: Boolean, // Envíos para productos, si aplica.
  jobTitle: String, // Título del empleo, si aplica.
  company: String, // Empresa para empleos, si aplica.
  experience: String, // Experiencia requerida para empleos, si aplica.
  education: String, // Educación requerida para empleos, si aplica.
  salary: Number, // Salario para empleos, si aplica.
  schedule: String, // Horario de trabajo para empleos, si aplica.
  features: [String], // Características adicionales para inmuebles y autos.
  equipment: [String], // Equipamiento para inmuebles, si aplica.
  services: [String], // Servicios incluidos en inmuebles, si aplica.
  paymentMethods: [String], // Métodos de pago para productos, si aplica.
  benefits: [String], // Beneficios para empleos, si aplica.
  skills: [String], // Habilidades requeridas para empleos, si aplica.
  languages: [String], // Idiomas requeridos para empleos, si aplica.
  certifications: [String], // Certificaciones requeridas para empleos, si aplica.
  tools: [String], // Herramientas requeridas para empleos, si aplica.
  requirements: [String], // Requisitos para empleos, si aplica.
  responsibilities: [String], // Responsabilidades para empleos, si aplica.
  conditions: [String], // Condiciones para empleos, si aplica.
  benefits: [String], // Beneficios para empleos, si aplica.
});

const anuncioSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Empleos", "Inmuebles", "Servicios", "Autos", "Productos", "Otros"],
    required: [true, "La categoría del anuncio es requerida"],
    indexedDB: true,
  },
  subcategory: {
    type: String,
    // required: [true, "La subcategoría del anuncio es requerida"],
  },
  title: {
    type: String,
    required: [true, "El título del anuncio es requerido"],
    trim: true,
    maxlength: [80, "El título del anuncio no puede tener más de 80 caracteres"],
  },
  description: {
    type: String,
    required: [true, "La descripción del anuncio es requerida"],
    trim: true,
    maxlength: [500, "La descripción del anuncio no puede tener más de 500 caracteres"],
  },
  location: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) { return /^(\+51)?\d{9}$/.test(v); },
      message: props => `${props.value} no es un número de teléfono válido!`
    }
  },
  phone2: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) { return !v || /^(\+51)?\d{9}$/.test(v); },
      message: props => `${props.value} no es un número de teléfono válido!`
    }
  },
  images: [String],
  amount: {
    type: Number,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return v ? validator.isEmail(v) : true;
      },
      message: (props) =>
        `${props.value} Por favor, introduce un correo electrónico válido!`,
    },
  },
  details: detailsSchema, // Sub-documento para detalles específicos.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Anuncio", anuncioSchema);
