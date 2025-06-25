const config = require('config');
const path = require('path');
const fs = require('fs');
const messageJson = require('./message.json');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('main', {});
});

app.get('/form', (req, res) => {
  res.render('form', {});
});

app.post('/form', (req, res) => {
  const { username, message } = req.body;

  const fileName = path.join(__dirname, 'message.json');
  const createTime = new Date().toLocaleTimeString();
  const feedbackTemplate = {
    createTime: `${createTime}`,
    username: `${username}`,
    message: `${message}`,
  };

  messageJson.push(feedbackTemplate);

  fs.writeFile(fileName, JSON.stringify(messageJson, null, 2), (error) => {
    if (error) throw new Error('Sorry! Something went wrong.');
    res.redirect('/form');
  });
});

app.get('/guests', (req, res) => {
  res.render('guests', { guests: messageJson });
});

app.listen(config.port, () => {
  console.log(
    `Server listen port: ${config.port}, and run on http://localhost:${config.port}`
  );
});
