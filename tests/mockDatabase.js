const Promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => console.log('Connection successful!'));

const singleSizeSchema = new Schema({
  name: String,
  size: String,
  unit: String
});

const productSizesSchema = new Schema({
  id: Number,
  sizes: {
    type: [singleSizeSchema],
    default: undefined
  }
});

const singleSize = mongoose.model('singleSize', singleSizeSchema);
const productSizes = mongoose.model('productSizes', productSizesSchema);

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