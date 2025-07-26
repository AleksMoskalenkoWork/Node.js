const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    caption: { type: Object },
    image: { type: String },
    text: { type: Object },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

const Article = mongoose.model('pages', articleSchema);

module.exports = Article;
