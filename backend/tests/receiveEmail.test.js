const receiveEmail = require("../functions/receiveEmail");
const pool = require("../database/db");
const { describe, beforeEach, afterEach, it, expect } = require("@jest/globals");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

describe("Receiving Email", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it("should receive and notify user of email if the email exists and was sent", async () => {
    const uid = 1;
    const invoiceId = 123;
    const email = 'dummy@gmail.com';
    pool.query.mockResolvedValueOnce({ rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({ rows: [{receiver: 'Tom', invoice_id: 123}]});
    const result = await receiveEmail(uid, invoiceId);

    expect(result).toEqual({status: 200, message: "Success"});
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith("SELECT email FROM users WHERE uid = $1", [uid]);
    let q = 'SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2';
    expect(pool.query).toHaveBeenCalledWith(q,[email, invoiceId]);
  });

  it("cannot find the receiver", async () => {
    const uid = 10000;
    const invoiceId = 1;
    const email = 'dummy@gmail.com';
    pool.query.mockResolvedValueOnce({ rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({ rows: []});

    await expect(receiveEmail(uid, invoiceId)).rejects.toThrow("Email not received."); // Make sure to await the promise
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith("SELECT email FROM users WHERE uid = $1", [uid]);
    let q = 'SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2';
    expect(pool.query).toHaveBeenCalledWith(q,[email, invoiceId]);
  });

  it("cannot find the invoice_id", async () => {
    const uid = 1;
    const invoiceId = 112312313;
    const email = 'dummy@gmail.com';
    pool.query.mockResolvedValueOnce({ rows: [{email: email}]});
    pool.query.mockResolvedValueOnce({ rows: []});

    await expect(receiveEmail(uid, invoiceId)).rejects.toThrow("Email not received."); // Make sure to await the promise
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith("SELECT email FROM users WHERE uid = $1", [uid]);
    let q = 'SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2';
    expect(pool.query).toHaveBeenCalledWith(q,[email, invoiceId]);
  });
});

