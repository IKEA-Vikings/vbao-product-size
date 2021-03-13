process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server/app');
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

describe('GET /api/sizes/:id', () => {
  test('will return an object with the corresponding ID', async () => {
    const test_id_1 = 1;
    const test_id_5 = 5;
    let res1, res2;

    try {
      const response1 = await request(app).get(`/api/sizes/${test_id_1}`);
      res1 = response1.body.id;
      const response2 = await request(app).get(`/api/sizes/${test_id_5}`);
      res2 = response2.body.id;
    } catch(err) {console.error(err)}

    expect(res1).toBe(1);
    expect(res2).toBe(5);
  });

  test('will return an object with accessible sizes', async () => {
    let res1;
    const newItem = {
      id:101,
      sizes: [
        {
          "name" : "width",
          "unit" : "in",
          "size" : "5"
        },
        {
          "name" : "length",
          "unit" : "in",
          "size" : "42"
        }
      ]
    };

    try {
      await dbMethods.setProductSizesAsync(newItem);
    } catch(err) { console.error(err); }

    try {
      const response1 = await request(app).get(`/api/sizes/${newItem.id}`);
      res1 = response1.body.sizes;
    } catch(err) {console.error(err)}

    expect(res1.length > 0).toBe(true);
  });

  test('will return undefined if there are no sizes for the given item', async () => {
    const newItem = {id:101};
    let res1;

    try {
      await dbMethods.setProductSizesAsync(newItem);
    } catch(err) { console.error(err); }

    try {
      const response1 = await request(app).get(`/api/sizes/${newItem.id}`);
      res1 = response1.body.size;
    } catch(err) {console.error(err)}

    expect(res1).toBeUndefined();
  });

  test('will respond with error message if id does not exist', async () => {
    let result;
    const test_id_999 = 999;

    try {
      const response = await request(app).get(`/api/sizes/${test_id_999}`);
      result = response.body;
    } catch(err) {console.error(err)}

    expect(Object.keys(result).length).toBe(0);
  });
});