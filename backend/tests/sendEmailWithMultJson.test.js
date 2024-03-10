const sendEmailWithMultipleJSON = require('../functions/sendEmailWithMultipleJSON');
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

// Remove fs/promises mock as we're not using filesystem operations in our updated function

describe('sendEmailWithMultipleJSON function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should attempt to send an email with multiple JSON attachments correctly and interact with the database', async () => {
    const jsonFiles = [
      {
        jsonString: JSON.stringify({ message: 'Don\'t forget me this weekend!' }),
        filename: 'reminder.json'
      },
      {
        jsonString: JSON.stringify({ invoice: { to: 'Client', amount: 100.00 } }),
        filename: 'invoice.json'
      }
    ];

    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test JSON Sender';

    await sendEmailWithMultipleJSON(from, recipientEmail, jsonFiles);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
      attachments: expect.arrayContaining([
        expect.objectContaining({
          filename: 'reminder.json',
          content: JSON.stringify({ message: 'Don\'t forget me this weekend!' }), // Ensuring content is correctly stringified JSON
          contentType: 'application/json'
        }),
        expect.objectContaining({
          filename: 'invoice.json',
          content: JSON.stringify({ invoice: { to: 'Client', amount: 100.00 } }), // Ensuring content is correctly stringified JSON
          contentType: 'application/json'
        })
      ])
    }));

    // If each jsonFile leads to two database queries (one for insertion and one for updating notifications),
    // and there are 2 jsonFiles, then expect pool.query to have been called 4 times.
    expect(pool.query).toHaveBeenCalledTimes(jsonFiles.length * 2);
  });
});
