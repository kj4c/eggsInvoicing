const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const errorHandler = require('middleware-http-errors');
const PORT = 3000;
const getNotifications = require('./functions/getNotifications');
const hasReceivedInvoiceId = require('./functions/hasReceivedInvoiceId');
const sendEmailWithXML = require('./functions/sendingEmailFunction');
// const receiveEmail = require('./functions/receiveEmail');
const authRegister = require('./functions/authRegister');
const authLogin = require('./functions/authLogin');
const generateReceivePdf = require('./functions/report');

app.use(express.json());
app.use(errorHandler());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello world!");
});

// manual testing works
app.post('/send/email', async function (req, res) {
  const { from, recipient, xmlString } = req.body;

  try {
    const messageId = await sendEmailWithXML(from, recipient, xmlString);
    res.status(200).json({ success: true, messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.get('/receive/hasReceivedInvoiceId', async function (req, res) {
  const { invoiceId, receiverEmail } = req.body;
  res.status(200).json(await hasReceivedInvoiceId(invoiceId, receiverEmail));
});

app.put('/:userId/updateStatus', (req, res) => {

  res.status(200).json({ message: "Successfully changed state" });
});

app.get('/receive/getNotifications', async function (req, res) {
  const uId = req.body.uId;
  res.status(200).json(await getNotifications(uId));
});

app.post('/:userId/send/multiInvoice', (req, res) => {

  res.status(200).json({ invoiceIds: [123, 456] });
});

app.post('/:userId/send/text', (req, res) => {
  // indentations 
  res.status(200).json({ textId: 789 });
});

app.get('/receiveReport', async(req, res) => {
  try {
    const uid = parseInt(req.query.uid);
    let pdf = await generateReceivePdf(uid);
    if (pdf.status != 200) {
      res.status(400).message({error: "error generating the report"});
    }
    pdf = pdf.doc;
    res.setHeader('Content-Disposition', 'attachment; filename="communication_report_received.pdf"'); 
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf.output());
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "error generating the report"});
  }
});

app.get('/:userId/allEmails', (req, res) => {

  res.status(200).json([{ title: "Invoice", sender: "sender@example.com", receiver: "receiver@example.com", xml: "<xml></xml>", time: "2024-02-28T12:00:00Z" }]);
});

app.delete('/:userId/allEmails/delete', (req, res) => {

  res.status(200).json({ message: "successfully deleted invoice id" });
});

app.post('/register', async(req, res) => {
  try {
    const { email, phone, username, password } = req.body;
    res.status(200).json(await authRegister(email, phone, username, password));
  } catch (err) {
    res.status(400).json({message: "Failed to register new user:"})
  }
});

app.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    res.status(200).json(await authLogin(username, password));
  } catch (err) {
    res.status(400).json({ message: "Failed to login:"})
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;

