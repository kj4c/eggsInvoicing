const request = require('supertest');
const pool = require('../database/db');
const app = require('../app');

const { describe, beforeEach, afterEach, it, expect } = require('@jest/globals');
const { xml1, xml2, xml3, xml4 } = require('../xmlExamples/AUInvoice.xml');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uid = '2';
const email = 'dummy@gmail.com';
const body = {
  uid: uid,
};

describe('Test suite for /receive/getStatistics route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/getStatistics').query(body);
    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual('Invalid User');

    expect(pool.query).toHaveBeenCalledTimes(1);
    const q = 'select uid from users where uid = $1';
    expect(pool.query).toHaveBeenCalledWith(q, [uid]);
  });

  it('Valid User Id', async () => {
    const expected = [
      { invoices: [ xml1 ] },
      { invoices: [ xml2 ] },
      { invoices: [ xml3 ] },
      { invoices: [ xml4 ] }
    ];

    const mockedDate = new Date(2024, 2, 17);
    jest.useFakeTimers('modern');
    jest.setSystemTime(mockedDate);

    const res = {
      'financialYearStats': {
        'message': 'LegalMonetaryTotal requested for FY2024',
        'numInvoices': 4,
        'numInvoiceLines': 11,
        'lineExtensionAmount': '$1619.83',
        'taxExclusiveAmount': '$1619.83',
        'taxAmount': '$164.68',
        'taxInclusiveAmount': '$1784.51',
        'chargeTotalAmount': '$0.00',
        'prepaidAmount': '$0.00',
        'payableAmount': '$1784.51'
      },
      'financialQuarterStats': {
        'message': 'LegalMonetaryTotal requested for Q3',
        'numInvoices': 4,
        'numInvoiceLines': 11,
        'lineExtensionAmount': '$1619.83',
        'taxExclusiveAmount': '$1619.83',
        'taxAmount': '$164.68',
        'taxInclusiveAmount': '$1784.51',
        'chargeTotalAmount': '$0.00',
        'prepaidAmount': '$0.00',
        'payableAmount': '$1784.51'
      },
      'monthlyFinancialStats': {
        'message': 'LegalMonetaryTotal for this month of March',
        'numInvoices': 4,
        'numInvoiceLines': 11,
        'lineExtensionAmount': '$1619.83',
        'taxExclusiveAmount': '$1619.83',
        'taxAmount': '$164.68',
        'taxInclusiveAmount': '$1784.51',
        'chargeTotalAmount': '$0.00',
        'prepaidAmount': '$0.00',
        'payableAmount': '$1784.51'
      },
      'weeklyFinancialStats': {
        'message': 'LegalMonetaryTotal for this week (11/03/2024 - 17/03/2024)',
        'numInvoices': 4,
        'numInvoiceLines': 11,
        'lineExtensionAmount': '$1619.83',
        'taxExclusiveAmount': '$1619.83',
        'taxAmount': '$164.68',
        'taxInclusiveAmount': '$1784.51',
        'chargeTotalAmount': '$0.00',
        'prepaidAmount': '$0.00',
        'payableAmount': '$1784.51'
      },
      'dailyFinancialStats': {
        'message': 'LegalMonetaryTotal for today (17/03/2024)',
        'numInvoices': 4,
        'numInvoiceLines': 11,
        'lineExtensionAmount': '$1619.83',
        'taxExclusiveAmount': '$1619.83',
        'taxAmount': '$164.68',
        'taxInclusiveAmount': '$1784.51',
        'chargeTotalAmount': '$0.00',
        'prepaidAmount': '$0.00',
        'payableAmount': '$1784.51'
      }
    };

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: expected});

    const response = await request(app).get('/receive/getStatistics').query(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(res);

    jest.useRealTimers();
    expect(pool.query).toHaveBeenCalledTimes(15);
  });

  it('Valid User Id empty finanacial statistics', async () => {
    const res = {
      'financialYearStats': {
        'message': 'No invoices found within given date range'
      },
      'financialQuarterStats': {
        'message': 'No invoices found within given date range'
      },
      'monthlyFinancialStats': {
        'message': 'No invoices found within given date range'
      },
      'weeklyFinancialStats': {
        'message': 'No invoices found within given date range'
      },
      'dailyFinancialStats': {
        'message': 'No invoices found within given date range'
      }
    };
    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/getStatistics').query(body);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(res);

    expect(pool.query).toHaveBeenCalledTimes(15);
  });

  it('Valid User Id empty finanacial statistics, next financial year', async () => {
    const res = {
      'financialYearStats': {
        'message': 'No invoices found within given date range'
      },
      'financialQuarterStats': {
        'message': 'No invoices found within given date range'
      },
      'monthlyFinancialStats': {
        'message': 'No invoices found within given date range'
      },
      'weeklyFinancialStats': {
        'message': 'No invoices found within given date range'
      },
      'dailyFinancialStats': {
        'message': 'No invoices found within given date range'
      }
    };

    const mockedDate = new Date(2024, 6, 10);
    jest.useFakeTimers('modern');
    jest.setSystemTime(mockedDate);

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    pool.query.mockResolvedValueOnce({rows: [{uid: uid}]});
    pool.query.mockResolvedValueOnce({rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({rows: []});

    const response = await request(app).get('/receive/getStatistics').query(body);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(res);
    jest.useRealTimers();
    expect(pool.query).toHaveBeenCalledTimes(15);
  });
});
