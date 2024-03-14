const sendEmailWithMultipleXML = require('../functions/sendEmailWithMultXML');
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

describe('sendEmailWithMultipleXML function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  it('should attempt to send an email with multiple XML attachments correctly and interact with the database', async () => {
    const xmlFiles = [
      {
        xmlString: `<?xml version="1.0"?>
        <note>
          <to>Tove</to>
          <from>Jani</from>
          <heading>Reminder</heading>
          <body>Don't forget me this weekend!</body>
        </note>`,
        filename: 'note.xml'
      },
      {
        xmlString: `<?xml version="1.0"?>
        <invoice>
          <to>Client</to>
          <from>Service Provider</from>
          <due>30 days</due>
          <amount>100.00</amount>
        </invoice>`,
        filename: 'invoice.xml'
      }
    ];

    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test Sender';

    await sendEmailWithMultipleXML(from, recipientEmail, xmlFiles);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
      attachments: expect.arrayContaining([
        expect.objectContaining({ filename: 'note.xml', contentType: 'text/xml' }),
        expect.objectContaining({ filename: 'invoice.xml', contentType: 'text/xml' })
      ])
    }));

    expect(pool.query).toHaveBeenCalledTimes(xmlFiles.length * 2);
  });

  it('should throw an error if "xmlFiles" is not provided', async () => {
    const recipientEmail = 'example@example.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, null))
      .rejects
      .toThrow('xmlFiles is required but was not provided.');
  });

  it('should throw an error if "xmlFiles" is empty', async () => {
    const recipientEmail = 'example@example.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, []))
      .rejects
      .toThrow('xmlFiles is required but was not provided.');
  });

  it('should throw an error if "xmlFiles" is not an array', async () => {
    const recipientEmail = 'example@example.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, {}))
      .rejects
      .toThrow('xmlFiles is required but was not provided.');
  });

  it('should throw an error if filename or xmlString is not a string', async () => {
    const xmlFiles = [{ filename: 123, xmlString: [] }];
    const recipientEmail = 'example@example.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, xmlFiles))
      .rejects
      .toThrow('Expected filename and xmlString to be strings, but got number and object');
  });

  it('should throw an error if "recipient" is not provided', async () => {
    const xmlFiles = [{ filename: 'note.xml', xmlString: '<note></note>' }];
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, null, xmlFiles))
      .rejects
      .toThrow('recipient is required but was not provided.');
  });

  it('should throw an error if "from" is not provided', async () => {
    const xmlFiles = [{ filename: 'note.xml', xmlString: '<note></note>' }];
    const recipientEmail = 'example@example.com';

    await expect(sendEmailWithMultipleXML(null, recipientEmail, xmlFiles))
      .rejects
      .toThrow('from is required but was not provided.');
  });

  it('should throw an error if filename or xmlString is not a string', async () => {
    const xmlFiles = [{ filename: 123, xmlString: [] }];
    const recipientEmail = 'example@example.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, xmlFiles))
      .rejects
      .toThrow('Expected filename and xmlString to be strings, but got number and object');
  });

});
