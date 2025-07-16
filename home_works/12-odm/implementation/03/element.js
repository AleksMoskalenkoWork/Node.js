const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthDate: {
      type: String,
      match: [/^\d{4}-\d{2}-\d{2}$/],
    },
    email: {
      type: String,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    },
    phone: {
      type: String,
      match: [/^\+\d{12}$/],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

const Element = mongoose.model('elements', elementSchema);

module.exports = Element;
