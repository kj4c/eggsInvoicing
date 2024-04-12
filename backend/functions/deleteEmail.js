const pool = require('../database/db');
const HTTPError = require('http-errors');

async function deleteEmail(invoice_id) {
  if (!invoice_id) {
    throw HTTPError(400, 'invoice_id not provided');
  }

  let q = 'delete from sent_invoices where invoice_id = $1';
  deleteEmail = await pool.query(q, [invoice_id]);

  if (deleteEmail.rowCount === 0) {
    throw HTTPError(404, 'Invoice ID not found');
  }

  console.log('Successfully Deleted Invoice: %d', invoice_id);

  return deleteEmail.rowCount;
}

module.exports = deleteEmail;