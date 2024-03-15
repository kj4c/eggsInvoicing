const receiveHtml = require('../functions/receiveReportHtml.js');
const pool = require('../database/db.js');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Generating receiving report in html', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('Successfully generates html received report', async () => {
    const time = new Date();
    pool.query.mockResolvedValueOnce({ rows: [{email: 'dummy@gmail.com'}]});
    pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, sender_email: 'Bob', sent_at: time}]});
    const receive = await receiveHtml(1);
    expect(receive.status).toEqual(200);
  });

  it('Invalid uid', async () => {
    const time = new Date();
    pool.query.mockResolvedValueOnce({ rows: []});
    pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, sender_email: 'Bob', sent_at: time}]});
    const receive = await receiveHtml(1);
    expect(receive.status).toEqual(400);
  });

  it('Undefined uid', async () => {
    const receive = await receiveHtml(undefined);
    expect(receive.status).toEqual(400);
  });
});
