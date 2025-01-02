const mongoose = require("mongoose");

const postCounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

const PostCounter = mongoose.model("PostCounter", postCounterSchema);

module.exports = PostCounter;