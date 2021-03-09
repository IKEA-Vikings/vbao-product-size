const express = require('express');
const app = express();
const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./database'));
const PORT = 3000;

app.use(express.static('./public'))

app.get('/api/:id', (req, res) => {
  console.log(req.params.id);
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result[0].sizes);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));