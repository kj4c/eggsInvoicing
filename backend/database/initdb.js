const pool = require('./db')

async function initdb() {
  let q = `CREATE TABLE IF NOT EXISTS users (
    uid       serial primary key,
    email     varchar(225),
    phone_no  varchar(10),
    username  varchar(225) not null,
    password   varchar(225) not null
  )`;
  await pool.query(q);

  q = `CREATE TABLE IF NOT EXISTS send_invoice (
    invoice_id    serial primary key,
    sender        varchar(225),
    receiver      varchar(225),
    invoice_xml   xml,
    sent_at       timestamptz not null default now()
  )`; 
  await pool.query(q);
}

module.exports = initdb;