const config = require('config');
const bodyParser = require('body-parser');

const express = require('express');
const morgan = require('morgan');

const connectDB = require('./db/db');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  morgan('tiny', {
    skip: (req) => req.url.startsWith('/.well-known'),
  })
);

connectDB().then(() => {
  app.use('/', require('./routes/article')());
  app.use('/', require('./routes/comments')());

  app.listen(config.port, () => {
    console.log('Сервер запущено на http://localhost:' + config.port);
  });
});
