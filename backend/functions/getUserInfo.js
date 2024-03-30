const pool = require('../database/db');
const createError = require('http-errors');

async function getUserInfo(uid) {
  try {
    // checks if uid exists in database
    const existingId = await pool.query('select username, email, phone_no from users where uid = $1', [uid]);
    if (existingId.rows.length === 0) {
      throw createError(400, 'UID does not exist');
    }

    const user = existingId.rows[0];
    const username = user.username;
    const email = user.email;
    const phone_no = user.phone_no;

    return {
      status: 200,
      username: username,
      email: email,
      phone_no: phone_no
    };
    // gracefully catches error for unexpected occurences
  } catch (error) {
    console.error('Failed to get user info:', error.message);
    throw error;
  }
}

module.exports = getUserInfo;