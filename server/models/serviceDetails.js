const mongoose = require('mongoose');

const serviceDetailsSchema = new mongoose.Schema({
  serviceType: String, // Tipo de servicio
  transactionType: String, // Tipo de transacción como venta, alquiler, etc.
  hours: Number, // Horas requeridas para el servicio
  delivery: Boolean, // Entrega a domicilio para el servicio
  negotiable: Boolean, // Precio negociable para el servicio
  exchange: Boolean, // Se aceptan intercambios para el servicio
  shipping: Boolean, // Envíos para el servicio
  paymentMethods: [String], // Métodos de pago para el servicio
});

module.exports = serviceDetailsSchema;