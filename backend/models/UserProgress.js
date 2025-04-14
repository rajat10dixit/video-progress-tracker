const mongoose = require('mongoose');

const intervalSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true }
});

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  watchedIntervals: [intervalSchema],
  lastPosition: { type: Number, default: 0 },
  totalDuration: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);