const User = require('../models/User');
const Gig = require('../models/Gig');
const Bid = require('../models/Bid');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user statistics
    const gigsPosted = await Gig.countDocuments({ clientId: user._id });
    const bidsPlaced = await Bid.countDocuments({ freelancerId: user._id });
    const hiredBids = await Bid.countDocuments({ freelancerId: user._id, status: 'hired' });

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
        isVerified: user.isVerified,
        totalEarned: user.totalEarned,
        totalSpent: user.totalSpent,
        createdAt: user.createdAt,
        stats: {
          gigsPosted,
          bidsPlaced,
          hiredBids,
          successRate: bidsPlaced > 0 ? Math.round((hiredBids / bidsPlaced) * 100) : 0
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user profile',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      location,
      website,
      skills,
      hourlyRate,
      timezone,
      profilePicture
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (skills) user.skills = skills;
    if (hourlyRate !== undefined) user.hourlyRate = hourlyRate;
    if (timezone) user.timezone = timezone;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
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
        totalSpent: user.totalSpent
      }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
      error: error.message
    });
  }
};

// @desc    Get user settings
// @route   GET /api/users/:id/settings
// @access  Private
exports.getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('settings');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      settings: user.settings
    });
  } catch (error) {
    console.error('Get user settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching settings',
      error: error.message
    });
  }
};

// @desc    Update user settings
// @route   PUT /api/users/:id/settings
// @access  Private
exports.updateUserSettings = async (req, res) => {
  try {
    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({
        success: false,
        message: 'Please provide section and data'
      });
    }

    const validSections = ['notifications', 'privacy', 'appearance'];
    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings section. Must be notifications, privacy, or appearance'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update specific settings section
    user.settings[section] = {
      ...user.settings[section],
      ...data
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings: user.settings
    });
  } catch (error) {
    console.error('Update user settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating settings',
      error: error.message
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's gigs
    await Gig.deleteMany({ clientId: req.params.id });

    // Delete user's bids
    await Bid.deleteMany({ freelancerId: req.params.id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User account and associated data deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user',
      error: error.message
    });
  }
};
