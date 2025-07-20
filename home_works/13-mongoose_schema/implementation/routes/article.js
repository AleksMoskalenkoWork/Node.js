const express = require('express');
const Article = require('../schema/article');
const router = express.Router();

module.exports = () => {
  router.get('/', async (req, res) => {
    try {
      const articles = await Article.find();
      res.render('articles', { articles });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  return router;
};
