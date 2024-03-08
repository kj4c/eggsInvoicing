const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "seng2021Eggs",
  host: "seng2021-db-instance-01.cfu4w8ycow63.ap-southeast-2.rds.amazonaws.com",
  port: 5432,
  databse: "seng2021_db",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;