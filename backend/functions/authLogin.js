const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

async function authLogin(username, password) {
  try {

    // checks if username exists in database
    const existingUser = await pool.query('select * from users where username = $1', [username]);
    if (existingUser.rows.length === 0) {
      throw createError(400, 'Username does not exist');
    }

    // compares the encrypted password to password entered
    const encrypted = existingUser.rows[0].hashed_password;

    const compare = await bcrypt.compare(password, encrypted);
    if (!compare) {
      throw createError(401, 'Password is incorrect');
    }

    console.log('Successfully logged in:', existingUser.rows[0]);

    return {
      status: 200,
      uid: existingUser.rows[0].uid
    };
    // gracefully catches error for unexpected occurences
  } catch (error) {
    console.error('Failed to login:', error.message);
    throw error;
  }
}

module.exports = authLogin;