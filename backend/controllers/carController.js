const pool = require('../config/db');

// Lägg till en bil
exports.addCar = async (req, res) => {
    const { registrationNumber, zone, package } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO cars (registration_number, zone, package) VALUES ($1, $2, $3) RETURNING *',
            [registrationNumber, zone, package]
        );
        res.status(201).json({ message: 'Registrering sparad', car: result.rows[0] });
    } catch (err) {
        console.error('Error inserting data into database:', err);
        if (err.code === '23505') { // Dubblettfelkod
            res.status(400).json({ message: 'Registreringsnumret finns redan i databasen.' });
        } else {
            res.status(500).json({ message: 'Serverfel, kunde inte spara registreringen.' });
        }
    }
};

// Hämta alla bilar
exports.getAllCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching data from database:', err);
        res.status(500).json({ message: 'Serverfel, kunde inte hämta bilar.' });
    }
};
