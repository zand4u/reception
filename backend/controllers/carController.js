const pool = require('../config/db');

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
        res.status(500).json({ message: 'Server error, could not save registration' });
    }
};
