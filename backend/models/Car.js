const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
