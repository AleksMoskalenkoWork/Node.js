const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    model: {
      type: String,
    },
    year: {
      type: Number,
      min: 1980,
      max: 2026,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    vin: {
      type: String,
      match: [/^[A-HJ-NPR-Z0-9]+$/],
      minlength: 17,
      maxlength: 17,
      // or
      // match: [/^[A-HJ-NPR-Z0-9]{17}$/],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

const Element = mongoose.model('elements', elementSchema);

module.exports = Element;
