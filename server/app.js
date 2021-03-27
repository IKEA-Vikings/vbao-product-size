const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database/database.js');
const path = require('path');

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.resolve('public')));
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/api/sizes/:id', (req, res) => {
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result);
    });
});

module.exports = app;