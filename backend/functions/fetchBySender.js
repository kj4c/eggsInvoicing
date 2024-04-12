const pool = require('../database/db');
const HTTPError = require('http-errors');

// this function would fetch the invoice by sender email
async function fetchBySender(uId, sender_email) {
  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = 'select * from sent_invoices where sender_email = $1 and receiver_email = $2';
  const emailFound = (await pool.query(q, [sender_email, email]));
  if (emailFound.rows.length === 0 ) {
    throw HTTPError(400, 'No invoices found with matching sender email');
  }
  return emailFound.rows;
}

module.exports = fetchBySender;
