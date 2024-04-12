const pool = require('../database/db');
const HTTPError = require('http-errors');

// given the id of an invoice, deletes the invoice from the database
async function deleteEmail(invoiceId) {
  try {
    const q = 'delete from sent_invoices where invoice_id = $1';
    const deleteResult = await pool.query(q, [invoiceId]);

    if (deleteResult.rowCount === 0) {
      throw HTTPError(404, 'Invoice ID not found');
    }

    console.log('Successfully Deleted Invoice: %d', invoiceId);

    return {
      status: 200
    };
  } catch (error) {
    console.error('Failed to delete:', error.message);
    throw error;
  }

}

module.exports = deleteEmail;