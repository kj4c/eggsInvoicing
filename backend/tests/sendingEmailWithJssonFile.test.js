const sendEmailWithJSON = require('../functions/sendingEmailWithJsonFileAttachement'); // Adjust the path as needed

// Mocking nodemailer similarly as done for XML
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: '1234' }),
  }),
}));

describe('sendEmailWithJSON function', () => {
  it('should attempt to send an email with the correct parameters for JSON', async () => {
    const jsonString = JSON.stringify({ message: 'Here\'s a test JSON string' });
    const recipientEmail = 'kahowang3659@gmail.com';
    const from = 'Test JSON Sender';

    await sendEmailWithJSON(from, recipientEmail, jsonString);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
    }));
  }, 20 * 1000);
});

describe('sendEmailWithJSON function error handling', () => {
  it('should throw an error if jsonString is undefined', async () => {
    const recipientEmail = 'recipient@example.com';
    const from = 'Error Case JSON Sender';

    await expect(sendEmailWithJSON(from, recipientEmail, undefined))
      .rejects
      .toThrow('jsonString is required but was not provided.');
  });

  it('should throw an error if recipient is undefined', async () => {
    const jsonString = JSON.stringify({ message: 'Error case JSON string' });
    const from = 'Error Case JSON Sender';

    await expect(sendEmailWithJSON(from, undefined, jsonString))
      .rejects
      .toThrow('recipient is required but was not provided.');
  });

  it('should throw an error if from is undefined', async () => {
    const jsonString = JSON.stringify({ message: 'Error case JSON string' });
    const recipientEmail = 'recipient@example.com';

    await expect(sendEmailWithJSON(undefined, recipientEmail, jsonString))
      .rejects
      .toThrow('from is required but was not provided.');
  });
});
