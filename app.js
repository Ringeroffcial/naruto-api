const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // ✅ Serve HTML and static files from 'public'

// Read Naruto data
const data = JSON.parse(fs.readFileSync('narutoshippuden.json', 'utf8'));

// Serve the HTML file on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
