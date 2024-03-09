const { expect } = require("@jest/globals");
const pool = require("../database/db");
const fetchByInvoiceId = require("../functions/fetchByInvoiceId");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

const uId = 123;
const email = "dummy2@gmail.com"
const invoiceId = 312;

describe("Test suite for fetchByInvoicId()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows :[]});
    await expect(fetchByInvoiceId(uId, invoiceId)).rejects.toThrowError("Invalid User");
    expect(pool.query).toHaveBeenCalledTimes(1);
    let q = "select uid from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
  });

  it('Invalid invoice Id', async () => {
    pool.query.mockResolvedValueOnce({rows :[{uid: uId}]});
    pool.query.mockResolvedValueOnce({rows :[{email: email}]});
    pool.query.mockResolvedValueOnce({ rows :[]});

    await expect(fetchByInvoiceId(uId, invoiceId)).rejects.toThrowError("InvoiceId does not exists");
    
    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = "select uid from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select email from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
    expect(pool.query).toHaveBeenCalledWith(q, [invoiceId, email]);
  });

  it('Valid User Id and valid invoice id', async () => {
    const expected = {
      invoice_id: invoiceId,
      sender_email: 'dummy@gmail.com',
      receiver_email: email,
      xml_invoices: '{xml1,xml2,xml3}',
      sent_at: "2024-03-05T03:31:42.889Z"
    };
    pool.query.mockResolvedValueOnce({rows :[{uid: uId}]});
    pool.query.mockResolvedValueOnce({rows :[{email: email}]});
    pool.query.mockResolvedValueOnce({ rows :[expected]});

    const response = await fetchByInvoiceId(uId, invoiceId);
    console.log(response);
    expect(response).toEqual(expected);
    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = "select uid from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select email from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
    expect(pool.query).toHaveBeenCalledWith(q, [invoiceId, email]);
  });
 
});