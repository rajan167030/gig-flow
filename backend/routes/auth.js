const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  logout
} = require('../controllers/authController');

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me
router.get('/me', getMe);

// @route   POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;
