const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');
jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('GET /sentReport route', () => {
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
    pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, receiver_email: 'Bob', sent_at: time}]});

    const res = await request(app).get('/sentReport?uid=1');
    expect(res.status).toBe(200);
  });
  it('Query not supplied', async() => {
    const res = await request(app).get('/sentReport');
    expect(res.status).toBe(400);
  });
  it('Invalid uid', async() => {
    pool.query.mockResolvedValueOnce({ rows: []});
    pool.query.mockResolvedValueOnce({ rows: []});
    const res = await request(app).get('/sentReport?uid=0');
    expect(res.status).toBe(400);
  });
});