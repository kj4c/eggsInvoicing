const pool = require('../database/db');
const HTTPError = require('http-errors');

// this function allows the user to fetch invoice by date
async function fetchByDate(uId, date) {
  const validUser = await pool.query('select uid from users where uid = $1', [uId]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, 'Invalid User');
  }

  // date format is DD/MM/YYYY UTC
  // select to_date('11/03/2024','DD/MM/YYYY');
  // select sent_at::date

  // q = "select date_trunc('day', now())"
  // "2024-03-09 00:00:00+00";
  // "select date_part('year')"

  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = 'select * from sent_invoices where receiver_email = $1 and sent_at::date = (select to_date($2, \'DD/MM/YYYY\'))';
  const res = await pool.query(q, [email, date]);
  if (res.rows.length === 0) {
    return { message: 'No emails found with given date'};
  }
  return res.rows;
}

module.exports = fetchByDate;