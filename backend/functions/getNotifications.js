const pool = require('../database/db');

async function getNotifications(uId) {
  const query = 'select notifications from users where uid = $1';
  const res = await pool.query(query, [uId]);
  if (res.rows.length === 0) {
    return {message: 'No new notifications'};
  }

  const notifications = res.rows[0].notifications;
  const resObj = {
    notifications: []
  };

  for (const notificationId of notifications) {
    const query = 'select * from sent_invoices where invoice_id = $1';
    const res = (await pool.query(query, [notificationId])).rows;
    res.forEach(sentInvoicesRecord => resObj.notifications.push(sentInvoicesRecord));
  }

  await pool.query('update users set notifications = \'{}\' where uid = $1', [uId]);
  return resObj;
}

module.exports = getNotifications;