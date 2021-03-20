const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/database.js');

app.use('/:id', express.static('./public'))
app.use(cors());

app.get('/api/sizes/:id', (req, res) => {
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));
});

module.exports = app;