const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Tillåter cross-origin requests
app.use(bodyParser.json()); // Tillåter JSON i request bodies

// PostgreSQL setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Kontrollera att ruttfilerna finns
const carRoutesPath = path.join(__dirname, 'routes', 'carRoutes.js');
const registerRoutesPath = path.join(__dirname, 'routes', 'register.js');

try {
    require.resolve(carRoutesPath);
    require.resolve(registerRoutesPath);
} catch (e) {
    console.error("En eller flera ruttfiler kunde inte hittas:", e.message);
    process.exit(1);  // Avsluta processen om en modul saknas
}

// Rutter för API
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/register', require('./routes/register'));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Fallback för att hantera andra rutter och servera frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Route to handle car registration directly in server.js
app.post('/api/cars', async (req, res) => {
    const { registrationNumber, zone, package } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO cars (registration_number, zone, package) VALUES ($1, $2, $3) RETURNING *',
            [registrationNumber, zone, package]
        );

        res.status(201).json({ message: 'Registrering sparad', car: result.rows[0] });
    } catch (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ message: 'Server error, could not save registration' });
    }
});

// Starta servern
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
