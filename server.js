const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // För att ladda miljövariabler från .env-filen

// Middleware för att hantera CORS och JSON
app.use(cors());
app.use(bodyParser.json());

// Kontrollera att ruttfilerna finns
const path = require('path');
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

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
