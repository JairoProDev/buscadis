const mongoose = require("mongoose");

const adCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", adCounterSchema);

module.exports = Counter;