const { expect } = require('@jest/globals');
const pool = require('../database/db');
const fetchAllSent = require('../functions/fetchAllSent');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const email = 'dummy@gmail.com';

describe('Test suite for fetchAllSent()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(fetchAllSent(email)).rejects.toThrowError('Invalid Email');
    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select email from users where email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
  });

  it('Valid User Id', async () => {
    const expected = [
      {
        invoice_id: 8,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        invoices: '{xml1}',
        type: 'xml',
        sent_at: '2024-03-05T05:22:57.907Z'
      },
      {
        invoice_id: 9,
        sender_email: 'dummy@gmail.com',
        receiver_email: 'dummy@gmail.com',
        invoices: '{xml1}',
        type: 'xml',
        sent_at: '2024-03-05T05:23:50.637Z'
      }
    ];

    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await fetchAllSent(email);
    expect(response).toEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(2);
    let q = 'select email from users where email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
    q = 'select * from sent_invoices where sender_email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
  });
});