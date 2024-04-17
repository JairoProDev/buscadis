// VisitorCount.js
const mongoose = require('mongoose');

const VisitorCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('VisitorCount', VisitorCountSchema);