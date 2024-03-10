const nodemailer = require('nodemailer');
const pool = require('../database/db');

async function sendEmailWithJSON(from, recipient, jsonString, filename = 'attachment.json') {
  if (!jsonString) {
    throw new Error('jsonString is required but was not provided.');
  }

  if (!recipient) {
    throw new Error('recipient is required but was not provided.');
  }

  if (!from) {
    throw new Error('from is required but was not provided.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'xmlSender1@gmail.com',
      pass: 'spfs ucnq sjaj qktq',
    },
  });

  const mailOptions = {
    from: 'xmlSender1@gmail.com',
    to: recipient,
    subject: 'Hello from Node.js with JSON',
    text: `Hey, this is a JSON file from ${from}`,
    attachments: [
      {
        filename: filename,
        // ensure jsonString is a string. Use JSON.stringify if jsonString could be an object.
        content: typeof jsonString === 'string' ? jsonString : JSON.stringify(jsonString),
        contentType: 'application/json'
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);

  let query = `insert into sent_invoices (sender_email, receiver_email, invoices, type)
  values ($1, $2, $3, $4) returning invoice_id`;
  const invoiceId = (await pool.query(query, [from, recipient, [jsonString], 'JSON'])).rows[0].invoice_id;
  console.log('Invoice ID: %d ', invoiceId);

  query = 'update users set notifications = array_append(notifications, $1) where email = $2';
  await pool.query(query, [invoiceId.toString(), recipient]);

  return invoiceId;
}

module.exports = sendEmailWithJSON;