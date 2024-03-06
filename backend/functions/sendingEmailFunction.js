const nodemailer = require('nodemailer');
const pool = require('../database/db');
const fs = require('fs').promises; 


// this is the function that would send the EMAIL with an XML file 
async function sendEmailWithXML(from, recipient, xmlString, filename = 'attachment.xml') {
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
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    await fs.unlink(filename); 
  
    let query = `insert into sent_invoices (sender_email, receiver_email, xml_invoices)
                  values ($1, $2, $3) returning invoice_id`;
    const invoiceId = (await pool.query(query,[from, recipient, '{' + xmlString +'}'])).rows[0].invoice_id;

    query = "update users set notifications = array_append(notifications, $1) where email = $2";
    await pool.query(query, [invoiceId, recipient]);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

module.exports = sendEmailWithXML;
