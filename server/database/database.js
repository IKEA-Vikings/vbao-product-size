const Promise = require('bluebird');
const mongoose = require('mongoose');
const models = require('./databaseModels.js');
const productSizes = models.productSizes;
const singleSize = models.singleSize;

mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => console.log('Connection successful!'));

const db = {
  setProductSizes: (documents, callback) => {
    productSizes.insertMany(documents, (err, docs) => {
      if (err) { return callback(err); }
      return callback(docs);
    });
  },

  getProductSizes: (callback) => {
    productSizes.find({}, (err, docs) => {
      if (err) { return callback(err); }
      return callback(docs);
    });
  },

  getProductSize: (id, callback) => {
    productSizes.find({id: id}, (err, docs) => {
      if (err) { return callback(err); }
      return callback(docs);
    });
  }
};

const dbAsync = Promise.promisifyAll(db, {suffix: "Async"});

module.exports = {...dbAsync};