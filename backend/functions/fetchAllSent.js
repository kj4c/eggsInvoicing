const pool = require('../database/db');
const HTTPError = require('http-errors');

// this would fetch all of the sent and recieved invoices
async function fetchAllSent(userEmail) {
  const validEmail = await pool.query('select email from users where email = $1', [userEmail]);
  if (validEmail.rows.length === 0) {
    throw HTTPError(403, 'Invalid Email');
  }

  const q = 'select * from sent_invoices where sender_email = $1';
  const emailFound = await pool.query(q, [userEmail]);
  return emailFound.rows;
}

module.exports = fetchAllSent;