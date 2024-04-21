const nodemailer = require('nodemailer');
const pool = require('../database/db');

// this function allows the user to send multipe an array of xml files
// to the user and send all of it to the user
async function sendEmailWithMultipleXML(from, recipient, xmlFiles) {
  if (!from) {
    throw new Error('from is required but was not provided.');
  }

  if (!recipient) {
    throw new Error('recipient is required but was not provided.');
  }

  if (!xmlFiles || !Array.isArray(xmlFiles) || xmlFiles.length === 0) {
    throw new Error('xmlFiles is required but was not provided.');
  }

  // Directly use the XML content for attachments without writing to the filesystem
  const attachments = xmlFiles.map(xmlFile => {
    if (typeof xmlFile.filename !== 'string' || typeof xmlFile.xmlString !== 'string') {
      throw new Error(`Expected filename and xmlString to be strings, but got ${typeof xmlFile.filename} and ${typeof xmlFile.xmlString}`);
    }
    return {
      filename: xmlFile.filename,
      content: xmlFile.xmlString,
      contentType: 'text/xml',
    };
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'xmlsender1@gmail.com',
      pass: 'spfs ucnq sjaj qktq',
    },
  });

  const mailOptions = {
    from: 'xmlsender1@gmail.com',
    to: recipient,
    subject: 'Hello from Node.js',
    text: `Hey, here are the XML files from ${from}`,
    attachments: attachments,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);

  const invoiceIds = [];
  for (const attachment of attachments) {
    let query = 'INSERT INTO sent_invoices (sender_email, receiver_email, invoices, title, type) VALUES ($1, $2, ARRAY[$3], $4, $5) RETURNING invoice_id';
    const invoiceId = (await pool.query(query, [from, recipient, attachment.content, attachment.filename, 'XML'])).rows[0].invoice_id;
    invoiceIds.push(invoiceId);

    query = 'UPDATE users SET notifications = array_append(notifications, $1) WHERE email = $2';
    await pool.query(query, [invoiceId.toString(), recipient]);
  }

  // No filesystem cleanup needed since we didn't write any files
  return invoiceIds;
}

module.exports = sendEmailWithMultipleXML;
