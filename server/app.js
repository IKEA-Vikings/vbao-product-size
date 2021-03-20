const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const db = require('./database/database.js');

app.use(express.static('./public'))
app.use(cors());

var corsOptions = {
  origin: /localhost:300[0-4]$/,
  method: 'GET'
};
app.get('/api/sizes/:id', cors(corsOptions), (req, res) => {
  db.getProductSizeAsync(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error(err));

  axios.get(`http://localhost:3004/api/images/type/size/${req.params.id}`)
  .then((res) => {
    this.setState({image: res.data.sizeService});
  })
  .catch((err) => console.error(err));
});

module.exports = app;