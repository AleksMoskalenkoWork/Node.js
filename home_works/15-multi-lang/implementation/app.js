const i18n = require('i18n');
const path = require('path');
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

i18n.configure({
  locales: config.locales,
  directory: path.join(__dirname, '/locales'),
  defaultLocale: config.defaultLocale,
  autoReload: true,
  queryParameter: 'lang',
  cookie: 'lang',
  updateFiles: false,
  syncFiles: false,
});

app.use(i18n.init);

connectDB().then(() => {
  app.use('/:lang', require('./routes/main')());

  app.listen(config.port, () => {
    console.log('Сервер запущено на http://localhost:' + config.port);
  });
});
