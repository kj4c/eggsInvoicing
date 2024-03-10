const sendEmailWithMultipleJSON = require('../functions/sendEmailWIthMultipleJSON'); // Update path as needed
const pool = require('../database/db');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: '123' }),
  }),
}));

jest.mock('../database/db', () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ invoice_id: '456' }] 
  })
}));

jest.mock('fs/promises', () => ({
  writeFile: jest.fn().mockResolvedValue(),
  readFile: jest.fn().mockResolvedValue('{}'),
  unlink: jest.fn().mockResolvedValue(),
}));

describe('sendEmailWithMultipleJSON function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should attempt to send an email with multiple JSON attachments correctly and interact with the database', async () => {
    const jsonFiles = [
      {
        jsonContent: { message: "Don't forget me this weekend!" },
        filename: 'reminder.json'
      },
      {
        jsonContent: { invoice: { to: "Client", amount: 100.00 } },
        filename: 'invoice.json'
      }
    ];

    const recipientEmail = "kahowang3659@gmail.com";
    const from = 'Test JSON Sender';
    
    await sendEmailWithMultipleJSON(from, recipientEmail, jsonFiles);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
      attachments: expect.arrayContaining([
        expect.objectContaining({ filename: 'reminder.json', contentType: 'application/json' }),
        expect.objectContaining({ filename: 'invoice.json', contentType: 'application/json' })
      ])
    }));
    
    expect(pool.query).toHaveBeenCalledTimes(jsonFiles.length * 2);
  });

  it('should throw an error if jsonFiles is undefined', async () => {
    const recipientEmail = "recipient@example.com";
    const from = 'Error Case Sender';

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, undefined))
      .rejects
      .toThrow('jsonFiles is required but was not provided.');
  });

  it('should throw an error if recipient is undefined', async () => {
    const jsonFiles = [
      { jsonContent: { message: "Sample message" }, filename: 'message.json' }
    ];
    const from = 'Error Case Sender';

    await expect(sendEmailWithMultipleJSON(from, undefined, jsonFiles))
      .rejects
      .toThrow('recipient is required but was not provided.'); 
  });

  it('should throw an error if from is undefined', async () => {
    const jsonFiles = [
      { jsonContent: { message: "Sample message" }, filename: 'message.json' }
    ];
    const recipientEmail = "recipient@example.com";

    await expect(sendEmailWithMultipleJSON(undefined, recipientEmail, jsonFiles))
      .rejects
      .toThrow('from is required but was not provided.'); 
  });

  it('should throw an error if any filename is not a string', async () => {
    const jsonFiles = [
      { jsonContent: { message: "Correct message" }, filename: 'correct-filename.json' },
      { jsonContent: { message: "Incorrect message" }, filename: 123 } 
    ];

    const recipientEmail = "kahowang3659@gmail.com";
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, jsonFiles))
      .rejects
      .toThrow(`Expected filename to be a string, but got number`);
  });
});


describe('sendEmailWithMultipleJSON processing and error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); 

    jest.mock('fs', () => ({
      promises: {
        readFile: jest.fn().mockResolvedValue(JSON.stringify({ message: "Mock JSON Content" })),
        unlink: jest.fn().mockResolvedValue(undefined),
      }
    }));
  });
  
  it('should catch and rethrow an error during database operations', async () => {
    const jsonFiles = [
      {
        jsonContent: { message: "Don't forget me this weekend!" },
        filename: 'reminder.json'
      },
      {
        jsonContent: { invoice: { to: "Client", amount: 100.00 } },
        filename: 'invoice.json'
      }
    ];
  
    const from = "jackson@example.com";
    const recipient = "kahowang3659@example.com";
      
    pool.query.mockRejectedValueOnce(new Error("Mock database error"));
  
    await expect(sendEmailWithMultipleJSON(from, recipient, jsonFiles)).rejects.toThrow("Mock database error");
  
  });
});
  