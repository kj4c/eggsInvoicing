const pool = require("../database/db");
const HTTPError = require('http-errors');

async function fetchByInvoiceId(uId, invoiceId) {
  const validUser = await pool.query("select uid from users where uid = $1", [uId]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, "Invalid User");
  }

  let q = "select email from users where uid = $1";
  const email = (await pool.query(q, [uId])).rows[0].email;

  q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
  const emailFound = (await pool.query(q, [invoiceId, email]));
  if (emailFound.rows.length === 0 ) {
    throw HTTPError(400, "InvoiceId does not exists");
  } 
  return emailFound.rows[0];
}

module.exports = fetchByInvoiceId;
