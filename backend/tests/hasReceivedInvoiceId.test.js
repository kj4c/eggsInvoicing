const { expect } = require("@jest/globals");
const pool = require("../database/db");
const hasReceivedInvoiceId = require("../functions/hasReceivedInvoiceId");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

const { invoiceId, receiverEmail } = {invoiceId: 999, receiverEmail: "feng@example.com"};

const expected = {
  invoice_id: invoiceId,
  sender_email: 'dummy@gmail.com',
  receiver_email: receiverEmail,
  xml_invoices: '{xml1}',
  sent_at: '2024-03-07T05:59:26.130Z'
};

describe("Test suite for /receive/getNotifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("User has not received InvoiceId", async () => {
    const q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await hasReceivedInvoiceId(invoiceId, receiverEmail);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res).toEqual({message: "User has not received invoiceId = " + invoiceId});
    expect(pool.query).toHaveBeenCalledWith(q,[invoiceId, receiverEmail]);
  });

  it("User has received InvoiceId", async () => {
    const q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
    pool.query.mockResolvedValueOnce({ rows: [{expected}] });
    const res = await hasReceivedInvoiceId(invoiceId, receiverEmail);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res).toEqual({message: "User has received invoiceId = " + invoiceId});
    expect(pool.query).toHaveBeenCalledWith(q,[invoiceId, receiverEmail]);
  });
});