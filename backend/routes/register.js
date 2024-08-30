const express = require('express');
const router = express.Router();

// Lägg till dina rutter här
router.post('/', (req, res) => {
    res.send('Register route');
});

module.exports = router;
