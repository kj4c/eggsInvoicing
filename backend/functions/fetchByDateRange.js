const pool = require('../database/db');
const HTTPError = require('http-errors');

// this function would allow the function to fetch
// the invoice by date range
async function fetchByDateRange(uid, fromDate, toDate) {
  const validUser = await pool.query('select uid from users where uid = $1', [uid]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, 'Invalid User');
  }

  const from = new Date(fromDate).getTime();
  const to = new Date(toDate).getTime();
  if (from > to) {
    throw HTTPError(400, 'fromDate is larger than toDate');
  }

  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uid])).rows[0].email;

  q = 'select * from sent_invoices where receiver_email = $1 and (select sent_at::date AT TIME ZONE \'Australia/Sydney\')  between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';

  const res = await pool.query(q, [email, fromDate, toDate]);

  if (res.rows.length === 0) {
    return { message: 'No emails found within given date range'};
  }
  return res.rows;
}

module.exports = fetchByDateRange;
