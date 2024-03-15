const { expect } = require('@jest/globals');
const pool = require('../database/db');
const getNotifications = require('../functions/getNotifications');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uId = 123;

describe('Test suite for getNotifications()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(getNotifications(uId)).rejects.toThrowError('Invalid User');
    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
  });

  it('Should return no notifications found for users with no notifications', async () => {
    const q = 'select notifications from users where uid = $1';
    pool.query.mockResolvedValueOnce({rows: [{uid: uId}]});
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await getNotifications(uId);
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(res).toEqual({message: 'No new notifications'});
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
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
    pool.query.mockResolvedValueOnce({rows: [{uid: uId}]});
    pool.query.mockResolvedValueOnce({ rows: [{notifications: [invoice_id]}]});
    pool.query.mockResolvedValueOnce({ rows: [{expected}]});

    const res = await getNotifications(uId);
    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(pool.query).toHaveBeenCalledWith('select notifications from users where uid = $1', [uId]);
    expect(pool.query).toHaveBeenCalledWith('select * from sent_invoices where invoice_id = $1', [invoice_id]);
    expect(pool.query).toHaveBeenCalledWith('update users set notifications = \'{}\' where uid = $1', [uId]);
    expect(res).toEqual({notifications: expect.any(Array)});
  });
});