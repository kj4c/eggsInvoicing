const pool = require('../database/db');
const HTTPError = require('http-errors');

// this function would fetch the invoice by receiver email
async function fetchByReceiver(uId, receiver_email) {
  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = 'select * from sent_invoices where receiver_email = $1 and sender_email = $2';
  const emailFound = (await pool.query(q, [receiver_email, email]));
  if (emailFound.rows.length === 0 ) {
    throw HTTPError(400, 'No invoices found with matching receiver email');
  }
  return emailFound.rows;
}

module.exports = fetchByReceiver;
