const generatePdf = require("../functions/report.js");
const pool = require("../database/db");
const { describe } = require("node:test");
const fs = require('fs');

jest.mock("../database/db", () => ({
    query: jest.fn()
}));

describe("Generating receiving report", () => {
    it("Successfully generates report", async () => { 
        const time = new Date();
        pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, sender_email: "Bob", sent_at: time}]});
        const receive = await generatePdf();
        fs.unlink('./communication_report.pdf', (err) => {
            if (err) throw err;
            fileDeleted = true;
        })
        expect(receive.status).toEqual(200);    
    });
})