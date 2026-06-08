const Watchlist = require('../models/Watchlist');

// ADD movie to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    // Check if movie already in watchlist
    const existing = await Watchlist.findOne({ userId, movieId });
    if (existing) {
      return res.status(400).json({ message: 'Movie already in watchlist!' });
    }

    // Save to database
    const watchlistItem = new Watchlist({ userId, movieId });
    await watchlistItem.save();

    res.status(201).json({ message: 'Added to watchlist!' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// REMOVE movie from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    await Watchlist.findOneAndDelete({ userId, movieId });

    res.status(200).json({ message: 'Removed from watchlist!' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// GET all movies in watchlist
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const watchlist = await Watchlist.find({ userId });

    res.status(200).json({ watchlist });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

module.exports = { addToWatchlist, removeFromWatchlist, getWatchlist };