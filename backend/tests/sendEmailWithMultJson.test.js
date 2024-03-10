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
        jsonContent: { message: 'Don\'t forget me this weekend!' },
        filename: 'reminder.json'
      },
      {
        jsonContent: { invoice: { to: 'Client', amount: 100.00 } },
        filename: 'invoice.json'
      }
    ];

    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test JSON Sender';

    await sendEmailWithMultipleJSON(from, recipientEmail, jsonFiles);

    const nodemailer = require('nodemailer');

    // The expectation for sendMail should focus on the content being sent as part of the attachments
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
      attachments: expect.arrayContaining([
        expect.objectContaining({
          filename: 'reminder.json',
          content: JSON.stringify({ message: 'Don\'t forget me this weekend!' }),
          contentType: 'application/json'
        }),
        expect.objectContaining({
          filename: 'invoice.json',
          content: JSON.stringify({ invoice: { to: 'Client', amount: 100.00 } }),
          contentType: 'application/json'
        })
      ])
    }));

    expect(pool.query).toHaveBeenCalledTimes(4);
  });
});

