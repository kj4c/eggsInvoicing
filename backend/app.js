const express = require('express');
const app = express();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const PORT = 3000;
const pool = require('./database/db')
const initdb = require('./database/initdb');
const receiveEmail = require('./functions/receiveEmail');

const generatePdf = require('./functions/report');
const fs = require('fs');

app.use(express.json());
initdb();

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.post('/:userId/send/email', async function (req, res) {
  let q = "select * from users";
  let newSent = await pool.query(q);

  res.status(200).json(newSent);
});

app.get('/:userId/receiveEmail', (req, res) => {
  receiveEmail(123,123);
  console.log('meow');
  res.status(200).json({ message: "successfully received X emails" });
});

app.put('/:userId/updateStatus', (req, res) => {

  res.status(200).json({ message: "Successfully changed state" });
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
    let pdf = await generatePdf();
    if (pdf.status != 200) {
      res.status(400).message({error: "error generating the report"});
    }
    pdf = pdf.doc;
    res.setHeader('Content-Disposition', 'attachment; filename="communication_report.pdf"'); 
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf.output());
    let fileDeleted = false;
    if (!fileDeleted) {
      fs.unlink('./communication_report.pdf', (err) => {
        if (err) throw err;
        fileDeleted = true;
        console.log("Deleted pdf");
      })
    }
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



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
