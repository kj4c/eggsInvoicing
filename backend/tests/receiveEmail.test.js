const receiveEmail = require("../functions/receiveEmail");
const pool = require("../database/db");
const { describe, beforeEach } = require("node:test");

jest.mock("../database/db", () => ({
    query: jest.fn()
}));

describe("Receiving Email", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should receive and notify user of email if the email exists and was sent", async () => {
        const receiver = 'Tom';
        const invoiceId = 123;
        pool.query.mockResolvedValueOnce({ rows: [{receiver: 'Tom', invoice_id: 123}]});
        const result = await receiveEmail('receiver', invoiceId);
        expect(result).toEqual({status: 200, message: "Success"});
        expect(pool.query).toHaveBeenCalledWith("SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2",[receiver, invoiceId]);
    });

    it("cannot find the receiver", async () => {
        const receiver = 'KAIKAIKAI'
        const invoiceId = 123;
        pool.query.mockResolvedValueOnce({rows: []});
        expect(receiveEmail(receiver, invoiceId)).rejects.toThrow("Email not received.");
        expect(pool.query).toHaveBeenCalledWith("SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2",[receiver, invoiceId])
    });

    it("cannot find the invoice_id", async () => {
        const receiver = 'Tom'
        const invoiceId = 123333;
        pool.query.mockResolvedValueOnce({rows: []});
        expect(receiveEmail(receiver, invoiceId)).rejects.toThrow("Email not received.");
        expect(pool.query).toHaveBeenCalledWith("SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2",[receiver, invoiceId])
    });
})