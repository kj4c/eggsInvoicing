const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');

const { describe, beforeEach, afterEach, it, expect } = require('@jest/globals');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));
const email = 'dummy@gmail.com';
const body = {
  email: email
};

describe('/fetchAllSent route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid Email', async () => {
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/fetchAllSent').query(body);
    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual('Invalid Email');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select email from users where email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
  });

  it('Valid Email ID', async () => {
    const expected = [
      {
        invoice_id: 8,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        xml_invoices: '{xml1}',
        sent_at: '2024-03-05T05:22:57.907Z'
      },
      {
        invoice_id: 9,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        xml_invoices: '{xml1}',
        sent_at: '2024-03-05T05:23:50.637Z'
      }
    ];

    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await request(app).get('/receive/fetchAllSent').query(body);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(2);
    let q = 'select email from users where email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
    q = 'select * from sent_invoices where sender_email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
  });
});

