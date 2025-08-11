// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*', // allow your frontend URL in prod
}));

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});
