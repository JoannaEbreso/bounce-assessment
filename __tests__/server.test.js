// __tests__/server.test.js
const request = require('supertest');
const app = require('../src/server'); // Import your Express app

describe('API Tests', () => {
    // afterAll(() => {
    //     app.close();
    //   });
  test('GET /api/country/:name should return data', async () => {
    console.log(app);
    const response = await request(app).get('/api/country/usa');
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Data successfully retrieved!');
    expect(response.body).toHaveProperty('data');
  });
});
