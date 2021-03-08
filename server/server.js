const express = require('express');
const app = express();
const Promise = require('bluebird');
const db = Promise.promisifyAll(require('./database'));
const PORT = 3000;

app.use(express.static('./public'))

app.get('/api/:id', (req, res) => {
  console.log(req);
  db.getProductSizeAsync(req.param.id)
    .then((res) => {
      console.log(res);
      res.send('OK');
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));