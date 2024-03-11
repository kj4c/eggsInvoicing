const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const pool = require('../database/db');

// given a uid, generate a PDF of all the sent invoices of the user with the invoice numbers, the email used that send the invoice, and received time
async function generateSentPdf(uid) {
  // error checking
  if (uid === undefined) {
    console.log({error: 'Invalid uid'});
    return {status: 400};
  }

  // get current user's email
  const userQuery = 'SELECT email FROM users WHERE uid = $1';
  let user = await pool.query(userQuery, [uid]);
  if (user.rows.length === 0) {
    console.log({error: 'Invalid uid'});
    return {status: 400};
  }
  user = user.rows[0].email;

  const selectQuery = 'SELECT s.invoice_id, s.receiver_email, s.sent_at FROM sent_invoices s JOIN users u ON u.email = s.sender_email WHERE u.uid = $1';
  const qres = await pool.query(selectQuery, [uid]);
  const data = qres.rows.map(row => [row.invoice_id, row.receiver_email, row.sent_at.toLocaleString('en-au')]);
  const doc = new jsPDF();
  const tbCol = ['Invoice Id', 'Sent to', 'Time'];

  const today = new Date().toLocaleString('en-au');
  const genDate = 'Generated on: ' + today;
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(10);
  doc.text(genDate, pageWidth - 5, 10, {align: 'right'});
  doc.setFontSize(16);
  doc.text('Communication Report for Sent Invoices', pageWidth / 2, 20, {align: 'center'});
  doc.setFontSize(12);
  doc.text(`Sent by: ${user}`, pageWidth / 2, 30, {align: 'center'});
  doc.autoTable({
    head: [tbCol],
    body: data,
    startY: 40
  });
  return {status: 200, doc: doc};
}
module.exports = generateSentPdf;