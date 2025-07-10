const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const session = require('express-session');

const mongoUrl = 'mongodb://localhost:27017/site';
const client = new MongoClient(mongoUrl);

async function dbConnect() {
  try {
    await client.connect();
    const db = client.db('site');
    return db;
  } catch (err) {
    process.exit(1);
  }
}

function createSession() {
  return session({
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
  });
}

module.exports = { dbConnect, createSession };
