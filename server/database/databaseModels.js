const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = {
  productSizes,
  singleSize
};