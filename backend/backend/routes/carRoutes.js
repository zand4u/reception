const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Route för att lägga till en ny bil
router.post('/', carController.addCar);

module.exports = router;
