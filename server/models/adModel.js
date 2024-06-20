const mongoose = require("mongoose");
const validator = require("validator");

const JobDetails = require("./jobDetails");
const ProductDetails = require("./productDetails");
const PropertyDetails = require("./propertyDetails");
const ServiceDetails = require("./serviceDetails");
const VehicleDetails = require("./vehicleDetails");

const detailsSchema = new mongoose.Schema({}, { discriminatorKey: "adType" });

const anuncioSchema = new mongoose.Schema(
  {
    adType: {
      type: String,
      enum: ["Empleos", "Inmuebles", "Servicios", "Vehicles", "Productos", "Otros"],
      required: [true, "El tipo de anuncio es requerido"],
      index: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
      required: [true, "La categoría del anuncio es requerida"],
      validate: {
        validator: function (v) {
          const adTypeCategories = {
            Empleos: ["Tecnología", "Salud", "Educación", "Construcción", "Practicantes", "Ventas", "Servicio al Cliente", "Transporte", "Administración", "Hotelería", "Agencias", "Hogar", "Logística", "Operaciones", "Turismo", "Contabilidad", "Seguridad", "Panadería", "Secretaría", "Almacén", "Cuidado", "Marketing", "Gastronomía", "Belleza", "Farmacia", "Derecho", "Otros"],
            Inmuebles: ["Habitaciones", "Minidepartamentos", "Departamentos", "Casas", "Lotes", "Terrenos", "Locales", "Oficinas", "Hoteles", "Anticresis", "Otros"],
            Vehicles: ["Autos", "Camionetas", "Motos", "Bicicletas", "Maquinaria", "Otros"],
            Servicios: ["Educación", "Reparaciones", "Salud", "Domésticos", "Técnicos", "Eventos", "Otros"],
            Productos: ["Tecnología", "Ropa y Accesorios", "Hogar", "Deportes y Fitness", "Libros y Educación", "Juegos y Juguetes", "Otros"],
            Otros: ["Eventos", "Mascotas", "Objetos Perdidos", "Otros"]
          };
          return adTypeCategories[this.adType]?.includes(v) || false;
        },
        message: props => `La categoría ${props.value} no es válida para el tipo de anuncio ${props.adType}`
      },
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
      maxlength: [600, "La descripción del anuncio no puede tener más de 500 caracteres"],
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
        message: (props) => `${props.value} Por favor, introduce un correo electrónico válido!`,
      },
    },
    details: detailsSchema, // Sub-documento para detalles específicos.
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

Anuncio.discriminator("Empleos", JobDetails);
Anuncio.discriminator("Productos", ProductDetails);
Anuncio.discriminator("Inmuebles", PropertyDetails);
Anuncio.discriminator("Servicios", ServiceDetails);
Anuncio.discriminator("Vehicles", VehicleDetails);

module.exports = Anuncio;
