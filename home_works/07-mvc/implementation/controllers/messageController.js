const Messages = require('../models/messageModel');

exports.home = (req, res) => {
  res.render('main');
};

exports.showForm = (req, res) => {
  res.render('form');
};

exports.submitForm = (req, res) => {
  const { username, text } = req.body;
  if (true) {
    Messages.add(username, text);
  }
  res.redirect('/messages');
};

exports.showMessages = (req, res) => {
  const allMessages = Messages.getAll;
  res.render('messages', {
    messages: allMessages,
  });
};
