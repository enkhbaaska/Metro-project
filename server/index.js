// server/index.js
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Serve React build
const clientBuild = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuild));

// SPA fallback (but don’t swallow /api)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(clientBuild, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${PORT}`));
