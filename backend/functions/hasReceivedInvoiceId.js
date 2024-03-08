const pool = require("../database/db");

async function hasReceivedInvoiceId(invoiceId, recieverEmail) {
  const q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
  const res = (await pool.query(q, [invoiceId, recieverEmail])).rows;
  if (res.length === 0 ) {
    return {message: "User has not received invoiceId = " + invoiceId};
  } else {
    return {message: "User has received invoiceId = " + invoiceId};
  }
}

module.exports = hasReceivedInvoiceId;