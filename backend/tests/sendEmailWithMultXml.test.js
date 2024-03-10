const sendEmailWithMultipleXML = require('../functions/sendEmailWithMultXML');
const pool = require('../database/db');
// const fs = require('fs').promises;

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
  it('should attempt to send an email with multiple attachments correctly and interact with the database', async () => {
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
});

describe('sendEmailWithXML function error handling', () => {
  it('should throw an error if xmlString is undefined', async () => {
    const recipientEmail = 'recipient@example.com';
    const from = 'Error Case Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, undefined))
      .rejects
      .toThrow('xmlFiles is required but was not provided.');

  });

  it('should throw an error if recipient is undefined', async () => {
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
    const from = 'Error Case Sender';

    // Act and Assert
    await expect(sendEmailWithMultipleXML(from, undefined, xmlFiles))
      .rejects
      .toThrow('recipient is required but was not provided.');
  });

  it('should throw an error if from is undefined', async () => {
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
    const recipientEmail = 'recipient@example.com';

    // Act and Assert
    await expect(sendEmailWithMultipleXML(undefined, recipientEmail, xmlFiles))
      .rejects
      .toThrow('from is required but was not provided.');
  });

});

describe('sendEmailWithMultipleXML function - filename type validation', () => {
  it('should throw an error if any filename is not a string', async () => {
    // Setting up the xmlFiles array with an incorrect filename type for testing
    const xmlFiles = [
      {
        xmlString: `<?xml version="1.0"?>
        <note>
          <to>Tove</to>
          <from>Jani</from>
          <heading>Reminder</heading>
          <body>Don't forget me this weekend!</body>
        </note>`,
        filename: 'correct-filename.xml'
      },
      {
        xmlString: `<?xml version="1.0"?>
        <invoice>
          <to>Client</to>
          <from>Service Provider</from>
          <due>30 days</due>
          <amount>100.00</amount>
        </invoice>`,
        filename: 123
      }
    ];

    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test Sender';

    await expect(sendEmailWithMultipleXML(from, recipientEmail, xmlFiles))
      .rejects
      .toThrow('Expected filename to be a string, but got number');
  });
});

describe('sendEmailWithXML processing and error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should catch and rethrow an error during database operations', async () => {
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

    const from = 'sender@example.com';
    const recipient = 'recipient@example.com';

    // Mock fs.readFile to successfully read a file
    jest.mock('fs', () => ({
      promises: {
        readFile: jest.fn().mockResolvedValue('<xml>Mock XML Content</xml>'),
        unlink: jest.fn().mockResolvedValue(undefined),
      }
    }));

    // Mock the first call to pool.query to throw an error
    pool.query.mockRejectedValueOnce(new Error('Mock database error'));

    // Expect the function to throw the mock error
    await expect(sendEmailWithMultipleXML(from, recipient, xmlFiles)).rejects.toThrow('Mock database error');

  });
});
