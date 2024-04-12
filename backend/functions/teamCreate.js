const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

async function createTeam(name, email, teamEmail) {
  const existingEmail = await pool.query('SELECT * FROM members WHERE email = $1', [email]);

  if (existingEmail.rows.length !== 0) {
    return {status: 400, error: "email is already in a team"};
  }

  const existingTeam = await pool.query('SELECT * FROM teams WHERE teamEmail = $1', [teamEmail]);
  if (existingTeam.rows.length !== 0) {
    return {status: 400, error: "team email is already in use"};
  }

  const passcode = uuidv4();
  let teamId = await pool.query('INSERT INTO teams(teamName, passcode, teamEmail) VALUES ($1, $2, $3) RETURNING teamId', [name, passcode, teamEmail] );
  teamId = teamId.rows[0].teamid;

  await pool.query('INSERT INTO members(email, teamId) VALUES ($1, $2)', [email, teamId]);

  return {
    status: 200,
    passcode: passcode
  }
}

module.exports = createTeam;