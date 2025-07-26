const i18n = require('i18n');
const path = require('path');
const config = require('config');
const express = require('express');
const morgan = require('morgan');

const connectDB = require('./db/db');

const app = express();

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

app.set('view engine', 'pug');
app.set('views', './views');

app.use(
  morgan('tiny', {
    skip: (req) => req.url.startsWith('/.well-known'),
  })
);

app.use('/', require('./middleware/setLang'));

connectDB().then(() => {
  app.use('/:lang', require('./routes/main')());
  app.use('/:lang/page', require('./routes/page')());

  app.listen(config.port, () => {
    console.log('Сервер запущено на http://localhost:' + config.port);
  });
});
