const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Route för att lägga till en ny bil
router.post('/', carController.addCar);

// Route för att hämta alla bilar
router.get('/all', carController.getAllCars);

module.exports = router;
