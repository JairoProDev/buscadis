// adModel.js
const mongoose = require("mongoose");
const validator = require("validator");

const adisoSchema = new mongoose.Schema(
  {
    // shortId: {
    //   type: Number,
    //   unique: true,
    // },
    adType: {
      type: String,
      enum: [
        "Empleos",
        "Inmuebles",
        "Vehiculos",
        "Servicios",
        "Productos",
        "Negocios",
        "Otros",
      ],
      required: [true, "El tipo de adiso es requerido"],
      index: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
      required: [true, "La categoría del adiso es requerida"],
    },
    subCategory: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "El título del adiso es requerido"],
      trim: true,
      maxlength: [
        100,
        "El título del adiso no puede tener más de 80 caracteres",
      ],
    },
    description: {
      type: String,
      required: [true, "La descripción del adiso es requerida"],
      trim: true,
      maxlength: [
        1800,
        "La descripción del adiso no puede tener más de 600 caracteres",
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
      type: String,
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
    size: {
      type: String,
      enum: ["miniatura", "normal", "largo", "grande", "gigante"],
      default: "normal",
      required: [true, "El tamaño del adiso es requerido"],
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

const Anuncio = mongoose.model("Anuncio", adisoSchema);

module.exports = Anuncio;
