const pool = require("../database/db");


async function getNotifications(uId) {
  let query = "select notifications from users where uid = $1";
  
  const result = await pool.query(query,[uId]);
  const notifications = result.rows[0].notifications;
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
  
  query = "update users set notifications = '{}' where uid = $1";
  await pool.query(query, [uId]);
  return resObj;
}

module.exports = getNotifications;