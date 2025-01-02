const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
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
        return /^(\+51)?\d{9}$/.test(v);
      },
      message: (props) => `${props.value} no es un número de teléfono válido!`,
    },
  },
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
    images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;