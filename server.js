const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the "public" directory
app.use(express.static(path.join(__dirname)));

// Send index.html for any route not matching a file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen on the appropriate port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
