const pool = require('../database/db');
const HTTPError = require('http-errors');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

async function getStatistics(uid, startDate, endDate) {
  const validUser = await pool.query('select uid from users where uid = $1', [uid]);
  if (validUser.rows.length === 0) {
    throw HTTPError(403, 'Invalid User');
  }

  const from = new Date(startDate).getTime();
  const to = new Date(endDate).getTime();
  if (from > to) {
    throw HTTPError(400, 'startDate is larger than endDate');
  }
  
  let q = 'select email from users where uid = $1';
  const email = (await pool.query(q, [uid])).rows[0].email;

  q = 'select invoices from sent_invoices where receiver_email = $1 and sent_at::date between (select to_date($2, \'DD/MM/YYYY\')) and (select to_date($3, \'DD/MM/YYYY\'))';

  const invoices = await pool.query(q, [email, startDate, endDate]);
  // console.log(invoices.rows);

  // [{invoices: [...]}]
  if (invoices.rows.length === 0) {
    return { message: 'No invoices found within given date range'};
  }
  
  let payableAmount = 0.00;
  let numInvoices = 0;
  const parser = new  XMLParser();
  for (const resObj of invoices.rows) {
    for (const invoice of resObj.invoices) {
      let xmlObj = parser.parse(invoice);
      console.log(xmlObj.Invoice['cac:LegalMonetaryTotal']);
      payableAmount += xmlObj.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount'];
      numInvoices++;
    }
  }
  
  
  payableAmount = payableAmount.toFixed(2);
  console.log("payableAmount", payableAmount);
  console.log("numInvoices", numInvoices);
 

  return {
    numInvoices: numInvoices,
    payableAmount: '$' + payableAmount
  };
}

module.exports = getStatistics;
