const pool = require('../database/db');
const HTTPError = require('http-errors');
const { XMLParser } = require('fast-xml-parser');

async function getStatisticsDateRangeV2(uid, startDate, endDate) {
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

  var lineExtensionAmount, taxExclusiveAmount, taxInclusiveAmount, chargeTotalAmount,
    prepaidAmount, payableAmount, numInvoices, numInvoiceLines, taxAmount;

  lineExtensionAmount = taxExclusiveAmount = taxInclusiveAmount = chargeTotalAmount =
  prepaidAmount = payableAmount = numInvoices = numInvoiceLines = taxAmount = 0;

  const parser = new  XMLParser();
  for (const invoiceObj of invoices.rows) {
    for (const invoiceXml of invoiceObj.invoices) {
      try {
        const xmlObj = parser.parse(invoiceXml);
        const invoice = xmlObj.Invoice;
        taxAmount += parseFloat(invoice['cac:TaxTotal']['cbc:TaxAmount']);
        numInvoiceLines += invoice['cac:InvoiceLine'].length;
        const monetaryTotal = invoice['cac:LegalMonetaryTotal'];
        lineExtensionAmount += parseFloat(monetaryTotal['cbc:LineExtensionAmount']);
        taxExclusiveAmount += parseFloat(monetaryTotal['cbc:TaxExclusiveAmount']);
        taxInclusiveAmount += parseFloat(monetaryTotal['cbc:TaxInclusiveAmount']);
        if (monetaryTotal['cbc:ChargeTotalAmount'] === 0) {
          chargeTotalAmount += parseFloat(monetaryTotal['cbc:ChargeTotalAmount']);
        }
        if (monetaryTotal['cbc:PrepaidAmount'] === 0) {
          prepaidAmount += parseFloat(monetaryTotal['cbc:PrepaidAmount']);
        }
        payableAmount += parseFloat(monetaryTotal['cbc:PayableAmount']);
        numInvoices++;
      } catch (error) {
        continue
      }
      
    }
  }

  lineExtensionAmount = lineExtensionAmount.toFixed(2);
  taxExclusiveAmount = taxExclusiveAmount.toFixed(2);
  taxInclusiveAmount = taxInclusiveAmount.toFixed(2);
  chargeTotalAmount = chargeTotalAmount.toFixed(2);
  prepaidAmount = prepaidAmount.toFixed(2);
  payableAmount = payableAmount.toFixed(2);
  return {
    message: `LegalMonetaryTotal for requested period from ${startDate} to ${endDate}`,
    numInvoices: numInvoices,
    numInvoiceLines: numInvoiceLines,
    lineExtensionAmount: '$' + lineExtensionAmount,
    taxExclusiveAmount: '$' + taxExclusiveAmount,
    taxAmount: '$' + taxAmount,
    taxInclusiveAmount: '$' + taxInclusiveAmount,
    chargeTotalAmount: '$' + chargeTotalAmount,
    prepaidAmount: '$' + prepaidAmount,
    payableAmount: '$' + payableAmount
  };
}

module.exports = getStatisticsDateRangeV2;
