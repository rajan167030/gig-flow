const express = require('express');
const router = express.Router();
const {
  getAllGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
  getUserGigs
} = require('../controllers/gigController');

// @route   GET /api/gigs
router.get('/', getAllGigs);

// @route   POST /api/gigs
router.post('/', createGig);

// @route   GET /api/gigs/user/:userId
router.get('/user/:userId', getUserGigs);

// @route   GET /api/gigs/:id
router.get('/:id', getGig);

// @route   PUT /api/gigs/:id
router.put('/:id', updateGig);

// @route   DELETE /api/gigs/:id
router.delete('/:id', deleteGig);

module.exports = router;
