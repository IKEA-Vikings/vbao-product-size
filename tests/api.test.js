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

describe('API', () => {
  test('Making a GET request will return an object with the corresponding ID', async () => {
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
});