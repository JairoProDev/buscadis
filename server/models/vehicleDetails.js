const mongoose = require('mongoose');

const vehicleDetailsSchema = new mongoose.Schema({
  brand: String, // Marca del vehículo
  model: String, // Modelo del vehículo
  year: Number, // Año del modelo del vehículo
  color: String, // Color del vehículo
  condition: String, // Condición del vehículo
  mileage: Number, // Kilometraje del vehículo
  engineSize: String, // Tamaño del motor del vehículo
  warranty: String, // Garantía del vehículo
  features: [String], // Características del vehículo
  equipment: [String], // Equipamiento del vehículo
  negotiable: Boolean, // Precio negociable para el vehículo
  exchange: Boolean, // Se aceptan intercambios para el vehículo
});

module.exports = vehicleDetailsSchema;