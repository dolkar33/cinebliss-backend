const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth-middleware');
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require('../controllers/watchlist-controller');

router.post('/', protect, addToWatchlist);
router.delete('/:movieId', protect, removeFromWatchlist);
router.get('/', protect, getWatchlist);

module.exports = router;
