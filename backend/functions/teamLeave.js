const pool = require('../database/db');
async function leaveTeam(email) {
  const existingTeam = await pool.query('SELECT * FROM members WHERE email = $1', [email]);

  if (existingTeam.rows.length === 0) {
    return {status: 400, error: 'Email is not in a team'};
  }
  const teamId = existingTeam.rows[0].teamid;
  await pool.query('DELETE FROM members WHERE email = $1', [email]);

  // if there is no one in the team, delete the team
  const del = await pool.query('SELECT * FROM members WHERE teamId = $1', [teamId]);
  if (del.rows.length === 0) {
    await pool.query('DELETE FROM teams WHERE teamId = $1', [teamId]);
  }
  return {
    status: 200
  };
}

module.exports = leaveTeam;