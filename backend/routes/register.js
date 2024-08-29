// register.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

// Registrera användare
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// Hämta alla användare
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching users
