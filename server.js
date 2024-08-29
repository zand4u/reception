const express = require('express');
const app = express();
const cors = require('cors');  // Nytt för att hantera CORS
const bodyParser = require('body-parser');
require('dotenv').config();  // För att ladda miljövariabler från .env-filen

// Middleware för att hantera CORS och JSON
app.use(cors());
app.use(bodyParser.json());

// Anslutning till PostgreSQL (om du använder pg-promise eller direkt pg-modul)
// Exempel med pg-promise:
// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL);

// Rutter för API
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/register', require('./routes/register'));

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
