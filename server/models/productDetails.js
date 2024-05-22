const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
  brand: String, // Marca del producto
  condition: String, // Condición del producto
  model: String, // Modelo del producto
  color: String, // Color del producto
  weight: String, // Peso del producto
  dimensions: String, // Dimensiones del producto
  materials: String, // Materiales del producto
  warranty: String, // Garantía del producto
  features: [String], // Características del producto
  equipment: [String], // Equipamiento del producto
  services: [String], // Servicios incluidos con el producto
  paymentMethods: [String], // Métodos de pago para el producto
  delivery: Boolean, // Entrega a domicilio para el producto
  negotiable: Boolean, // Precio negociable para el producto
  exchange: Boolean, // Se aceptan intercambios para el producto
  shipping: Boolean, // Envíos para el producto
});

module.exports = productDetailsSchema;