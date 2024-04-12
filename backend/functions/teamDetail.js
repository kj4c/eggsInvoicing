const pool = require('../database/db');
async function detailTeam(email) {
  const team = await pool.query('SELECT teamId FROM members WHERE email = $1', [email]);

  if (team.rows.length === 0) {
    return {status: 400, error: 'Email is not in a team'};
  }

  const teamId = team.rows[0].teamid;

  // list of emails
  const emailsQuery = await pool.query('SELECT email FROM members WHERE teamId = $1', [teamId]);
  const emails = emailsQuery.rows.map(row => row.email);

  // team detail
  const details = await pool.query('SELECT * FROM teams WHERE teamId = $1', [teamId]);
  const teamName = details.rows[0].teamname;
  const passcode = details.rows[0].passcode;
  const teamEmail = details.rows[0].teamemail;

  return {
    status: 200,
    details: {
      teamName: teamName,
      passcode: passcode,
      teamEmail: teamEmail,
      members: emails
    }
  };
}

module.exports = detailTeam;