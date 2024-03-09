const nodemailer = require('nodemailer');
const pool = require('../database/db');
const fs = require('fs').promises; 

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
  
  await fs.writeFile(filename, jsonString);

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
    text: `Hey, this is a JSON file from ${from}`, 
    attachments: [
      {
        filename: filename,
        path: `./${filename}`, 
        contentType: 'application/json' 
      }
    ]
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  await fs.unlink(filename); 
  
  let query = `insert into sent_invoices (sender_email, receiver_email, json_invoices)
  values ($1, $2, $3) returning invoice_id`;
  const invoiceId = (await pool.query(query,[from, recipient, '{' + jsonString +'}'])).rows[0].invoice_id;
  console.log("Invoice ID: %d ", invoiceId);
  
  query = "update users set notifications = array_append(notifications, $1) where email = $2";
  await pool.query(query, [invoiceId, recipient]);

  return invoiceId;
}

module.exports = sendEmailWithJSON;
