const express = require('express');
const app = express();
const cors = require('cors');  // Nytt för att hantera CORS
const bodyParser = require('body-parser');
// const { Pool } = require('pg');  // Inkludera detta om du vill använda PostgreSQL direkt

require('dotenv').config();

app.use(cors());  // Aktivera CORS
app.use(bodyParser.json());

// Om du ansluter till PostgreSQL, använd pg-promise eller pg direkt
// Exempel med pg-promise:
// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL);

// Om du använder en egen ruttfil för API
app.use('/api/cars', require('./routes/carRoutes'));

// Starta servern på rätt port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
