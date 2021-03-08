const express = require('express');
const app = express();
const Promise = require('bluebird');
const db = Promise.promisifiyAll(require('./database'));
const PORT = 3000;

app.use(express.static('./public'))
app.listen(PORT);

app.get('/api/:id', (req, res) => {
  console.log(req);
  db.getProductSizeAsync(req.param.id)
    .then((res) => { return console.log(res); })
    .catch();
});