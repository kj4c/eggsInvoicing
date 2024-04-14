const nodemailer = require('nodemailer');
const pool = require('../database/db');

// this funciton would allow the user to send multiple json file in an array
// to the user and send all of the json files that would ahve a file name
// and the json string
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

  const attachments = jsonFiles.map(jsonFile => {
    // Expecting jsonString instead of jsonContent
    if (typeof jsonFile.filename !== 'string' || typeof jsonFile.jsonString !== 'string') {
      throw new Error(`Expected filename to be a string and jsonString to be a string, but got ${typeof jsonFile.filename} and ${typeof jsonFile.jsonString}`);
    }
    return {
      filename: jsonFile.filename,
      content: jsonFile.jsonString, // Directly using jsonString without JSON.stringify
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
    let query = 'INSERT INTO sent_invoices (sender_email, receiver_email, invoices, title, type) VALUES ($1, $2, ARRAY[$3::json], \'JSON\') RETURNING invoice_id';
    const invoiceId = (await pool.query(query, [from, recipient, attachment.content, attachment.filename, 'JSON'])).rows[0].invoice_id;
    invoiceIds.push(invoiceId);

    query = 'UPDATE users SET notifications = array_append(notifications, $1) WHERE email = $2';
    await pool.query(query, [invoiceId.toString(), recipient]);
  }

  return invoiceIds;
}

module.exports = sendEmailWithMultipleJSON;
