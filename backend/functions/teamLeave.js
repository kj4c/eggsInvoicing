const pool = require('../database/db');
async function leaveTeam(email) {
  const existingTeam = await pool.query('SELECT * FROM members WHERE email = $1', [email]);

  if (existingTeam.rows.length === 0) {
    return {status: 400, error: 'Email is not in a team'};
  }

  await pool.query('DELETE FROM members WHERE email = $1', [email]);

  return {
    status: 200
  };
}

module.exports = leaveTeam;