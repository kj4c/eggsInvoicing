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

describe('sendEmailWithMultipleJSON error handling', () => {
  it('should throw an error if "from" is not provided', async () => {
    const jsonFiles = [{ jsonString: JSON.stringify({ message: 'Test' }), filename: 'test.json' }];
    const recipientEmail = 'example@example.com';

    await expect(sendEmailWithMultipleJSON(null, recipientEmail, jsonFiles))
      .rejects.toThrow('from is required but was not provided.');
  });

  it('should throw an error if "recipient" is not provided', async () => {
    const jsonFiles = [{ jsonString: JSON.stringify({ message: 'Test' }), filename: 'test.json' }];
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleJSON(from, null, jsonFiles))
      .rejects.toThrow('recipient is required but was not provided.');
  });

  it('should throw an error if "jsonFiles" is not provided or is empty', async () => {
    const from = 'Test Sender';
    const recipientEmail = 'example@example.com';

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, null))
      .rejects.toThrow('jsonFiles is required but was not provided.');

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, []))
      .rejects.toThrow('jsonFiles is required but was not provided.');
  });

  it('should throw an error if "filename" or "jsonString" in jsonFiles are not strings', async () => {
    const from = 'Test Sender';
    const recipientEmail = 'example@example.com';
    const invalidJsonFiles = [{ jsonString: 123, filename: 456 }]; // Invalid types

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, invalidJsonFiles))
      .rejects.toThrow('Expected filename to be a string and jsonString to be a string, but got number and number');
  });

  it('should process correctly formatted JSON files without throwing errors', async () => {
    const jsonFiles = [
      { jsonString: JSON.stringify({ message: 'Don\'t forget me this weekend!' }), filename: 'reminder.json' },
      { jsonString: JSON.stringify({ invoice: { to: 'Client', amount: 100.00 } }), filename: 'invoice.json' }
    ];
    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test JSON Sender';

    await expect(sendEmailWithMultipleJSON(from, recipientEmail, jsonFiles)).resolves.toBeTruthy();

    // Further assertions could be made based on the function's return value or effects, such as database entries.
  });
});
