const path = require('path');
const morgan = require('morgan');
const messageRoutes = require('./routes/messageRoutes');
const errorRoute = require('./routes/errorRoute');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', messageRoutes);
app.use('/', errorRoute);

app.use((req, res) => {
  res.redirect('/not-found');
});

module.exports = app;
