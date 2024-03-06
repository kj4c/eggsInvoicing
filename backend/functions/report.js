const {jsPDF} = require('jspdf');
require('jspdf-autotable');
const pool = require('../database/db')

// Returns a generated P
async function generatePdf() {
    const selectQuery = "SELECT invoice_id, sender, sent_at FROM send_invoice";
    const qres = await pool.query(selectQuery);
    let data = qres.rows.map(row => [row.invoice_id, row.sender, row.sent_at]);
    const doc = new jsPDF();
    const tbCol = ["Invoice Id", "Sender","Time"];

    let today = new Date().toLocaleString('en-au')
    let subtitle = "Generated on: "+ today
    let pageHeight = doc.internal.pageSize.getHeight();
    let pageWidth = doc.internal.pageSize.getWidth();
    
    doc.text("Communication Report for Received Invoices", pageWidth / 2, 10, {align: 'center'});
    doc.text(subtitle, pageWidth / 2, pageHeight  - 10, {align: 'center'});
    doc.autoTable({
        head: [tbCol],
        body: data,
        startY:20
    });
    doc.save("communication_report.pdf");
    return {status: 200, doc: doc};
}
module.exports = generatePdf