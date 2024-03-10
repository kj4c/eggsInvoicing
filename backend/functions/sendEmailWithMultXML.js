const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const pool = require('../database/db');

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

  const attachmentPromises = xmlFiles.map(async (xmlFile) => {
    if (typeof xmlFile.filename !== 'string') {
      throw new Error(`Expected filename to be a string, but got ${typeof xmlFile.filename}`);
    }
    await fs.writeFile(xmlFile.filename, xmlFile.xmlString);
    return {
      filename: xmlFile.filename,
      path: `./${xmlFile.filename}`,
      contentType: 'text/xml'
    };
  });

  const attachments = await Promise.all(attachmentPromises);

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

  try {
    for (const attachment of attachments) {
      const xmlString = await fs.readFile(attachment.path, { encoding: 'utf8' });
      let query = 'INSERT INTO sent_invoices (sender_email, receiver_email, invoices, type) VALUES ($1, $2, ARRAY[$3], $4) RETURNING invoice_id';
      const invoiceId = (await pool.query(query, [from, recipient, xmlString, 'XML'])).rows[0].invoice_id;
      invoiceIds.push(invoiceId);

      query = 'UPDATE users SET notifications = array_append(notifications, $1) WHERE email = $2';
      await pool.query(query, [invoiceId.toString(), recipient]);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    const cleanupPromises = attachments.map(attachment => fs.unlink(attachment.path));
    await Promise.all(cleanupPromises);
  }

  return invoiceIds;
}

module.exports = sendEmailWithMultipleXML;
