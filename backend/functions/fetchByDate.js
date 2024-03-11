const pool = require("../database/db");
const HTTPError = require('http-errors');

async function fetchByDate(uId, date) {
  const validUser = await pool.query("select uid from users where uid = $1", [uId]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, "Invalid User");
  }

  // date format is yyyy-mm-dd UTC
  // select to_date('2024-03-09','YYYYMMDD')
  // select sent_at::date

  let q = "select email from users where uid = $1";
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = "select * from sent_invoices where receiver_email = $1 and sent_at::date = (select to_date(date, 'YYYYMMDD'))";

  q = "select date_trunc('day', now())"
  "2024-03-09 00:00:00+00";
  "select date_part('year')"
}

module.exports = fetchByDate;