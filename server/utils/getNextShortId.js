// utils/getNextShortId.js
const Counter = require("../models/counterModel");

const getNextShortId = async () => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "shortId" },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    if (!counter) {
      throw new Error('Counter document not found or failed to update.');
    }
    return counter.sequenceValue;
  } catch (error) {
    console.error('Error getting next shortId:', error);
    // Aquí podrías decidir cómo manejar este error. Por ejemplo, podrías:
    // - Retornar un valor específico que indique un error.
    // - Lanzar el error para manejarlo más arriba en la cadena de llamadas.
    // - Intentar recuperar el contador o inicializarlo si es necesario.
  }
};

module.exports = getNextShortId;