const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');

let db, connection;
let collection = 'productSizes';

/* Unable to require() seed files, manually added functions here
 * Not ideal, as there are multiple sources of truth
 */
const generateData = () => {
  let data = [];
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

  for (let id = 1; id <= 100; id++) {
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
    data.push(document);
  }

  return data;
};

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

function setProductSizes(documents, callback) {
  productSizes.insertMany(documents, (err, docs) => {
    if (err) { return callback(err);}
    return callback(null, docs);
  });
}

function getProductSizes(callback) {
  productSizes.find({}, (err, docs) => {
    if (err) { return callback(err);}
    return callback(null, docs);
  });
}

function getProductSize(id, callback) {
  productSizes.find({id: id}, (err, docs) => {
    if (err) { return callback(err);}
    return callback(null, docs);
  });
}

const setProductSizesAsync = Promise.promisify(setProductSizes);
const getProductSizesAsync = Promise.promisify(getProductSizes);

beforeAll(async (done) => {
  connection = await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true });
  db = mongoose.connection;
  await db.createCollection(collection);
  done();
});

afterAll(async (done) => {
  await db.dropCollection(collection);
  await db.dropDatabase();
  await db.close();
  await mongoose.connection.close();
  done();
});

describe('Seeding script', () => {
  test('Seeding script seeds 100 documents', async () => {
    let seed = generateData();
    let data;

    try {
      await setProductSizesAsync(seed);
      data = await getProductSizesAsync();
    } catch(err) { console.error(err); }

    expect(data.length).toBe(100);
  });

  test('Seeds are not the same data', async () => {
    let seed = generateData();
    let data;

    try {
      await setProductSizesAsync(seed);
      data = await getProductSizesAsync();
    } catch(err) { console.error(err); }

    expect(JSON.stringify(data[0])).not.toEqual(JSON.stringify(data[1]));
  });
});