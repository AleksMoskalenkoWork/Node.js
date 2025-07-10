const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const he = require('he');
const bodyParser = require('body-parser');
const { createSession, dbConnect } = require('./DBConnection');

const app = express();

let tasksCollection, usersCollection, db;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(createSession());

app.use(
  morgan('tiny', {
    skip: (req) => req.url.startsWith('/.well-known'),
  })
);

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/common', (req, res) => {
  res.render('common');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('registration');
});

app.post('/login', async (req, res) => {
  try {
    db = await dbConnect();
    usersCollection = db.collection('users');
    const email = he.encode(req.body.email.trim().toLowerCase());
    const user = await usersCollection.findOne({ email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.render('login', { error: 'login or password is incorrect' });
    }

    req.session.email = user.email;
    req.session.role = user.role;

    return res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.post('/register', async (req, res) => {
  try {
    db = await dbConnect();
    usersCollection = db.collection('users');
    const email = he.encode(req.body.email.trim().toLowerCase());
    const password = he.encode(req.body.password.trim());
    const role = he.encode(req.body.role.trim().toLowerCase());

    const user = await usersCollection.findOne({ email });
    if (user) {
      return res.render('registration', { error: 'user exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      email,
      password: hashPassword,
      role,
      createdAt: new Date().toISOString(),
    });
    req.session.email = email;

    return res.render('login', {
      message: 'user created successfully, please login',
    });
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.get('/dashboard', async (req, res) => {
  try {
    db = await dbConnect();
    tasksCollection = db.collection('tasks');
    if (!req.session.email) return res.redirect('/login');

    const tasksByRole = await tasksCollection
      .find({
        role: req.session.role,
      })
      .toArray();
    console.log(tasksByRole);

    res.render('dashboard', {
      email: req.session.email,
      tasks: tasksByRole,
    });
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

dbConnect().then(() => {
  app.listen(3500, () => {
    console.log('Server http://localhost:3500');
  });
});
