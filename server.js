const express = require('express');
const path = require('path');
const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Servera statiska filer från "public"-mappen
app.use(express.static(path.join(__dirname, 'public')));

// API-rutt för att hantera data
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Om ingen annan rutt matchar, ladda index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starta servern på en angiven port (Heroku ger oss en port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
