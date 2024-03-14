const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const saltRounds = 10;

async function resetPasswordFunction(email, password) {
  try {
    const existingEmail = await pool.query('select * from users where email = $1', [email]);

    const samePass = await bcrypt.compare(password, existingEmail.rows[0].hashed_password);

    if (samePass) {
      throw createError(400, 'New password cannot be the same as existing password.');
    }

    const encrypted = await bcrypt.hash(password, saltRounds);

    const updatePassword = await pool.query('update users set hashed_password = $1 where email = $2', [encrypted, email]);
    console.log('Password successfully reset.');

    return {
      status: 200,
      message: 'Password successfully reset.'
    }
  } catch (err) {
    throw createError(400, 'Failed to reset password.')
  }
};

module.exports = resetPasswordFunction;