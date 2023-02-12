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
  next();
})

app.get('/', (req, res) => {
  res.redirect('/word');
});

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
  var oldWord = req.body.word.old;
  var newWord = req.body.word.new;
  var oldDefinition = req.body.definition.old;
  var newDefinition = req.body.deifnition.new;
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
