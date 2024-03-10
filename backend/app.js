const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorHandler = require('middleware-http-errors');
const PORT = 3000;
const getNotifications = require('./functions/getNotifications');
const sendEmailWithXML = require('./functions/sendingEmailFunction');
const sendEmailWithJSON = require('./functions/sendingEmailWithJsonFileAttachment');
const sendEmailWithMultipleJSON = require('./functions/sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('./functions/sendEmailWithMultXML');
const sendInvoiceLater = require('./functions/sendingInvoiceLater');
const authRegister = require('./functions/authRegister');
const authLogin = require('./functions/authLogin');
const receiveEmail = require('./functions/receiveEmail');
const generateReceivePdf = require('./functions/receiveReport');
const generateSentPdf = require('./functions/sentReport');
const fetchByInvoiceId = require('./functions/fetchByInvoiceId');
const fetchAll = require('./functions/fetchAll');

app.use(express.json());
app.use(errorHandler());
app.use(bodyParser.json());
app.use(errorHandler());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// manual testing works
/*
@brief 
Sends an email with a XML file attachment
@params 
from: string - who sent the email
recipient: string - email of the recipient
xmlString: string - XML string to be sent
*/
app.post('/send/email', async function (req, res) {
  const { from, recipient, xmlString } = req.body;

  try {
    const invoiceId = await sendEmailWithXML(from, recipient, xmlString);
    res.status(200).json({ success: true, invoiceId: invoiceId });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: 'Failed to send email' });
  }
});

/*
@brief 
Sends an email with a JSON file attachment
@params 
from: string - who sent the email
recipient: string - email of the recipient
jsonString: string - json string to be sent
*/
app.post('/send/email-json', async function (req, res) {
  const { from, recipient, jsonString } = req.body;

  try {
    const invoiceId = await sendEmailWithJSON(from, recipient, jsonString);
    res.status(200).json({ success: true, invoiceId: invoiceId });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: 'Failed to send email' });
  }
});

/*
@brief 
fetches all invoices sent/received by user
@params 
uid: int - user id of the user
*/
app.get('/receive/fetchAll', async function (req, res) {
  const uid = parseInt(req.query.uid);
  try {
    res.json(await fetchAll(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief 
checks if a userId has received a specific invoiceId
@params 
uid: int - user id of the user
invoiceId: int - invoice id of the invoice
*/
app.get('/receive/fetchByInvoiceId', async function (req, res) {
  const uid = parseInt(req.query.uid);
  const invoiceId = parseInt(req.query.invoiceId);
  try {
    res.json(await fetchByInvoiceId(uid, invoiceId));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief 
retrieves all new notifications for a user
@params 
uid: int - user id of the user
*/
app.get('/receive/getNotifications', async function (req, res) {
  const uid = parseInt(req.query.uid);
  res.status(200).json(await getNotifications(uid));
});

/*
@brief 
send multiple XML invoices to the specified recipient
@params 
from: string - who sent the email
recipient: string - email of the recipient
xmlFiles: array string - array of XML strings to be sent
*/
app.post('/send/multiInvoice', async (req, res) => {
  try {
    const { from, recipient, xmlFiles } = req.body;
    const invoiceId = await sendEmailWithMultipleXML(from, recipient, xmlFiles);
    res.status(200).json({ success: true, invoiceIds: invoiceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

/*
@brief 
send multiple JSON invoices to the specified recipient
@params 
from: string - who sent the email
recipient: string - email of the recipient
jsonFiles: array string - array of JSON strings to be sent
*/
app.post('/send/multiInvoice-json', async (req, res) => {
  try {
    const { from, recipient, jsonFiles } = req.body;
    const invoiceId = await sendEmailWithMultipleJSON(from, recipient, jsonFiles);
    res.status(200).json({ success: true, invoiceIds: invoiceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

/*
@brief 
Generates a PDF showing all the invoices sent by the user
@params 
uid: int - user id of the user
@output
on success
pdf: pdf - pdf file containing the report
if failed
error: string - error message
*/
app.get('/sentReport', async(req, res) => {
  try {
    const uid = parseInt(req.query.uid);
    let pdf = await generateSentPdf(uid);
    if (pdf.status !== 200) {
      res.status(400).json({error: 'error generating the report'});
    } else {
      pdf = pdf.doc;
      res.setHeader('Content-Disposition', 'attachment; filename="communication_report_sent.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdf.output());
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error generating the report'});
  }
});

/*
@brief 
send a singular file or multiple files to the recipient after a specified delay
@params 
type: string - type of file to be sent (json, xml, multiplejson, multiplexml)
from: string - who sent the email
recipient: string - email of the recipient
content: array of strings OR string - file(s) to be sent
delayInMinutes: int - delay in minutes before the email is sent
*/
app.post('/send/invoiceLater', async (req, res) => {
  const { type, from, recipient, content, delayInMinutes } = req.body;

  try {
    if (!type || !from || !recipient || !content || delayInMinutes === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    await sendInvoiceLater(type, from, recipient, content, delayInMinutes);
    console.log(`Scheduled invoice to be sent after ${delayInMinutes} minute(s)`);
    res.status(202).json({ success: true, message: `Invoice scheduled to be sent after ${delayInMinutes} minute(s)` });
  } catch (error) {
    console.error('Error scheduling invoice:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/*
@brief 
Generates a PDF showing all the invoices received by the user
@params 
uid: int - user id of the user
@output
on success
pdf: pdf - pdf file containing the report
if failed
error: string - error message
*/
app.get('/receiveReport', async(req, res) => {
  try {
    const uid = parseInt(req.query.uid);
    let pdf = await generateReceivePdf(uid);
    if (pdf.status !== 200) {
      res.status(400).json({error: 'error generating the report'});
    } else {
      pdf = pdf.doc;
      res.setHeader('Content-Disposition', 'attachment; filename="communication_report_sent.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdf.output());
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error generating the report'});
  }
});

/*
@brief 
registers a new user
@params 
email: string - email of the user
phone: string - phone number of the user
username: string - username of the user
password: string - password of the user
@output
on success:
status code and message
on failure:
status code and error message
*/
app.post('/register', async(req, res) => {
  try {
    const { email, phone, username, password } = req.body;
    res.status(200).json(await authRegister(email, phone, username, password));
  } catch (err) {
    res.status(400).json({message: 'Failed to register new user:'});
  }
});

app.get('/receiveEmail', async(req, res) => {
  try {
    const uid = parseInt(req.query.uid);
    const invoiceId = parseInt(req.query.invoiceId);
    res.status(200).json(await receiveEmail(uid, invoiceId));
  } catch (err) {
    res.status(400).json({message: 'Email not received.'});
  }
});

/*
@brief 
login a user
@params 
username: string - username of the user
password: string - password of the user
@output
on success:
status code - integer - 200
uid - integer - id of the user
on failure:
status code and error message
*/
app.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    res.status(200).json(await authLogin(username, password));
  } catch (err) {
    res.status(400).json({ message: 'Failed to login:'});
  }
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;

