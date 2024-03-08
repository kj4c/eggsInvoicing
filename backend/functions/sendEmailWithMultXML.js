const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const pool = require('../database/db');

async function sendEmailWithMultipleXML(from, recipient, xmlFiles) {
  const attachmentPromises = xmlFiles.map(async (xmlFile) => {
    await fs.writeFile(xmlFile.filename, xmlFile.xmlString);
    return {
      filename: xmlFile.filename,
      path: `./${xmlFile.filename}`,
      contentType: 'text/xml'
    };
  });


  const attachments = await Promise.all(attachmentPromises);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "xmlsender1@gmail.com",
      pass: "yourpassword", 
    },
  });

  const mailOptions = {
    from: "xmlsender1@gmail.com",
    to: recipient,
    subject: "Hello from Node.js",
    text: `Hey, here are the XML files from ${from}`,
    attachments: attachments,
  };


  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    
    for (const attachment of attachments) {
      const xmlString = await fs.readFile(attachment.path, { encoding: 'utf8' });
      let query = `insert into sent_invoices (sender_email, receiver_email, xml_invoices)
                    values ($1, $2, $3) returning invoice_id`;
      const invoiceId = (await pool.query(query, [from, recipient, '{' + xmlString + '}'])).rows[0].invoice_id;

      query = "update users set notifications = array_append(notifications, $1) where email = $2";
      await pool.query(query, [invoiceId, recipient]);
    }
  } finally {
    const cleanupPromises = attachments.map(attachment => fs.unlink(attachment.path));
    await Promise.all(cleanupPromises);
  }
}

module.exports = sendEmailWithMultipleXML;
