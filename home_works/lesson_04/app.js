const config = require('config');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/json', (req, res) => {
  res.json({
    title: 'express',
    success: 1,
  });
});

app.get('/redirect', (req, res) => {
  res.redirect('/json');
});

app.get('/goods/:id', (req, res) => {
  res.json({
    url: req.url.split('/')[1],
    id: req.params.id,
  });
});

app.get('/q', (req, res) => {
  res.json(req.query);
});

app.get('/random', (req, res) => {
  res.json({
    min: Number(req.query.min),
    max: Number(req.query.max),
    random:
      Math.floor(
        Math.random() * (Number(req.query.max) - Number(req.query.min) + 1)
      ) + Number(req.query.min),
  });
});

app.use((req, res) => {
  res.status(400).send('not found');
});

app.listen(config.port, () => {
  console.log(
    `Server listen port: ${config.port}, and run on http://localhost:${config.port}`
  );
});
