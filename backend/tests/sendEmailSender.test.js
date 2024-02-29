const sendEmailWithXML = require('../functions/sendingEmailFunction');

// testing of the mail to my email
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: '123' }),
  }),
}));

describe('sendEmailWithXML function', () => {
  it('should attempt to send an email with the correct parameters', async () => { 
    const xmlString = "<xml>Here's a test XML string</xml>";
    const recipientEmail = "kahowang3659@gmail.com";
    const from = 'Test Sender';
    
    await sendEmailWithXML(from, recipientEmail, xmlString);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: recipientEmail,
    }));
  });
});