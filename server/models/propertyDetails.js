const mongoose = require('mongoose');

const propertyDetailsSchema = new mongoose.Schema({
  propertyType: String, // Tipo de propiedad como casa, departamento, etc.
  transactionType: String, // Tipo de transacción como venta, alquiler, etc.
  condition: String, // Condición de la propiedad
  rooms: Number, // Número de habitaciones en la propiedad
  bathrooms: Number, // Número de baños en la propiedad
  area: Number, // Área de la propiedad en metros cuadrados
  petsAllowed: Boolean, // Si se permiten mascotas en la propiedad
  furnished: Boolean, // Si la propiedad está amoblada
  parking: Boolean, // Si la propiedad tiene estacionamiento
  features: [String], // Características adicionales de la propiedad
  equipment: [String], // Equipamiento de la propiedad
  services: [String], // Servicios incluidos en la propiedad
  paymentMethods: [String], // Métodos de pago para la propiedad
  negotiable: Boolean, // Si el precio de la propiedad es negociable
  exchange: Boolean, // Si se aceptan intercambios por la propiedad
});

module.exports = propertyDetailsSchema;