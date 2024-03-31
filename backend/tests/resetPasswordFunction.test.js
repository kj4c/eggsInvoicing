const resetPasswordFunction = require('../functions/resetPasswordFunction');
const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValueOnce('newHashed'),
  compare: jest.fn()
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ invoiceId: '1' }),
  }),
}));

describe('resetPasswordFunction test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully reset password', async () => {
    const email = 'winnie@gmail.com';
    const newPassword = 'newPassword';

    pool.query.mockResolvedValueOnce({ rows: [{ email: email, hashed_password: 'oldHashed'}] });
    pool.query.mockResolvedValueOnce({ rows: [{ email: email, hashed_password: 'newHashed'}] });

    const reset = await resetPasswordFunction(email, newPassword);

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith('select * from users where email = $1', [email]);
    expect(pool.query).toHaveBeenCalledWith('update users set hashed_password = $1 where email = $2', ['newHashed', email]);

    expect(bcrypt.compare).toHaveBeenCalledWith(newPassword, 'oldHashed');
    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, saltRounds);

    expect(reset).toEqual({ status: 200, message: 'Password successfully reset.' });
  });

  it('should throw error if new password is same as old password', async () => {
    const email = 'winnie@gmail.com';
    const samePassword = 'password';

    pool.query.mockResolvedValueOnce({ rows: [{ email: email, hashed_password: 'hashed'}] });
    bcrypt.compare.mockResolvedValueOnce(true);

    await expect(resetPasswordFunction(email, samePassword))
      .rejects
      .toThrow('Failed to reset password.');

    expect(pool.query).toHaveBeenCalledWith('select * from users where email = $1', [email]);

  });
});