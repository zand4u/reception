const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Detta är nödvändigt om du använder SSL-anslutningar med en extern server
    },
});

module.exports = pool;
