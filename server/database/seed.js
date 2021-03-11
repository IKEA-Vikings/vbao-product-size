const Promise = require('bluebird');

const db = require('./database.js');
const seed = Promise.promisify(db.setProductSizes);

const models = require('./databaseModels.js');
const productSizes = models.productSizes;

const generateSeedData = require('./generateSeedData.js');


/* Data Insertion */
productSizes.deleteMany();
let data = generateSeedData();
seed(data)
  .then((results) => {
    console.log(results);
  })
  .catch(err => console.error(err));