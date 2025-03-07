const pool = require('../database/db');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const saltRounds = 10;

// register would take in email phone number username
// password and it would go through number of error checks
// then it would allow the user to register and put the details on the
// database.
async function authRegister(email, phone_no, username, password) {
  try {
    // checks if given email is registered
    const existingEmail = await pool.query('select * from users where email = $1', [email]);
    if (existingEmail.rows.length > 0) {
      throw createError(400, 'Email entered already in use.');
    }

    // checks if given phone is already registered
    const existingPhoneNo = await pool.query('select * from users where phone_no = $1', [phone_no]);
    if (existingPhoneNo.rows.length > 0) {
      throw createError(400, 'Phone number entered already in use.');
    }

    // checks if username is already taken
    const existingUser = await pool.query('select * from users where username = $1', [username]);
    if (existingUser.rows.length > 0) {
      throw createError(400, 'Username entered already in use.');
    }

    // encrypts the password using bcrypt
    const encrypted = await bcrypt.hash(password, saltRounds);

    // inserts the new registered user into the database
    const q = 'INSERT INTO users (email, phone_no, username, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *';
    // const registered = await
    await pool.query(q, [email, phone_no, username, encrypted]);
    console.log('Successfully registered:', username);

    return {
      status: 200,
      message: 'Successfully registered.'
    };
    // gracefully catches error for unexpected occurences
  } catch (error) {
    console.error('Failed to register new user:', error.message);
    throw error;
  }
}

module.exports = authRegister;