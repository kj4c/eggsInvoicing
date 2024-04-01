const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');

const { describe, beforeEach, afterEach, it, expect } = require('@jest/globals');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = '123';
const email = 'dummy@gmail.com';
const loDate = '10/03/2024';
const hiDate = '12/03/2024';

const body = {
  uid: uid,
  fromDate: loDate,
  toDate: hiDate
};

describe('/fetchByDateRange/v2 route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/fetchByDateRange/v2').query(body);
    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual('Invalid User');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid User Id, invalid date ranges', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    const body = {
      uid: uid,
      fromDate: hiDate,
      toDate: loDate
    };
    const response = await request(app).get('/receive/fetchByDateRange/v2').query(body);
    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual('fromDate is larger than toDate');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid uid and dates but no emails in date range', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});
    const body = {
      uid: uid,
      fromDate: hiDate,
      toDate: hiDate
    };
    const response = await request(app).get('/receive/fetchByDateRange/v2').query(body);
    expect(response.status).toBe(200);
    expect(response.body.message).toStrictEqual('No emails found within given date range');

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select * from sent_invoices where receiver_email = $1 and (select sent_at::date AT TIME ZONE \'Australia/Sydney\')  between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
    expect(pool.query).toHaveBeenCalledWith(q, [email, hiDate, hiDate]);
  });

  it('Valid uid, dates and has emails in date range', async () => {
    const expected = [
      {
        invoice_id: 564,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        invoices: [
          'xml1'
        ],
        type: 'XML',
        sent_at: '2024-03-11T23:56:46.825Z'
      },
      {
        invoice_id: 565,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        invoices: [
          'xml1'
        ],
        type: 'XML',
        sent_at: '2024-03-11T23:58:39.111Z'
      }
    ];

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await request(app).get('/receive/fetchByDateRange/v2').query(body);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select * from sent_invoices where receiver_email = $1 and (select sent_at::date AT TIME ZONE \'Australia/Sydney\')  between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
    expect(pool.query).toHaveBeenCalledWith(q, [email, loDate, hiDate]);
  });
});
