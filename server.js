const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kontrollera att ruttfilerna finns
const carRoutesPath = path.join(__dirname, 'backend', 'routes', 'carRoutes.js');
const registerRoutesPath = path.join(__dirname, 'backend', 'routes', 'register.js');

try {
    require.resolve(carRoutesPath);
    require.resolve(registerRoutesPath);
} catch (e) {
    console.error("En eller flera ruttfiler kunde inte hittas:", e.message);
    process.exit(1);  // Avsluta processen om en modul saknas
}

// Rutter för API
app.use('/api/cars', require(carRoutesPath));
app.use('/api/register', require(registerRoutesPath));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Fallback för att hantera andra rutter och servera frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
