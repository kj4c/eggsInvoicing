const sendingResetPassword = require('../functions/sendingResetPassword');
const pool = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ invoiceId: '1' }),
    }),
  }));

describe('successful sendingResetPassword function', () => {
  it('should send a password reset function', async () => {
    const email = 'winnie@gmail.com';

    pool.query.mockResolvedValueOnce({ rows: [{ email: 'winnie@gmail.com'}] });
    pool.query.mockResolvedValueOnce({ rows: [{ invoiceId: '1'}] });

    const sendResetEmail = await sendingResetPassword(email);

    const nodemailer = require('nodemailer');

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: email,
    }));

    expect(sendResetEmail).toEqual({
      message: 'Password reset instructions were sent to your email.'
    });
  },20 * 1000)
});

describe('sendResetPassword function error handling', () => {
  it('should throw an error if email does not exist', async () => {
    const email = 'winnie@gmail.com';
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(sendingResetPassword(email))
      .rejects
      .toThrow('Password reset email failed to send.');
  });
});