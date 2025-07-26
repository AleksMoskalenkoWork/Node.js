const express = require('express');
const Article = require('../schema/article');
const router = express.Router();

module.exports = function () {
  router.get('/', async (req, res) => {
    const article = await Article.findOne('Луї Блеріо');
    res.render('main', { article });
  });

  // router.get('/article/:url', async (req, res) => {
  //   const article = await articlesCollection.findOne({ url: req.params.url });
  //   res.render('article', { article });
  // });

  return router;
};
