const pool = require("../database/db");
const HTTPError = require('http-errors');

async function getNotifications(uId) {
  let query = "select notifications from users where uid = $1";
  const notifications = (await pool.query(query,[uId])).rows[0].notifications;
  console.log(notifications);
  if (notifications === null || notifications.length === 0) {
    return {message: "No new notifications"};
  }

  const resObj = {
    notifications: []
  };

  for (const notificationId of notifications) {
    const query = "select * from sent_invoices where invoice_id = $1";
    const res = (await pool.query(query, [notificationId])).rows;
    res.forEach(sentInvoicesRecord => resObj.notifications.push(sentInvoicesRecord));
  }
  
  await pool.query("update users set notifications = '{}' where uid = $1", [uId]);
  return resObj;
}

async function hasReceivedInvoiceId(invoiceId, recieverEmail) {
  let q = "select * from sent_invoices where invoice_id = $1 and receiver_email = $2";
  const res = (await pool.query(q, [invoiceId, recieverEmail])).rows;
  if (res.length === 0 ) {
    return {message: "User has not received invoiceId = " + invoiceId};
  } else {
    return {message: "User has received invoiceId = " + invoiceId};
  }
}
module.exports = { getNotifications, hasReceivedInvoiceId };