// utils/getNextShortId.js
const Counter = require("../models/counterModel");

const getNextShortId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "shortId" },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequenceValue;
};

module.exports = getNextShortId;
