const express = require('express');
const router = express.Router();

// Exempel för PostgreSQL-anslutning
// const { Pool } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// });

router.post('/', async (req, res) => {
    const { registrationNumber, zone, package } = req.body;

    // Exempel på insättning i PostgreSQL
    try {
        // const result = await pool.query(
        //     'INSERT INTO cars (registration_number, zone, package) VALUES ($1, $2, $3) RETURNING *',
        //     [registrationNumber, zone, package]
        // );
        res.status(201).json({ message: 'Registrering sparad', car: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Ett fel inträffade', error: err.message });
    }
});

module.exports = router;
``
