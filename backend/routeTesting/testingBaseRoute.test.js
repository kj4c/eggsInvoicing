const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('responds with Hello world!', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200);

    expect(response.text).toEqual('Hello world!');
  });
});
