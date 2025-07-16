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
    },
    email: {
      type: String,
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
