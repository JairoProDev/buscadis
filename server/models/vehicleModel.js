// models/vehicleModel.js
const mongoose = require("mongoose");
const validator = require("validator");

const vehicleSchema = new mongoose.Schema(
  {
    adType: { type: String, required: true, trim: true }, // tipo de adiso
    category: { type: String, required: true, trim: true }, // categoría de vehículo, como 'Auto', 'Moto', etc.
    subCategory: { type: String, trim: true }, // subcategoría, como 'SUV', 'Sedán', 'Camioneta'
    title: { type: String, required: true, trim: true, maxlength: 100 }, // título del adiso
    description: { type: String, required: true, trim: true, maxlength: 1800 }, // descripción
    location: { type: String, trim: true }, // ubicación del vehículo
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(\+51)?\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} no es un número de teléfono válido!`,
      },
    },
    phone2: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^(\+51)?\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} no es un número de teléfono válido!`,
      },
    },
    amount: { type: String },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return v ? validator.isEmail(v) : true;
        },
        message: (props) =>
          `${props.value} no es un correo electrónico válido!`,
      },
    },
    size: {
      type: String,
      enum: ["miniatura", "normal", "largo", "grande", "gigante"],
      default: "normal",
    },
    images: [String], // URLs de imágenes del vehículo
    viewCount: { type: Number, default: 0 }, // Añadido para contar vistas
    contactsCount: { type: Number, default: 0 }, // Añadido para contar contactos
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;

// make: { type: String, required: true, trim: true }, // marca del vehículo, como 'Toyota', 'Ford'
//     model: { type: String, required: true, trim: true }, // modelo del vehículo, como 'Corolla', 'Mustang'
//     year: { type: Number, required: true }, // año del vehículo
//     mileage: { type: Number, required: true }, // kilometraje del vehículo
//     condition: { type: String, enum: ["Nuevo", "Usado"], required: true }, // condición del vehículo
