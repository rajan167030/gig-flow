const express = require('express');
const router = express.Router();
const {
  getGigBids,
  getUserBids,
  createBid,
  updateBidStatus,
  deleteBid
} = require('../controllers/bidController');

// @route   GET /api/bids/gig/:gigId
router.get('/gig/:gigId', getGigBids);

// @route   GET /api/bids/user/:userId
router.get('/user/:userId', getUserBids);

// @route   POST /api/bids
router.post('/', createBid);

// @route   PUT /api/bids/:id
router.put('/:id', updateBidStatus);

// @route   DELETE /api/bids/:id
router.delete('/:id', deleteBid);

module.exports = router;
