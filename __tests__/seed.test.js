process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const generateData = require('../server/database/generateSeedData');
const dbMethods = require('../server/database/database');

const db = mongoose.connection;

beforeAll(async (done) => {
  let seed = generateData();

  try {
    await dbMethods.setProductSizesAsync(seed);
  } catch(err) { console.error(err); }
  done();
});

afterAll(async (done) => {
  await db.dropDatabase();
  await db.close();
  done();
});

describe('Seeding script', () => {
  test('Seeding script seeds 100 documents', async () => {
    let data;
    data = await dbMethods.getProductSizesAsync();
    expect(data.length).toBe(100);
  });

  test('Seeds are not the same data', async () => {
    let data;
    data = await dbMethods.getProductSizesAsync();
    expect(JSON.stringify(data[0])).not.toEqual(JSON.stringify(data[1]));
  });
});