const nodemailer = require('nodemailer');
const pool = require('../database/db');

// this function allows the user to just send one xml file to the user 
// and the file name is always attachment.xml
async function sendEmailWithXML(from, recipient, xmlString, filename = 'attachment.xml') {
  if (!xmlString) {
    throw new Error('xmlString is required but was not provided.');
  }

  if (!recipient) {
    throw new Error('recipient is required but was not provided.');
  }

  if (!from) {
    throw new Error('from is required but was not provided.');
  }

  // the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'xmlsender1@gmail.com',
      pass: 'spfs ucnq sjaj qktq', // Be cautious with passwords; consider using environment variables for sensitive info
    },
  });

  // the mail options, using content directly instead of a file path
  const mailOptions = {
    from: 'xmlsender1@gmail.com', // Consider using the `from` parameter here if you want the sender to be dynamic
    to: recipient,
    subject: 'Hello from Node.js',
    text: `Hey, this is an XML file from ${from}`,
    attachments: [
      {
        filename: filename,
        content: xmlString, // Directly using the XML string here
        contentType: 'text/xml'
      }
    ]
  };

  // sending of the mail
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);

  // database operations remain unchanged
  let query = 'insert into sent_invoices (sender_email, receiver_email, invoices, type) values ($1, $2, $3, $4) returning invoice_id';
  const invoiceId = (await pool.query(query, [from, recipient, [xmlString], 'XML'])).rows[0].invoice_id;
  console.log('Invoice ID: %d ', invoiceId);

  query = 'update users set notifications = array_append(notifications, $1) where email = $2';
  await pool.query(query, [invoiceId, recipient]);

  return invoiceId;
}

module.exports = sendEmailWithXML;
