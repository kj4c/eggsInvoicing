const request = require('supertest');
const pool = require("../database/db");
const app = require('../app'); 

const { describe, beforeEach, afterEach, it, expect } = require("@jest/globals");


jest.mock('../database/db', () => ({
  query: jest.fn()
}));

const uId = 123;
const email = "dummy2@gmail.com"
const invoiceId = 312;
const body = {
  uId: uId,
  invoiceId: invoiceId
};

describe('/fetchByInvoiceId route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('Invalid User Id', async () => {
    pool.query.mockResolvedValueOnce({rows :[]});

    const response = await request(app).get('/receive/fetchByInvoiceId').send(body);
    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual("Invalid User");
    
    expect(pool.query).toHaveBeenCalledTimes(1);
    let q = "select uid from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
  });

  it('Invalid invoice Id', async () => {
    pool.query.mockResolvedValueOnce({rows :[{uid: uId}]});
    pool.query.mockResolvedValueOnce({rows :[{email: email}]});
    pool.query.mockResolvedValueOnce({ rows :[]});

    const response = await request(app).get('/receive/fetchByInvoiceId').send(body);
    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual("InvoiceId does not exists");
    
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

    const response = await request(app).get('/receive/fetchByInvoiceId').send(body);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expected);
    
    expect(pool.query).toHaveBeenCalledTimes(3);
    let q = "select uid from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select email from users where uid = $1";
    expect(pool.query).toHaveBeenCalledWith(q, [uId]);
    q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
    expect(pool.query).toHaveBeenCalledWith(q, [invoiceId, email]);
  });
});
