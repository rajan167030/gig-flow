const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const User = require('../models/User');

// @desc    Get all bids for a gig
// @route   GET /api/bids/gig/:gigId
// @access  Public
exports.getGigBids = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId })
      .sort({ createdAt: -1 })
      .populate('freelancerId', 'name email profilePicture skills hourlyRate isVerified');

    res.status(200).json({
      success: true,
      count: bids.length,
      bids: bids.map(bid => ({
        id: bid._id,
        gigId: bid.gigId,
        freelancerId: bid.freelancerId._id,
        freelancerName: bid.freelancerName,
        amount: bid.amount,
        message: bid.message,
        status: bid.status,
        deliveryTime: bid.deliveryTime,
        coverLetter: bid.coverLetter,
        portfolio: bid.portfolio,
        createdAt: bid.createdAt
      }))
    });
  } catch (error) {
    console.error('Get gig bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bids',
      error: error.message
    });
  }
};

// @desc    Get all bids by a freelancer
// @route   GET /api/bids/user/:userId
// @access  Private
exports.getUserBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('gigId', 'title description budget clientName status');

    res.status(200).json({
      success: true,
      count: bids.length,
      bids: bids.map(bid => ({
        id: bid._id,
        gigId: bid.gigId._id,
        gigTitle: bid.gigId.title,
        gigBudget: bid.gigId.budget,
        clientName: bid.gigId.clientName,
        freelancerId: bid.freelancerId,
        freelancerName: bid.freelancerName,
        amount: bid.amount,
        message: bid.message,
        status: bid.status,
        deliveryTime: bid.deliveryTime,
        createdAt: bid.createdAt
      }))
    });
  } catch (error) {
    console.error('Get user bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user bids',
      error: error.message
    });
  }
};

// @desc    Create new bid
// @route   POST /api/bids
// @access  Private
exports.createBid = async (req, res) => {
  try {
    const { gigId, freelancerId, amount, message, deliveryTime, coverLetter, portfolio } = req.body;

    // Validate required fields
    if (!gigId || !freelancerId || !amount || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide gigId, freelancerId, amount, and message'
      });
    }

    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer accepting bids'
      });
    }

    // Check if freelancer is the same as client
    if (gig.clientId.toString() === freelancerId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own gig'
      });
    }

    // Get freelancer details
    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found'
      });
    }

    // Check if user already bid on this gig
    const existingBid = await Bid.findOne({ gigId, freelancerId });
    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this gig'
      });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId,
      freelancerName: freelancer.name,
      amount,
      message,
      deliveryTime,
      coverLetter,
      portfolio: portfolio || []
    });

    // Update gig's bid count
    gig.bidsCount += 1;
    await gig.save();

    res.status(201).json({
      success: true,
      message: 'Bid submitted successfully',
      bid: {
        id: bid._id,
        gigId: bid.gigId,
        freelancerId: bid.freelancerId,
        freelancerName: bid.freelancerName,
        amount: bid.amount,
        message: bid.message,
        status: bid.status,
        deliveryTime: bid.deliveryTime,
        createdAt: bid.createdAt
      }
    });
  } catch (error) {
    console.error('Create bid error:', error);
    
    // Handle duplicate bid error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this gig'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating bid',
      error: error.message
    });
  }
};

// @desc    Update bid status (hire/reject)
// @route   PUT /api/bids/:id
// @access  Private
exports.updateBidStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['hired', 'rejected', 'withdrawn'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be hired, rejected, or withdrawn'
      });
    }

    const bid = await Bid.findById(req.params.id).populate('gigId');

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    // If hiring, update gig status and reject other bids
    if (status === 'hired') {
      const gig = await Gig.findById(bid.gigId);
      
      if (!gig) {
        return res.status(404).json({
          success: false,
          message: 'Associated gig not found'
        });
      }

      // Update gig
      gig.status = 'assigned';
      gig.assignedTo = bid.freelancerId;
      gig.assignedBidId = bid._id;
      await gig.save();

      // Reject all other pending bids for this gig
      await Bid.updateMany(
        { 
          gigId: bid.gigId, 
          _id: { $ne: bid._id }, 
          status: 'pending' 
        },
        { status: 'rejected' }
      );
    }

    // Update bid status
    bid.status = status;
    await bid.save();

    res.status(200).json({
      success: true,
      message: `Bid ${status} successfully`,
      bid: {
        id: bid._id,
        gigId: bid.gigId,
        freelancerId: bid.freelancerId,
        freelancerName: bid.freelancerName,
        amount: bid.amount,
        message: bid.message,
        status: bid.status,
        createdAt: bid.createdAt,
        updatedAt: bid.updatedAt
      }
    });
  } catch (error) {
    console.error('Update bid status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating bid',
      error: error.message
    });
  }
};

// @desc    Delete bid (withdraw)
// @route   DELETE /api/bids/:id
// @access  Private
exports.deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    if (bid.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bids can be withdrawn'
      });
    }

    // Update gig's bid count
    const gig = await Gig.findById(bid.gigId);
    if (gig) {
      gig.bidsCount = Math.max(0, gig.bidsCount - 1);
      await gig.save();
    }

    await Bid.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Bid withdrawn successfully'
    });
  } catch (error) {
    console.error('Delete bid error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting bid',
      error: error.message
    });
  }
};
