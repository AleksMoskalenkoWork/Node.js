const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const he = require('he');

const bodyParser = require('body-parser');
const app = express();
const mongoUrl = 'mongodb://localhost:27017/site';
const client = new MongoClient(mongoUrl);
let tasksCollection, usersCollection;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl,
      collectionName: 'sessions',
      ttl: 60 * 60,
    }),
    secret: 'empty',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

async function dbConnect() {
  try {
    await client.connect();
    const db = client.db('site');
    tasksCollection = db.collection('tasks');
    usersCollection = db.collection('users');
  } catch (err) {
    process.exit(1);
  }
}

app.use(
  morgan('tiny', {
    skip: (req) => req.url.startsWith('/.well-known'),
  })
);

app.use((req, res, next) => {
  app.locals.username = req.session?.user || null;
  next();
});

app.get('/', (req, res) => {
  console.log(req.session.user);
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
    const { email, password } = req.body;
    const formatData = {
      email: he.encode(`${email.trim().toLowerCase()}`),
    };
    const user = await usersCollection.findOne({
      email: `${formatData.email}`,
    });

    if (!user) {
      return res.render('login', { error: 'login or password is incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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
    const { email, password, role } = req.body;
    const formatData = {
      email: he.encode(`${email.trim().toLowerCase()}`),
      password: he.encode(`${password.trim().toLowerCase()}`),
      role: he.encode(`${role.trim().toLowerCase()}`),
    };
    const user = await usersCollection.findOne({
      email: `${formatData.email}`,
    });

    if (!user) {
      req.session.email = formatData.email;

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(formatData.password, saltRounds);
      const result = await usersCollection.insertOne({
        email: formatData.email,
        password: hashPassword,
        role: formatData.role,
        createdAt: new Date().toISOString(),
      });

      return res.render('login', {
        message: 'user created successfully, please login',
      });
    } else {
      return res.render('registration', { error: 'user exists' });
    }
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.get('/dashboard', async (req, res) => {
  try {
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
