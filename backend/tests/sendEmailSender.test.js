const sendEmailWithXML = require('../functions/sendingEmailFunction');

// testing of the mail to my email
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ invoiceId: '1' }),
  }),
}));

describe('sendEmailWithXML function', () => {
  it('should attempt to send an email with the correct parameters', async () => {
    const xmlString = '<xml>Here\'s a test XML string</xml>';
    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test Sender';

    await sendEmailWithXML(from, recipientEmail, xmlString);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
    }));
  }, 20 * 1000);
});

describe('sendEmailWithXML function error handling', () => {
  it('should throw an error if xmlString is undefined', async () => {
    const recipientEmail = 'recipient@example.com';
    const from = 'Error Case Sender';

    await expect(sendEmailWithXML(from, recipientEmail, undefined))
      .rejects
      .toThrow('xmlString is required but was not provided.');

  });

  it('should throw an error if recipient is undefined', async () => {
    const xmlString = '<xml>Error case XML string</xml>';
    const from = 'Error Case Sender';

    // Act and Assert
    await expect(sendEmailWithXML(from, undefined, xmlString))
      .rejects
      .toThrow('recipient is required but was not provided.');
  });

  it('should throw an error if from is undefined', async () => {
    const xmlString = '<xml>Error case XML string</xml>';
    const recipientEmail = 'recipient@example.com';

    // Act and Assert
    await expect(sendEmailWithXML(undefined, recipientEmail, xmlString))
      .rejects
      .toThrow('from is required but was not provided.');
  });
});

