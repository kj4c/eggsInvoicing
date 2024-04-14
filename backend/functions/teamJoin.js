const pool = require('../database/db');
async function joinTeam(email, passcode) {
  const existingTeam = await pool.query('SELECT * FROM members WHERE email = $1', [email]);

  if (existingTeam.rows.length !== 0) {
    return {status: 400, error: 'Email is already in a team'};
  }

  const passcodeTeam = await pool.query('SELECT teamId FROM teams WHERE passcode = $1', [passcode]);
  if (passcodeTeam.rows.length === 0) {
    return {status: 400, error: 'Invalid passcode'};
  }

  const teamId = passcodeTeam.rows[0].teamid;
  await pool.query('INSERT INTO members(email, teamId) VALUES ($1, $2)', [email, teamId]);
  return {
    status: 200
  };
}

module.exports = joinTeam;
