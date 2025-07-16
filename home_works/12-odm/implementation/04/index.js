const mongoose = require('mongoose');
const Element = require('./element');

const mongoURL = 'mongodb://localhost:27017/storage';

const document = require('./document');

async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
}

async function run() {
  await connectDB();

  try {
    const model = new Element(document);
    await model.save();
  } catch (err) {
    console.error('Save error:', err);
  } finally {
    mongoose.disconnect();
  }
}

run();
