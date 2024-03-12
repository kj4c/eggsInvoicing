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
const receiveHtml = require('./functions/receiveReportHtml');
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

app.get('/receive/fetchAll', async function (req, res) {
  const uid = parseInt(req.query.uid);
  try {
    res.json(await fetchAll(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

app.get('/receive/fetchByInvoiceId', async function (req, res) {
  const uid = parseInt(req.query.uid);
  const invoiceId = parseInt(req.query.invoiceId);
  try {
    res.json(await fetchByInvoiceId(uid, invoiceId));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

// need to fix coverage for this
app.get('/receive/getNotifications', async function (req, res) {
  const uid = parseInt(req.query.uid);
  res.status(200).json(await getNotifications(uid));
});

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

/* istanbul ignore next */
app.post('/:userId/send/text', (req, res) => {
  res.status(200).json({ textId: 789 });
});

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

app.get('/receiveHtml', async(req, res) => {
  try {
    const uid = parseInt(req.query.uid);
    let page = await receiveHtml(uid);
    if (page.status != 200) {
      res.status(page.status).json({message: page.error});
    }
    res.status(200).send(page);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error generating the report'});
  }
});

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

