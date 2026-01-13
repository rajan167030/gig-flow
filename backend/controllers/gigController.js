const Gig = require('../models/Gig');
const Bid = require('../models/Bid');
const User = require('../models/User');

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
exports.getAllGigs = async (req, res) => {
  try {
    const { search, status, category, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build query
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (status) {
      query.status = status;
    }

    if (category && category !== 'other') {
      query.category = category;
    }

    // Execute query with sorting
    const sortOrder = order === 'asc' ? 1 : -1;
    const gigs = await Gig.find(query)
      .sort({ [sortBy]: sortOrder })
      .populate('clientId', 'name email profilePicture isVerified')
      .populate('assignedTo', 'name email profilePicture');

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs: gigs.map(gig => ({
        id: gig._id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        clientId: gig.clientId._id,
        clientName: gig.clientName,
        status: gig.status,
        bidsCount: gig.bidsCount,
        category: gig.category,
        skillsRequired: gig.skillsRequired,
        deadline: gig.deadline,
        createdAt: gig.createdAt,
        updatedAt: gig.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gigs',
      error: error.message
    });
  }
};

// @desc    Get single gig
// @route   GET /api/gigs/:id
// @access  Public
exports.getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('clientId', 'name email profilePicture isVerified')
      .populate('assignedTo', 'name email profilePicture');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    res.status(200).json({
      success: true,
      gig: {
        id: gig._id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        clientId: gig.clientId._id,
        clientName: gig.clientName,
        status: gig.status,
        bidsCount: gig.bidsCount,
        category: gig.category,
        skillsRequired: gig.skillsRequired,
        deadline: gig.deadline,
        attachments: gig.attachments,
        assignedTo: gig.assignedTo,
        assignedBidId: gig.assignedBidId,
        createdAt: gig.createdAt,
        updatedAt: gig.updatedAt
      }
    });
  } catch (error) {
    console.error('Get gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gig',
      error: error.message
    });
  }
};

// @desc    Create new gig
// @route   POST /api/gigs
// @access  Private
exports.createGig = async (req, res) => {
  try {
    const { title, description, budget, clientId, category, skillsRequired, deadline } = req.body;

    // Validate required fields
    if (!title || !description || !budget || !clientId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, budget, and clientId'
      });
    }

    // Get client details
    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Create gig
    const gig = await Gig.create({
      title,
      description,
      budget,
      clientId,
      clientName: client.name,
      category: category || 'other',
      skillsRequired: skillsRequired || [],
      deadline
    });

    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      gig: {
        id: gig._id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        clientId: gig.clientId,
        clientName: gig.clientName,
        status: gig.status,
        bidsCount: gig.bidsCount,
        category: gig.category,
        skillsRequired: gig.skillsRequired,
        deadline: gig.deadline,
        createdAt: gig.createdAt
      }
    });
  } catch (error) {
    console.error('Create gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating gig',
      error: error.message
    });
  }
};

// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Private
exports.updateGig = async (req, res) => {
  try {
    const { title, description, budget, status, category, skillsRequired, deadline } = req.body;

    let gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Update fields
    if (title) gig.title = title;
    if (description) gig.description = description;
    if (budget) gig.budget = budget;
    if (status) gig.status = status;
    if (category) gig.category = category;
    if (skillsRequired) gig.skillsRequired = skillsRequired;
    if (deadline) gig.deadline = deadline;

    await gig.save();

    res.status(200).json({
      success: true,
      message: 'Gig updated successfully',
      gig: {
        id: gig._id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        clientId: gig.clientId,
        clientName: gig.clientName,
        status: gig.status,
        bidsCount: gig.bidsCount,
        category: gig.category,
        skillsRequired: gig.skillsRequired,
        deadline: gig.deadline,
        createdAt: gig.createdAt,
        updatedAt: gig.updatedAt
      }
    });
  } catch (error) {
    console.error('Update gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating gig',
      error: error.message
    });
  }
};

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Delete all bids associated with this gig
    await Bid.deleteMany({ gigId: req.params.id });

    // Delete the gig
    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Gig and associated bids deleted successfully'
    });
  } catch (error) {
    console.error('Delete gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting gig',
      error: error.message
    });
  }
};

// @desc    Get gigs by user (client)
// @route   GET /api/gigs/user/:userId
// @access  Private
exports.getUserGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ clientId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email profilePicture');

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs: gigs.map(gig => ({
        id: gig._id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        clientId: gig.clientId,
        clientName: gig.clientName,
        status: gig.status,
        bidsCount: gig.bidsCount,
        category: gig.category,
        createdAt: gig.createdAt,
        updatedAt: gig.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get user gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user gigs',
      error: error.message
    });
  }
};
