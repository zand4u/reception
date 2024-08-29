const db = require('../config/db');

exports.addCar = async (req, res) => {
    const { registrationNumber, zone, package } = req.body;

    try {
        const result = await db.one(
            'INSERT INTO cars (registration_number, zone, package) VALUES ($1, $2, $3) RETURNING *',
            [registrationNumber, zone, package]
        );
        res.status(201).json(result);
    } catch (err) {
        if (err.code === '23505') {  // Unique violation code
            res.status(400).json({ message: 'Registreringsnumret finns redan.' });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
};
