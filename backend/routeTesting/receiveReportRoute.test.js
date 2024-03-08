const request = require('supertest');
const pool = require("../database/db");
const app = require('../app'); 
jest.mock('../database/db', () => ({
  query: jest.fn()
}));


describe('GET /receiveReport route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Correctly generates report', async() => {
    const time = new Date();
    pool.query.mockResolvedValueOnce({ rows: [{email: 'dummy@gmail.com'}]});
    pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, sender_email: "Bob", sent_at: time}]});

    const res = await request(app).get('/receiveReport?uid=1');
    expect(res.status).toBe(200)
  });
  it('Query not supplied', async() => {
    const res = await request(app).get('/receiveReport');
    expect(res.status).toBe(400)
  })
});