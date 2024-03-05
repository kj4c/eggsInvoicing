const pool = require('../database/db');
const createError = require('http-errors');

async function receiveEmail(receiver, invoiceId) {
    try {
        const emailFound = await pool.query("SELECT receiver, invoice_id FROM send_invoice WHERE RECEIVER = $1 AND invoice_id = $2",[receiver, invoiceId]);
        if (emailFound.rows.length === 0) {
            throw createError(400, "Email not received.");
        } else {
            console.log(emailFound);
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