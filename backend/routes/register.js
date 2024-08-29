const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Importerar databasanslutningen

// Route för att registrera bilens nummerplåt
router.post('/', async (req, res) => {
  const regNumber = req.body.regNumber;

  try {
    const result = await pool.query(
      'INSERT INTO registrations (reg_number) VALUES ($1) RETURNING *',
      [regNumber]
    );
    res.status(200).json({ message: 'Registreringsnummer sparat!', data: result.rows });
  } catch (err) {
    console.error('Databasfel:', err.detail || err.message || err);
    res.status(500).json({ error: 'Kunde inte spara registreringsnummer' });
  }
});

module.exports = router;
