const { expect } = require('@jest/globals');
const pool = require('../database/db');
const fetchAll = require('../functions/fetchAll');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uId = 123;
const email = 'dummy@gmail.com';

describe('Test suite for fetchAll()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(fetchAll(uId)).rejects.toThrowError('Invalid User');
    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
  });

  it('Valid User Id', async () => {
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

    pool.query.mockResolvedValueOnce({rows: [{uid: uId}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await fetchAll(uId);
    expect(response).toEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = 'select * from sent_invoices where receiver_email = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [email]);
  });
});