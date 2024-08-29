require('dotenv').config();
const { Pool } = require('pg');

const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.DATABASE_URL);

module.exports = db;


// Testa databasanslutningen
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Kunde inte ansluta till databasen', err);
  } else {
    console.log('Databasanslutning lyckades:', res.rows);
  }
});

module.exports = pool;
