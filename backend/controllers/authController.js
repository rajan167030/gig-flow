const User = require('../models/User');

// @desc    Login or register user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and name'
      });
    }

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists, return user data
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          location: user.location,
          website: user.website,
          skills: user.skills,
          hourlyRate: user.hourlyRate,
          timezone: user.timezone,
          profilePicture: user.profilePicture,
          settings: user.settings,
          isVerified: user.isVerified,
          totalEarned: user.totalEarned,
          totalSpent: user.totalSpent,
          createdAt: user.createdAt
        }
      });
    }

    // Create new user
    user = await User.create({
      name,
      email: email.toLowerCase()
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        location: user.location,
        website: user.website,
        skills: user.skills,
        hourlyRate: user.hourlyRate,
        timezone: user.timezone,
        profilePicture: user.profilePicture,
        settings: user.settings,
        isVerified: user.isVerified,
        totalEarned: user.totalEarned,
        totalSpent: user.totalSpent,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private (would require authentication middleware in production)
exports.getMe = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        location: user.location,
        website: user.website,
        skills: user.skills,
        hourlyRate: user.hourlyRate,
        timezone: user.timezone,
        profilePicture: user.profilePicture,
        settings: user.settings,
        isVerified: user.isVerified,
        totalEarned: user.totalEarned,
        totalSpent: user.totalSpent,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
};
