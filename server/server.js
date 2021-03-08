const express = require('express');
const app = express();
const Promise = require('bluebird');
const db = Promise.promisifiyAll(require('./database'));
const PORT = 3000;

app.use(express.static('./public'))

app.get('/api/:id', (req, res) => {
  console.log(req);
  db.getProductSizeAsync(req.param.id)
    .then((res) => {
      console.log(res);
      res.send('OK');
    })
    .catch();
});

app.listen(PORT, `Listening on http://localhost:${PORT}`);