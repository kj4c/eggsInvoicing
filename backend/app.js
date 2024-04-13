const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
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
const fetchAllSent = require('./functions/fetchAllSent');
const fetchByDate = require('./functions/fetchByDate');
const fetchByDateRange = require('./functions/fetchByDateRange');
const fetchByDateRangev2 = require('./functions/fetchByDateRangev2');
const getStatisticsDateRange = require('./functions/getStatisticsDateRange');
const sendMultEmail = require('./functions/sendMultEmail');
const getStatistics = require('./functions/getStatistics');
const getStatisticsV2 = require('./functions/v2getStatistics');
const getUserInfo = require('./functions/getUserInfo');
const createTeam = require('./functions/teamCreate');
const joinTeam = require('./functions/teamJoin');
const leaveTeam = require('./functions/teamLeave');
const detailTeam = require('./functions/teamDetail');

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(errorHandler());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandler());

/*
Home page
*/
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
@output
on success:
status code - integer - 200
success: boolean - true
invoiceId: integer - id of the invoice
on failure:
status code - integer - 400
success: boolean - false
error: string - error message
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
@output
on success:
status code - integer - 200
success: boolean - true
invoiceId: integer - id of the invoice
on failure:
status code - integer - 400
success: boolean - false
error: string - error message
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
fetches all invoices received by user
@params
uid: int - user id of the user
@output
on success:
invoices: array - array of invoices
on failure:
message: string - error message
*/
app.get('/receive/fetchAll', async function (req, res) {
  const uid = req.query.uid;
  try {
    res.json(await fetchAll(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
fetches all invoices sent by user
@params
uid: int - user id of the user
@output
on success:
invoices: array - array of invoices
on failure:
message: string - error message
*/
app.get('/receive/fetchAllSent', async function (req, res) {
  const email = req.query.email;
  try {
    res.json(await fetchAllSent(email));
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
@output
on success:
invoice: object - invoice object
on failure:
message: string - error message
*/
app.get('/receive/fetchByInvoiceId', async function (req, res) {
  const uid = req.query.uid;
  const invoiceId = parseInt(req.query.invoiceId);
  try {
    res.json(await fetchByInvoiceId(uid, invoiceId));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves all invoices on a specific date
@params
uid: int - user id of the user
date: string - date of the invoices
@output
invoices: array - array of invoices
OR
message: string - error message
*/
app.get('/receive/fetchByDate', async function (req, res) {
  const uid = req.query.uid;
  const date = req.query.date;
  try {
    res.json(await fetchByDate(uid, date));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves all invoices in between a date range
@params
uid: int - user id of the user
fromDate: string - start date of the range
toDate: string - end date of the range
@output
invoices: array - array of invoices
OR
message: string - error message
*/
app.get('/receive/fetchByDateRange', async function (req, res) {
  const uid = req.query.uid;
  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;
  try {
    res.json(await fetchByDateRange(uid, fromDate, toDate));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves all invoices in between a date range version 2
@params
uid: int - user id of the user
fromDate: string - start date of the range
toDate: string - end date of the range
@output
invoices: array - array of invoices
OR
message: string - error message
*/
app.get('/receive/fetchByDateRange/v2', async function (req, res) {
  const uid = req.query.uid;
  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;
  try {
    res.json(await fetchByDateRangev2(uid, fromDate, toDate));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves the statistics of the invoices in between a date range
@params
uid: int - user id of the user
startDate: string - start date of the range
endDate: string - end date of the range
@output
statistics: object - statistics of the invoices
OR
message: string - error message
*/
app.get('/receive/getStatisticsDateRange', async function (req, res) {
  const uid = req.query.uid;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  try {
    res.json(await getStatisticsDateRange(uid, startDate, endDate));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves the Financial Year, Financial Quarter,
monthly, weekly and daily financial statistics of the invoices
@params
uid: int - user id of the user
@output
statistics: object - statistics of the invoices
OR
message: string - error message
*/
app.get('/receive/getStatistics', async function (req, res) {
  const uid = req.query.uid;
  try {
    res.json(await getStatistics(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
version 2 of retrieves the Financial Year, Financial Quarter,
monthly, weekly and daily financial statistics of the invoices
@params
uid: int - user id of the user
@output
statistics: object - statistics of the invoices
OR
message: string - error message
*/
app.get('/receive/getStatistics/v2', async function (req, res) {
  const uid = req.query.uid;
  try {
    res.json(await getStatisticsV2(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
retrieves all new notifications for a user
@params
uid: int - user id of the user
@output
notifications: string - array of notifications for the user
OR
message: string - error message
*/
app.get('/receive/getNotifications', async function (req, res) {
  const uid = req.query.uid;
  try {
    res.json(await getNotifications(uid));
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

/*
@brief
send multiple XML invoices to the specified recipient
@params
from: string - who sent the email
recipient: string - email of the recipient
xmlFiles: array string - array of XML strings to be sent
@output
on success
success: boolean - true
invoiceIds: array int - array of invoice ids
if failed
success: boolean - false
message: string - error message
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
@output
on success
success: boolean - true
invoiceId: int - id of the invoice
if failed
success: boolean - false
message: string - error message
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
app.get('/sentReport', async (req, res) => {
  try {
    const uid = req.query.uid;
    let pdf = await generateSentPdf(uid);
    if (pdf.status !== 200) {
      res.status(400).json({ error: 'error generating the report' });
    } else {
      pdf = pdf.doc;
      res.setHeader('Content-Disposition', 'attachment; filename="communication_report_sent.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdf.output());
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error generating the report' });
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
@output
on success
status: 202
success: boolean - true
message: string - success message
if failed
success: boolean - false
message: string - error message
*/
app.post('/send/invoiceLater', (req, res) => {
  const { type, from, recipient, content, delayInMinutes } = req.body;

  // Check for required parameters
  if (!type || !from || !recipient || !content || delayInMinutes === undefined) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  res.status(202).json({ success: true, message: `Invoice scheduled to be sent after ${delayInMinutes} minute(s)` });

  sendInvoiceLater(type, from, recipient, content, delayInMinutes)
    .then(result => {
      console.log(`Invoice sent successfully after ${delayInMinutes} minute(s):`, result);
    })
    .catch(error => {
      console.error('Error sending invoice later:', error);
    });
});

/*
@brief
send a singular file or multiple files to multiple recipients at the same time
@params
type: string - type of file to be sent (json, xml, multiplejson, multiplexml)
from: string - who sent the email
recipients: array of strings - emails of the recipients
content: array of strings OR string - file(s) to be sent
@output
on success
status: 200
success: boolean - true
invoiceIds: array int - array of invoice ids
if failed
success: boolean - false
message: string - error message
*/
app.post('/send/multEmail', async (req, res) => {
  const { type, from, recipients, content } = req.body;
  try {
    if (!type || !from || !recipients || !content) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    if (!Array.isArray(recipients)) {
      return res.status(401).json({ success: false, message: 'Recipients must be an array' });
    }

    const results = await sendMultEmail(type, from, recipients, content);
    res.status(200).json({ success: true, invoiceIds: results });
  } catch (error) {
    console.error('Error sending multiple emails:', error);
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
app.get('/receiveReport', async (req, res) => {
  try {
    const uid = req.query.uid;
    let pdf = await generateReceivePdf(uid);
    if (pdf.status !== 200) {
      res.status(400).json({ error: 'error generating the report' });
    } else {
      pdf = pdf.doc;
      res.setHeader('Content-Disposition', 'attachment; filename="communication_report_receive.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdf.output());
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error generating the report' });
  }
});

/*
@brief
Generates a HTML file showing all the invoices received by the user
@params
uid: int - user id of the user
@output
on success
page: html file containing the report
if failed
error: string - error message
*/
app.get('/receiveHtml', async (req, res) => {
  try {
    const uid = req.query.uid;
    const page = await receiveHtml(uid);
    if (page.status !== 200) {
      res.status(page.status).json({ message: page.error });
    } else {
      res.status(200).send(page.page);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error generating the report' });
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
app.post('/register', async (req, res) => {
  try {
    const { email, phone, username, password } = req.body;
    res.status(200).json(await authRegister(email, phone, username, password));
  } catch (err) {
    res.status(400).json({ message: 'Failed to register new user:' });
  }
});

app.get('/receiveEmail', async (req, res) => {
  try {
    const uid = req.query.uid;
    const invoiceId = parseInt(req.query.invoiceId);
    res.status(200).json(await receiveEmail(uid, invoiceId));
  } catch (err) {
    res.status(400).json({ message: 'Email not received.' });
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
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await authLogin(username, password);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ message: 'Failed to login:' });
  }
});

/*
@brief
gets user info
@params
uid: integer - id of the user
@output
on success:
status code - integer - 200
username - string - username of user
email - string - email of user
phone_no - string - phone number of user
on failure:
status code and error message
*/
app.get('/getUserInfo', async (req, res) => {
  try {
    const uid = req.query.uid;
    const userInfo = await getUserInfo(uid);
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to get user info:' });
  }
});

/*
@brief
create team
@params
name: team name
email: email
@output
on success:
status code - integer - 200
passcode - string
on failure:
status code and error message
*/
app.post('/createteam', async(req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const teamEmail = req.body.teamEmail;
    const response = await createTeam(name, email, teamEmail);
    if (response.status !== 200) {
      res.status(response.status).json({error: response.error});
    } else {
      console.log(response.passcode);
      res.status(response.status).json({passcode: response.passcode});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Cannot create team'});
  }
});

/*
@brief
join team
@params
email
passcode
@output
on success:
status code - integer - 200
on failure:
status code and error message
*/
app.post('/jointeam', async(req, res) => {
  try {
    const email = req.body.email;
    const passcode = req.body.passcode;
    const response = await joinTeam(email, passcode);
    if (response.status !== 200) {
      res.status(response.status).json({error: response.error});
    } else {
      res.status(response.status).json({message: 'Successfully joined team'});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Cannot join team'});
  }
});

/*
@brief
get detail of team
@params
email
@output
on success:
status code - integer - 200
object with teamName, passcode, teamEmail, and list of member's email
on failure:
status code and error message
*/
app.delete('/leaveteam', async(req, res) => {
  try {
    const email = req.body.email;
    const response = await leaveTeam(email);
    if (response.status !== 200) {
      res.status(response.status).json({error: response.error});
    } else {
      res.status(response.status).json({message: 'Successfully left team'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Cannot leave team'});
  }
});

/*
@brief
get detail of team
@params
email
@output
on success:
status code - integer - 200
object with teamName, passcode, teamEmail, and list of member's email
on failure:
status code and error message
*/
app.get('/teamdetail', async(req, res) => {
  try {
    const uid = req.query.uid;
    const response = await detailTeam(uid);
    if (response.status !== 200) {
      res.status(response.status).json({error: response.error});
    } else {
      res.status(response.status).json({details: response.details});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Cannot get detail'});
  }
});

// app.post('/resetPassword', async(req, res) => {
//   try {
//     const email = req.body;
//     res.status(200).json(await sendingResetPassword(email));
//   } catch (err) {
//     res.status(400).json({message: 'Password reset email failed to send.'})
//   }
// });

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;

