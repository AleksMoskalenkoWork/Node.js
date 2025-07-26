const express = require('express');
const Article = require('../schema/article');
const router = express.Router();

module.exports = function () {
  router.get('/', async (req, res) => {
    try {
      const articles = await Article.find();
      const article = articles[0];
      res.render('main', { article });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

  return router;
};
