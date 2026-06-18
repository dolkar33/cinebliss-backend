const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🎬 CineBliss API is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB!');
  })
  .catch((error) => {
    console.log('❌ MongoDB connection error:', error);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎬 Server running on http://localhost:${PORT}`);
});