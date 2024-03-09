const nodemailer = require('nodemailer');
const fs = require('fs').promises;
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

  const attachmentPromises = jsonFiles.map(async (jsonFile) => {
    if (typeof jsonFile.filename !== 'string') {
      throw new Error(`Expected filename to be a string, but got ${typeof jsonFile.filename}`);
    }
    await fs.writeFile(jsonFile.filename, jsonFile.jsonString);
    return {
      filename: jsonFile.filename,
      path: `./${jsonFile.filename}`,
      contentType: 'application/json'
    };
  });

  const attachments = await Promise.all(attachmentPromises);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "xmlSender1@gmail.com",
      pass: "spfs ucnq sjaj qktq",
    },
  });

  const mailOptions = {
    from: "xmlSender1@gmail.com",
    to: recipient,
    subject: "Hello from Node.js with JSON",
    text: `Hey, here are the JSON files from ${from}`,
    attachments: attachments,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);

  const invoiceIds = [];

  try {
    for (const attachment of attachments) {
      const jsonString = await fs.readFile(attachment.path, { encoding: 'utf8' });
      let query = `INSERT INTO sent_invoices (sender_email, receiver_email, json_invoices) VALUES ($1, $2, $3) RETURNING invoice_id`;
      const invoiceId = (await pool.query(query, [from, recipient, jsonString])).rows[0].invoice_id;
      invoiceIds.push(invoiceId); 

      query = "UPDATE users SET notifications = array_append(notifications, $1) WHERE email = $2";
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

module.exports = sendEmailWithMultipleJSON;
