const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
  {
    visible: { type: Boolean, default: true },
    text: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

module.exports = commentsSchema;
