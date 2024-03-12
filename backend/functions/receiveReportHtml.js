const pool = require("../database/db");

async function receiveHtml(uid) {
  // error checking
  if (uid === undefined) {
    console.log({error: 'Invalid uid'});
    return {status: 400};
  }

  // get current user's email
  const userQuery = 'SELECT email FROM users WHERE uid = $1';
  let user = await pool.query(userQuery, [uid]);
  if (user.rows.length === 0) {
    console.log({error: 'Invalid uid'});
    return {status: 400};
  }
  user = user.rows[0].email;
  console.log(user)
  const selectQuery = 'SELECT s.invoice_id, s.sender_email, s.sent_at FROM sent_invoices s JOIN users u ON u.email = s.receiver_email WHERE u.uid = $1';
  const qres = await pool.query(selectQuery, [uid]);
  const tab = qres.rows.map(row => `
    <tr>
      <td>${row.invoice_id}</td>
      <td>${row.sender_email}</td>
      <td>${row.sent_at.toLocaleString('en-au')}</td>
    </tr>
  `)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Communication Report for Received Invoices</title>
    </head>
    <body>
      <h1>Communication Report for Received Invoices</h1>
      <p1>Received by ${user}</p1>
      <table style="width:100%">
        <tr style="text-align:left">
          <th>Invoice Id</th>
          <th>Sent by</th>
          <th>Time</th>
        </tr>
        ${tab}
      </table>
    </body>
    </html>
  `
}

module.exports = receiveHtml