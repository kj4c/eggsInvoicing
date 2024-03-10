const nodemailer = require('nodemailer');
const pool = require('../database/db');

async function sendEmailWithMultipleJSON(from, recipient, jsonFiles) {
  if (!from) {
    throw new Error('from is required but was not provided.');
  }

  if (!recipient) {
    throw new Error('recipient is required but was not provided.');
  }

  if (!jsonFiles || !Array.isArray(jsonFiles) || jsonFiles.length === 0) {
    throw new Error('jsonFiles is required but was not provided.');
  }

  // Directly use the JSON content for attachments without writing to the filesystem
  const attachments = jsonFiles.map(jsonFile => {
    if (typeof jsonFile.filename !== 'string' || typeof jsonFile.jsonContent !== 'object') {
      throw new Error(`Expected filename to be a string and jsonContent to be an object, but got ${typeof jsonFile.filename} and ${typeof jsonFile.jsonContent}`);
    }
    return {
      filename: jsonFile.filename,
      content: JSON.stringify(jsonFile.jsonContent),
      contentType: 'application/json',
    };
  });

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
    text: `Hey, here are the JSON files from ${from}`,
    attachments: attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);

  const invoiceIds = [];
  for (const attachment of attachments) {
    let query = 'INSERT INTO sent_invoices (sender_email, receiver_email, invoices, type) VALUES ($1, $2, ARRAY[$3::json], \'JSON\') RETURNING invoice_id';
    const invoiceId = (await pool.query(query, [from, recipient, attachment.content])).rows[0].invoice_id;
    invoiceIds.push(invoiceId);

    query = 'UPDATE users SET notifications = array_append(notifications, $1) WHERE email = $2';
    await pool.query(query, [invoiceId.toString(), recipient]);
  }

  return invoiceIds;
}

module.exports = sendEmailWithMultipleJSON;
