const pool = require('../database/db');
const createError = require('http-errors');

async function receiveEmail(uid, invoiceId) {
  try {
    const userEmail = await pool.query("SELECT email FROM users WHERE uid = $1", [uid]);
    let q = "SELECT receiver_email, invoice_id FROM sent_invoices WHERE receiver_email = $1 AND invoice_id = $2";
    const emailFound = await pool.query(q,[userEmail.rows[0].email, invoiceId]);
    if (emailFound.rows.length === 0) {
      throw createError(400, "Email not received.");
    } else {
      return {
        status: 200,
        message: "Success"
      };
    }
  } catch (error) {
    console.error("Failed to receive email:", error.message);
    throw error;
  }
}

module.exports = receiveEmail;