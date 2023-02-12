require("dotenv").config();
const mongoose = require("mongoose");
const models = require('./db.js');
const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

app.use('/static', express.static(path.join(__dirname, 'client/src')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

app.get('/', (req, res) => {
  res.redirect('/word');
});

app.get('/filter', (req, res) => {
  var filter = req.query.query;
  filter = filter.toLowerCase();
  var regex = new RegExp(filter, 'i');
  models.Entries.find({$or: [{'word': {$regex: regex}}, {'definition': {$regex: regex}}]})
  .then((results) => {
    console.log('results from filter: ', results);
    res.status(200).send(results);
  })
  res.status(200).send[{'word': 'hello', 'definition': 'pebbles'}];
})

app.get('/word', (req, res) => {
  models.Entries.find({})
  .then((results) => {
    console.log('results from GET:', results);
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

app.post('/word', (req, res) => {
  var word = req.body.word;
  var definition = req.body.definition;
  models.Entries.create({'word': word, 'definition': definition})
  .then((results) => {
    console.log('POST went through: ', results);
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

app.put('/word', (req, res) => {
  console.log('req body: ', req.body)
  var oldWord = req.body.word.old;
  var newWord = req.body.word.new;
  var oldDefinition = req.body.definition.old;
  var newDefinition = req.body.definition.new;
  // var oldWord = req.body.oldWord;
  // var newWord = req.body.newWord;
  // var oldDefinition = req.body.oldDefinition;
  // var newDefinition = req.body.newDefinition;
  models.Entries.findOneAndReplace({'word': oldWord, 'definition': oldDefinition}, {'word': newWord, 'definition': newDefinition})
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })

})

app.delete('/word', (req, res) => {
  var word = req.body.word;
  var definition = req.body.definition;
  models.Entries.findOneAndRemove({'word': word, 'definition': definition})
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
