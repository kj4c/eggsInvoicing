const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');
const { describe, beforeEach, afterEach, it, expect } = require('@jest/globals');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = 123;
const body = {
  uid: uid
};

describe('/getNotifications route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/getNotifications').query(body);
    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual('Invalid User');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Should return a list of notifications if user has notifications', async () => {
    const expected = {
      invoice_id: 630,
      sender_email: 'dummy@gmail.com',
      receiver_email: 'dummy@gmail.com',
      xml_invoices: '{xml1}',
      sent_at: '2024-03-09T04:38:43.305Z'
    };
    const invoice_id = expected.invoice_id;

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({ rows: [{notifications: [invoice_id]}]});
    pool.query.mockResolvedValueOnce({ rows: [{expected}]});

    const response = await request(app).get('/receive/getNotifications').query(body);

    expect(response.status).toBe(200);
    expect(response.body.notifications[0].expected).toStrictEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(4);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select notifications from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select * from sent_invoices where invoice_id = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [invoice_id]);
    q = 'update users set notifications = \'{}\' where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Should return no notifications found for users with no notifications', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: []});
    const response = await request(app).get('/receive/getNotifications').query(body);

    expect(response.status).toBe(200);
    expect(response.body.message).toStrictEqual('No new notifications');

    expect(pool.query).toHaveBeenCalledTimes(2);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select notifications from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });
});
