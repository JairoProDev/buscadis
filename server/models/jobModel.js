const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    adType: { type: String, required: true, trim: true },
    category: { type: String, required: false, trim: true },
    subCategory: { type: String, trim: true },
    businessName: { type: String, trim: true },
    businessType: { type: String, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1800 },
    location: { type: String, trim: true },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(\+51)?\d{9}$/.test(v);
        },
        message: (props) => `${props.value} no es un número de teléfono válido!`,
      },
    },
    phone2: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^(\+51)?\d{9}$/.test(v);
        },
        message: (props) => `${props.value} no es un número de teléfono válido!`,
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
        message: (props) => `${props.value} no es un correo electrónico válido!`,
      },
    },
    size: { type: String, enum: ["miniatura", "normal", "largo", "grande", "gigante"], default: "normal" },
    images: [String],
    viewCount: { type: Number, default: 0 }, // Añadido para contar vistas
    contactsCount: { type: Number, default: 0 }, // Añadido para contar contactos
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
