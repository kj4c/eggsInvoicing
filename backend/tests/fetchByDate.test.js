const { expect } = require('@jest/globals');
const pool = require('../database/db');
const fetchByDate = require('../functions/fetchByDate');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = 123;
const email = 'dummy@gmail.com';
const date = "11/03/2024";

describe('Test suite for fetchByDate()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(fetchByDate(uid, date)).rejects.toThrowError('Invalid User');
    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });
  
  it('Valid User Id but no emails in date', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await fetchByDate(uid, date);
    expect(response.message).toEqual('No emails found with given date');

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = "select * from sent_invoices where receiver_email = $1 and sent_at::date = (select to_date($2, 'DD/MM/YYYY'))";
    expect(pool.query).toHaveBeenCalledWith(q, [email, date]);
  });

  it('Valid User Id and has emails in date', async () => {
    const expected = [
      {
        invoice_id: 564,
        sender_email: "dummy@gmail.com",
        receiver_email: "dummy@gmail.com",
        invoices: [
          "xml1"
        ],
        type: "XML",
        sent_at: "2024-03-11T23:56:46.825Z"
      },
      {
        invoice_id: 565,
        sender_email: "dummy@gmail.com",
        receiver_email: "dummy@gmail.com",
        invoices: [
          "xml1"
        ],
        type: "XML",
        sent_at: "2024-03-11T23:58:39.111Z"
      }
    ];

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await fetchByDate(uid, date);
    expect(response).toEqual(expected);

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = "select * from sent_invoices where receiver_email = $1 and sent_at::date = (select to_date($2, 'DD/MM/YYYY'))";
    expect(pool.query).toHaveBeenCalledWith(q, [email, date]);
  });
});