// utils/getNextAdShortId.js
const Counter = require("../models/counterModel");

const getNextAdShortId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'adShortId' },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequenceValue;
};

module.exports = getNextAdShortId;
