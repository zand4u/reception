const express = require('express');
const router = express.Router();
const { addCar } = require('../controllers/carController');

router.post('/', addCar);

module.exports = router;
