const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');
const { describe, beforeEach, afterEach, it, expect } = require('@jest/globals');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('/receiveEmail route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('receives the email correctly', async () => {
    const receiveEmailString = {
      uid: '1',
      invoiceId: 1
    };
    const uid = receiveEmailString.uid;
    const invoiceId = receiveEmailString.invoiceId;

    const email = 'dummy@gmail.com';
    pool.query.mockResolvedValueOnce({ rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({ rows: [{receiver: 'Tom', invoice_id: 123}]});
    const response = await request(app)
      .get('/receiveEmail')
      .query(receiveEmailString);

    expect(response.status).toBe(200);
    expect(response._body.message).toBe('Success');

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith('SELECT email FROM users WHERE uid = $1', [uid]);
    const q = 'SELECT receiver_email, invoice_id FROM sent_invoices WHERE receiver_email = $1 AND invoice_id = $2';
    expect(pool.query).toHaveBeenCalledWith(q, [email, invoiceId]);
  });

  it('no uid or invoiceId found.', async () => {
    const receiveEmailString = {
      uid: '132',
      invoiceId: 1
    };
    const uid = receiveEmailString.uid;
    const invoiceId = receiveEmailString.invoiceId;
    const email = 'dummy@gmail.com';

    pool.query.mockResolvedValueOnce({ rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({ rows: []});
    const response = await request(app)
      .get('/receiveEmail')
      .query(receiveEmailString);

    expect(response.status).toBe(400);
    expect(response._body.message).toBe('Email not received.');

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith('SELECT email FROM users WHERE uid = $1', [uid]);
    const q = 'SELECT receiver_email, invoice_id FROM sent_invoices WHERE receiver_email = $1 AND invoice_id = $2';
    expect(pool.query).toHaveBeenCalledWith(q, [email, invoiceId]);
  });
});
