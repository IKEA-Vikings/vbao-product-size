const Promise = require('bluebird');
const db = require('./database.js');
const seed = Promise.promisify(db.setProductSizes);
const ProductSizes = db.productSizes;

/* Data Generation */
const generateData = () => {
  let data = [];
  let id = 1;
  const random = (max) => Math.floor(Math.random() * Math.floor(max));
  const sizeType = [
    ['length', 'in'],
    ['width', 'in'],
    ['height', 'in'],
    ['Thread count', '/in^2'],
    ['Filling weight', 'oz'],
    ['Total weight', 'oz'],
    ['Max. load', 'lb']
  ];

  for (let i = 0; i < 100; i++) {
    let document = { sizes: [] };
    let numSizes = random(8);

    for (let j = 0; j < numSizes; j++) {
      let temp = {};
      let index = random(4);
      //Pick random number
      temp['name'] = sizeType[index][0];
      //Add name and unit to temp
      temp['unit'] = sizeType[index][1];
      //Pick random size, add to temp
      temp['size'] = random(75);
      //Push temp to document[sizes];
      document.sizes.push(temp);
    }
    //push document to data
    document.id = id;
    id++;
    data.push(document);
  }

  return data;
};

/* Data Insertion */
ProductSizes.deleteMany();
let data = generateData();
seed(data)
  .then((results) => {
    console.log(results);
  })
  .catch(err => console.error(err));