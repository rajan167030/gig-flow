const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: [true, 'Gig ID is required']
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Freelancer ID is required']
  },
  freelancerName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Bid amount is required'],
    min: [1, 'Bid amount must be greater than 0']
  },
  message: {
    type: String,
    required: [true, 'Proposal message is required'],
    trim: true,
    minlength: [10, 'Proposal message must be at least 10 characters long'],
    maxlength: [2000, 'Proposal message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'hired', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  deliveryTime: {
    type: Number, // in days
    min: [1, 'Delivery time must be at least 1 day']
  },
  coverLetter: {
    type: String,
    maxlength: [3000, 'Cover letter cannot exceed 3000 characters']
  },
  portfolio: [{
    title: String,
    url: String,
    description: String
  }],
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
bidSchema.index({ gigId: 1 });
bidSchema.index({ freelancerId: 1 });
bidSchema.index({ status: 1 });
bidSchema.index({ createdAt: -1 });

// Compound index to prevent duplicate bids from the same freelancer on the same gig
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model('Bid', bidSchema);
