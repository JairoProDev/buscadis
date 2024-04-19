const mongoose = require("mongoose");
const validator = require("validator");

const anuncioSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Empleos", "Inmuebles", "Servicios", "Autos", "Otros"],
      default: "Otros",
      required: [true, "La categoría del anuncio es requerida"],
    },
    subcategory: {
      type: String,
      validate: {
        validator: function(v) {
          const validSubcategories = {
            Empleos: ["Tiempo completo", "Medio tiempo", "Por horas", "Prácticas", "Otros"],
            Inmuebles: ["Alquiler", "Anticresis", "Venta", "Traspasos", "Habitaciones", "Apartamentos", "Minidepartamentos", "Departamentos", "Casas", "Terrenos"],
            Servicios: ["Técnicos", "Domésticos", "Eventos", "Salud", "Educación", "Otros"],
            Autos: ["Autos", "Camionetas", "Motos", "Maquinaria", "Otros"],
            Otros: ["Otros"],
          };
          return validSubcategories[this.category].includes(v);
        },
        message: props => `${props.value} no es una subcategoría válida para la categoría ${props.category}`
      },
      // required: [true, "La subcategoría del anuncio es requerida"],
    },
    title: {
      type: String,
      required: [true, "El título del anuncio es requerido"],
      unique: false,
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
        500,
        "La descripción del anuncio no puede tener más de 500 caracteres",
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
          `${props.value} Tú número de teléfono está mal!, revísalo por favor`,
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
          `${props.value} Tú número de teléfono está mal!, revísalo por favor`,
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
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Anuncio", anuncioSchema);
