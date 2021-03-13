const Promise = require('bluebird');
const mongoose = require('mongoose');
const models = require('./databaseModels');
const dbname = process.env.NODE_ENV === 'test' ? 'ikea-test' : 'ikea';
const productSizes = models.productSizes;
const singleSize = models.singleSize;

mongoose.connect(`mongodb://localhost/${dbname}`, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => console.log('Connection successful!'));

const db = {
  setProductSizes: (documents, callback) => {
    productSizes.insertMany(documents, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  },

  getProductSizes: (callback) => {
    productSizes.find({}, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  },

  getProductSize: (id, callback) => {
    productSizes.find({id: id}, (err, docs) => {
      if (err) { return callback(err); }
      return callback(null, docs);
    });
  }
};

const dbAsync = Promise.promisifyAll(db, {suffix: "Async"});

module.exports = {...dbAsync};