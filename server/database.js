const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => console.log('Connection successful!'));

const singleSizeSchema = new Schema({
  name: String,
  size: String,
  unit: String
});

const productSizesSchema = new Schema({
  sizes: {
    type: [singleSizeSchema],
    default: undefined
  }
});

const singleSize = mongoose.model('singleSize', singleSizeSchema);
const productSizes = mongoose.model('productSizes', productSizesSchema);

function setProductSizes(documents, callback) {
  productSizes.insertMany(documents, (err, docs) => {
    if (err) { return callback(err);}
    callback(null, docs);
  });
}

function getProductSizes(documents, callback) {
  productSizes.find({}, (err, docs) => {
    if (err) { return callback(err);}
    callback(null, docs);
  });
}

module.exports = {
  setProductSizes,
  getProductSizes,
  productSizes
};