const mongoose = require("mongoose");
const validator = require("validator");

const anuncioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título del anuncio es requerido"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "El título del anuncio no puede tener más de 50 caracteres",
      ],
    },
    description: {
      type: String,
      required: [true, "La descripción del anuncio es requerida"],
      trim: true,
      maxlength: [
        300,
        "La descripción del anuncio no puede tener más de 200 caracteres",
      ],
    },
    images: [String],
    amount: {
      type: Number,
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
          `${props.value} Tú número de teléfono está mal!, revísalo por favor`,
      },
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
    category: {
      type: String,
      enum: ["Empleos", "Inmuebles", "Servicios", "Autos", "Otros"],
      default: "Otros",
      required: [true, "La categoría del anuncio es requerida"],
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

module.exports = mongoose.model("Anuncio", anuncioSchema);
