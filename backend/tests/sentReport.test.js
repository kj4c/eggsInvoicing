const generateSentPdf = require("../functions/sentReport.js");
const pool = require("../database/db.js");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {}); 
});

describe("Generating sent report", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
  });

  it("Successfully generates sent report", async () => { 
    const time = new Date();
    pool.query.mockResolvedValueOnce({ rows: [{invoice_id: 1234, receiver_email: "Bob", sent_at: time}]});
    pool.query.mockResolvedValueOnce({ rows: [{email: 'dummy@gmail.com'}]});
    const receive = await generateSentPdf(1);
    expect(receive.status).toEqual(200);    
  });
});
