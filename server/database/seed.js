const mongoose = require('mongoose');
const db = require('./database.js');
const models = require('./databaseModels.js');
const generateSeedData = require('./generateSeedData.js');


/* Data Insertion */
models.productSizes.deleteMany();
let data = generateSeedData();
db.setProductSizesAsync(data)
  .then((results) => {
    console.log(results);
  })
  .catch(err => console.error(err))
  .then(() => mongoose.disconnect());