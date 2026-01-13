const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Freelancer ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
    default: ''
  },
  category: {
    type: String,
    enum: ['web-development', 'mobile-development', 'design', 'data-science', 'writing', 'marketing', 'other'],
    default: 'other'
  },
  images: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }],
  link: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please provide a valid URL'],
    default: ''
  },
  tools: [{
    type: String,
    trim: true
  }],
  completionDate: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for faster queries
portfolioSchema.index({ freelancerId: 1 });
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ createdAt: -1 });
portfolioSchema.index({ featured: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
