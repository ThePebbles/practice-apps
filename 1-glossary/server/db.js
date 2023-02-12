require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017/glossary', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('db connected');
})
.catch((err) => {
  console.log('db failed to connect: ', err);
});
// 2. Set up any schema and models needed by the app
const entries = new Schema({
  'word': String,
  'definition': String
})

const Entries = mongoose.model('Entries', entries);
// 3. Export the models
module.exports.Entries = Entries;
// 4. Import the models into any modules that need them
