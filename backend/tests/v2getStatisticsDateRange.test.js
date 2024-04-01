const { expect } = require('@jest/globals');
const pool = require('../database/db');
const getStatisticsDateRangeV2 = require('../functions/v2getStatisticsDateRange');
const { xml1, xml2, xml3, xml4 } = require('../xmlExamples/AUInvoice.xml');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = 2;
const email = 'dummy@gmail.com';
const startDate = '10/03/2024';
const endDate = '12/03/2024';

describe('Test suite for getStatisticsDateRange()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});
    await expect(getStatisticsDateRangeV2(uid, startDate, endDate)).rejects.toThrowError('Invalid User');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid User Id, invalid date ranges', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    await expect(getStatisticsDateRangeV2(uid, endDate, startDate)).rejects.toThrowError('startDate is larger than endDate');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid uid and dates but no emails in date range', async () => {
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await getStatisticsDateRangeV2(uid, endDate, endDate);
    expect(response.message).toEqual('No invoices found within given date range');

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select invoices from sent_invoices where receiver_email = $1 and sent_at::date between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
    expect(pool.query).toHaveBeenCalledWith(q, [email, endDate, endDate]);
  });

  it('Valid uid, dates and has emails in date range', async () => {
    const expected = [
      { invoices: [ xml1 ] },
      { invoices: [ xml2 ] },
      { invoices: [ xml3 ] },
      { invoices: [ xml4 ] }
    ];

    const res = {
      message: 'LegalMonetaryTotal for requested period from 10/03/2024 to 12/03/2024',
      numInvoices: 4,
      numInvoiceLines: 11,
      lineExtensionAmount: '$1619.83',
      taxExclusiveAmount: '$1619.83',
      taxAmount: '$164.68',
      taxInclusiveAmount: '$1784.51',
      chargeTotalAmount: '$0.00',
      prepaidAmount: '$0.00',
      payableAmount: '$1784.51'
    };

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await getStatisticsDateRangeV2(uid, startDate, endDate);
    expect(response).toEqual(res);

    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select email from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
    q = 'select invoices from sent_invoices where receiver_email = $1 and sent_at::date between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';
    expect(pool.query).toHaveBeenCalledWith(q, [email, startDate, endDate]);
  });
});
