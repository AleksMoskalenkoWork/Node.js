const mongoose = require('mongoose');
const commentsSchema = require('./comments');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String },
    content: { type: String },
    comments: [commentsSchema],
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

const Article = mongoose.model('articles', articleSchema);

module.exports = Article;
