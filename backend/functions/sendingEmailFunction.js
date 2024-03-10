const nodemailer = require('nodemailer');
const pool = require('../database/db');
const fs = require('fs').promises; 

// this is the function that would send the EMAIL with an XML file 
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
  

  await fs.writeFile(filename, xmlString);

  // the nodemail transporter 
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "xmlsender1@gmail.com",
      pass: "spfs ucnq sjaj qktq",
    },
  });

  // the mail options 
  const mailOptions = {
    from: "xmlsender1@gmail.com",
    to: recipient, 
    subject: "Hello from Node.js",
    text: `Hey, this is an XML file from ${from}`, 
    attachments: [
      {
        filename: filename,
        path: `./${filename}`, 
        contentType: 'text/xml' 
      }
    ]
  };

  // sending of the mail
  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  await fs.unlink(filename); 
  
  let query = `insert into sent_invoices (sender_email, receiver_email, invoices, type)
  values ($1, $2, $3, $4) returning invoice_id`;
  const invoiceId = (await pool.query(query, [from, recipient, [xmlString], 'XML'])).rows[0].invoice_id;
  console.log("Invoice ID: %d ", invoiceId);

  
  query = "update users set notifications = array_append(notifications, $1) where email = $2";
  await pool.query(query, [invoiceId, recipient]);

  return invoiceId;
}

module.exports = sendEmailWithXML;
