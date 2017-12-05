const express = require('express');
const router = express.Router();
const database = require('../database/db');

router.get('/quotes', (req, res) => {
  database.find({}, (err, docs) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong!' })
    } else {
      res.status(200).json({ data: docs })
    }
  })
})

router.post('/quotes', (req, res) => {
  var doc = {
    quote: req.body.quote,
    author: req.body.author,
  }
  database.insert(doc, (err, newDoc) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong!' })
    } else {
      res.status(201).json({ data: newDoc })
    }
  })
})

router.get('/quotes/:id', (req, res) => {
  database.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong!' })
    } else {
      res.status(200).json({ data: doc })
    }
  })
})

router.put('/quotes/:id', (req, res) => {
  database.update({ _id: req.params.id}, { $set: req.body },
    (err, numReplaced) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong!' })
    } else {
      res.status(204).end();
    }
  })
})

router.delete('/quotes/:id', (req, res) => {
  database.remove({ _id: req.params.id }, (err, numRemoved) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong!' })
    } else {
      res.status(200).json({ data: 'Success!' })
    }
  })
})

module.exports = router;
