const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Read Naruto data
const data = JSON.parse(fs.readFileSync('narutoshippuden.json', 'utf8'));

// API Routes
app.get('/api/naruto', (req, res) => {
  res.json(data);
});

app.get('/api/naruto/:id', (req, res) => {
  const character = data.find(c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).json({ message: "Character not found" });
  res.json(character);
});

app.get('/api/naruto/village/:name', (req, res) => {
  const result = data.filter(c => c.village.toLowerCase() === req.params.name.toLowerCase());
  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Naruto API running at http://localhost:${PORT}`);
});

