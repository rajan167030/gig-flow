const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  updateUserSettings,
  deleteUser
} = require('../controllers/userController');

// @route   GET /api/users/:id
router.get('/:id', getUserProfile);

// @route   PUT /api/users/:id
router.put('/:id', updateUserProfile);

// @route   GET /api/users/:id/settings
router.get('/:id/settings', getUserSettings);

// @route   PUT /api/users/:id/settings
router.put('/:id/settings', updateUserSettings);

// @route   DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
