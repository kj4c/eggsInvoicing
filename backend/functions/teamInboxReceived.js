const pool = require('../database/db');

async function teamInboxReceived(uid) {
  const emailQ = await pool.query('SELECT email FROM users WHERE uid = $1', [uid]);
  const email = emailQ.rows[0].email;
  const team = await pool.query('SELECT teamId FROM members WHERE email = $1', [email]);

  if (team.rows.length === 0) {
    return {status: 400, error: 'Email is not in a team'};
  }

  const teamId = team.rows[0].teamid;
  const teamQ = await pool.query('SELECT teamEmail from teams WHERE teamId = $1', [teamId]);
  const teamEmail = teamQ.rows[0].teamemail;
  const emailRet = await pool.query('SELECT * FROM sent_invoices WHERE receiver_email = $1', [teamEmail]);
  return {status: 200, ret: emailRet.rows};
}

module.exports = teamInboxReceived;