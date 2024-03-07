const express = require('express');
const app = express();
const errorHandler = require('middleware-http-errors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const PORT = 3000;
const getNotifications = require('./functions/getNotifications');
const hasReceivedInvoiceId = require('./functions/hasReceivedInvoiceId');
const sendEmailWithXML = require('./functions/sendingEmailFunction');
// const receiveEmail = require('./functions/receiveEmail');
const authRegister = require('./functions/authRegister');
const authLogin = require('./functions/authLogin');

const generateReceivePdf = require('./functions/report');
app.use(express.json());
// handles errors nicely
app.use(errorHandler());

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.post('/:userId/send/email', async function (req, res) {
  const { from, recipient, xmlString } = req.body;
  res.status(200).json(sendEmailWithXML(from, recipient, xmlString));
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

app.get('/:userId/receiveReport', async(req, res) => {
  try {
    let pdf = await generateReceivePdf(2);
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
