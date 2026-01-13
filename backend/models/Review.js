const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: [true, 'Gig ID is required']
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer ID is required']
  },
  reviewerName: {
    type: String,
    required: true
  },
  revieweeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewee ID is required']
  },
  revieweeName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters long'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  categories: {
    communication: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    quality: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    deadline: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
reviewSchema.index({ gigId: 1 });
reviewSchema.index({ reviewerId: 1 });
reviewSchema.index({ revieweeId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
