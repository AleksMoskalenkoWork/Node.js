const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    caption: { type: String },
    image: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

const Article = mongoose.model('pages', articleSchema);

module.exports = Article;
