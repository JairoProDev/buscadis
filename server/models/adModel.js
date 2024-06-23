// adModel.js
const mongoose = require("mongoose");
const validator = require("validator");

const anuncioSchema = new mongoose.Schema(
  {
    shortId: {
      type: Number,
      unique: true,
    },
    adType: {
      type: String,
      enum: [
        "Empleos",
        "Inmuebles",
        "Vehicles",
        "Servicios",
        "Productos",
        "Negocios",
        "Otros",
      ],
      required: [true, "El tipo de anuncio es requerido"],
      index: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
      required: [true, "La categoría del anuncio es requerida"],
    },
    subCategory: {
      type: String,
      required: [true, "La subcategoría es requerida"],
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "El título del anuncio es requerido"],
      trim: true,
      maxlength: [
        80,
        "El título del anuncio no puede tener más de 80 caracteres",
      ],
    },
    description: {
      type: String,
      required: [true, "La descripción del anuncio es requerida"],
      trim: true,
      maxlength: [
        600,
        "La descripción del anuncio no puede tener más de 600 caracteres",
      ],
    },
    location: {
      type: String,
      trim: true,
    },
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
