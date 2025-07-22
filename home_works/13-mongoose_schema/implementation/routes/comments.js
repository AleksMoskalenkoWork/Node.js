const express = require('express');
const Article = require('../schema/article');
const router = express.Router();

module.exports = function () {
  router.post('/:url/comments', async (req, res) => {
    try {
      const url = req.params.url;
      const article = await Article.findOne({ url });
      article.comments.push({ text: req.body.comment });
      await article.save();
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

  return router;
};
