const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const pool = require('../database/db');

async function sendEmailWithMultipleXML(from, recipient, xmlFiles) {
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

  const mailOptions = {
    from: "xmlsender1@gmail.com",
    to: recipient,
    subject: "Hello from Node.js",
    text: `Hey, here are the XML files from ${from}`,
    attachments: attachments,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);

  try {
    for (const attachment of attachments) {
      const xmlString = await fs.readFile(attachment.path, { encoding: 'utf8' });
      let query = `INSERT INTO sent_invoices (sender_email, receiver_email, xml_invoices) VALUES ($1, $2, $3) RETURNING invoice_id`;
      const invoiceId = (await pool.query(query, [from, recipient, xmlString])).rows[0].invoice_id;

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
}


module.exports = sendEmailWithMultipleXML;
