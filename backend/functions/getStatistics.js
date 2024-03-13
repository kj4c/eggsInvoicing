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
  if (invoices.rows.length === 0) {
    return { message: 'No invoices found within given date range'};
  }

  // invoices.rows = 
  // [
  //   { 
  //     invoices: [xmlString1, xmlString2 ...]
  //   },
  //   {
  //     invoices: [xmlString1, xmlString2 ...]
  //   }
  // ]

  let lineExtensionAmount = taxExclusiveAmount = taxInclusiveAmount = 
      chargeTotalAmount = prepaidAmount = payableAmount = numInvoices = 0;

  const parser = new  XMLParser();
  for (const invoiceObj of invoices.rows) {
    for (const invoiceXml of invoiceObj.invoices) {
      let xmlObj = parser.parse(invoiceXml);
      const invoice = xmlObj.Invoice;
      const monetaryTotal = invoice['cac:LegalMonetaryTotal'];
      // console.log(monetaryTotal);
      // console.log('IssueDate: ',invoice['cbc:IssueDate']);
      // console.log('DueDate: ', invoice['cbc:DueDate']);
      lineExtensionAmount +=parseFloat(monetaryTotal['cbc:LineExtensionAmount']);
      taxExclusiveAmount +=parseFloat(monetaryTotal['cbc:TaxExclusiveAmount']);
      taxInclusiveAmount +=parseFloat(monetaryTotal['cbc:TaxInclusiveAmount']);
      if (monetaryTotal['cbc:ChargeTotalAmount']) {
        chargeTotalAmount +=parseFloat(monetaryTotal['cbc:ChargeTotalAmount']);
      }
      if (monetaryTotal['cbc:PrepaidAmount']) {
        prepaidAmount +=parseFloat(monetaryTotal['cbc:PrepaidAmount']);
      }
      payableAmount += parseFloat(monetaryTotal['cbc:PayableAmount']);
      numInvoices++;
    }
  }

  lineExtensionAmount = lineExtensionAmount.toFixed(2); 
  taxExclusiveAmount = taxExclusiveAmount.toFixed(2); 
  taxInclusiveAmount = taxInclusiveAmount.toFixed(2); 
  chargeTotalAmount = chargeTotalAmount.toFixed(2); 
  prepaidAmount = prepaidAmount.toFixed(2); 
  payableAmount = payableAmount.toFixed(2);
  // console.log(lineExtensionAmount, taxExclusiveAmount, taxInclusiveAmount, 
  //   chargeTotalAmount, prepaidAmount, payableAmount, numInvoices);
  return {
    message: `Total LegalMonetaryTotal for requested period from ${startDate} to ${endDate}`,
    numInvoices: numInvoices,
    totalLineExtensionAmount: '$' + lineExtensionAmount,
    totalTaxExclusiveAmount: '$' + taxExclusiveAmount,
    totalTaxInclusiveAmount: '$' + taxInclusiveAmount,
    totalChargeTotalAmount: '$' + chargeTotalAmount,
    totalPrepaidAmount: '$' + prepaidAmount,
    totalPayableAmount: '$' + payableAmount
  };
}

module.exports = getStatistics;
