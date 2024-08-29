// carRoutes.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

// Lägg till en bil
router.post('/', async (req, res) => {
    const { registrationNumber, zone, package } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO cars (registration_number, zone, package) VALUES ($1, $2, $3) RETURNING *',
            [registrationNumber, zone, package]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting car:', err);
        res.status(500).json({ message: 'Failed to register car' });
    }
});

// Få alla bilar
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ message: 'Failed to retrieve cars' });
    }
});

module.exports = router;
