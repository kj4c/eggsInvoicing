const deleteEmail = require('../functions/deleteEmail');
const pool = require('../database/db');
const { describe, it, expect } = require('@jest/globals');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const invoiceId = 123;

describe('Test suite for deleteEmails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Successfully delete invoice from database', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const result = await deleteEmail(invoiceId);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith('delete from sent_invoices where invoice_id = $1', [invoiceId]);

    expect(result).toEqual(1);
  });

  it('should throw an error if invoice id does not exist', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 });

    await expect(deleteEmail(invoiceId))
      .rejects
      .toThrow('Invoice ID not found');
  })
});