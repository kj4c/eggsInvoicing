const { expect } = require('@jest/globals');
const pool = require('../database/db');
const fetchByDateRange = require('../functions/fetchByDateRange');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = 123;
const email = 'dummy@gmail.com';
const loDate = '10/03/2024';
const hiDate = '12/03/2024';

describe('Test suite for fetchByDateRange()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(fetchByDateRange(uid, loDate, hiDate)).rejects.toThrowError('Invalid User');
    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid User Id, invalid date ranges', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    await expect(fetchByDateRange(uid, hiDate, loDate)).rejects.toThrowError('fromDate is larger than toDate');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid uid and dates but no emails in date range', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await fetchByDateRange(uid, hiDate, hiDate);
    expect(response.message).toEqual('No emails found within given date range');

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select * from sent_invoices where receiver_email = $1 and sent_at::date between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
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

    const response = await fetchByDateRange(uid, loDate, hiDate);
    expect(response).toEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select * from sent_invoices where receiver_email = $1 and sent_at::date between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
    expect(pool.query).toHaveBeenCalledWith(q, [email, loDate, hiDate]);
  });
});