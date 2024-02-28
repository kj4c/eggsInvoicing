const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/:userId/send/email', (req, res) => {

  res.status(200).json({ invoiceId: 123 });
});

app.get('/:userId/receiveEmail', (req, res) => {

  res.status(200).json({ message: "successfully received X emails" });
});

app.put('/:userId/updateStatus', (req, res) => {

  res.status(200).json({ message: "Successfully changed state" });
});

app.post('/:userId/send/multiInvoice', (req, res) => {

  res.status(200).json({ invoiceIds: [123, 456] });
});

app.post('/:userId/send/text', (req, res) => {
  
  res.status(200).json({ textId: 789 });
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
