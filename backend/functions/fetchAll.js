const pool = require('../database/db');
const HTTPError = require('http-errors');

async function fetchAll(uId) {
  const validUser = await pool.query('select uid from users where uid = $1', [uId]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, 'Invalid User');
  }

  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = 'select * from sent_invoices where receiver_email = $1';
  const emailFound = await pool.query(q, [email]);
  return emailFound.rows;
}

module.exports = fetchAll;