const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [1, 'Budget must be greater than 0']
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client ID is required']
  },
  clientName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in-progress', 'completed', 'closed', 'cancelled'],
    default: 'open'
  },
  bidsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    enum: ['web-development', 'mobile-development', 'design', 'data-science', 'writing', 'marketing', 'other'],
    default: 'other'
  },
  skillsRequired: [{
    type: String,
    trim: true
  }],
  deadline: {
    type: Date
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedBidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
    default: null
  }
}, {
  timestamps: true
});

// Indexes for faster queries
gigSchema.index({ clientId: 1 });
gigSchema.index({ status: 1 });
gigSchema.index({ createdAt: -1 });
gigSchema.index({ title: 'text', description: 'text' });

// Virtual for gig's bids
gigSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'gigId'
});

// Enable virtual fields when converting to JSON
gigSchema.set('toJSON', { virtuals: true });
gigSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Gig', gigSchema);
