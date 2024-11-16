const mongoose = require("mongoose");
const validator = require("validator");

const serviceSchema = new mongoose.Schema(
  {
    adType: { type: String, required: true, trim: true },
    category: { type: String, required: false, trim: true },
    subCategory: { type: String, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1800 },
    location: { type: String, trim: true },
    phone: {
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
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    size: {
      type: String,
      enum: ["miniatura", "normal", "largo", "grande", "gigante"],
      default: "normal",
    },
    images: [String],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
