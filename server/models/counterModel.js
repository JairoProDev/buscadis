// models/counterModel.js
const mongoose = require("mongoose");

const adCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 }
});

module.exports = mongoose.model("Counter", adCounterSchema);
