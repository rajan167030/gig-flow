const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  role: {
    type: String,
    enum: ['client', 'freelancer', 'both'],
    default: null
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    default: ''
  },
  location: {
    type: String,
    maxlength: [200, 'Location cannot exceed 200 characters'],
    default: ''
  },
  website: {
    type: String,
    maxlength: [200, 'Website URL cannot exceed 200 characters'],
    default: ''
  },
  skills: [{
    type: String,
    trim: true
  }],
  hourlyRate: {
    type: Number,
    min: [0, 'Hourly rate cannot be negative'],
    default: 0
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  settings: {
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      bidNotifications: { type: Boolean, default: true },
      messageNotifications: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
      weeklyDigest: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true }
    },
    privacy: {
      profileVisibility: { 
        type: String, 
        enum: ['public', 'private', 'connections'], 
        default: 'public' 
      },
      showOnlineStatus: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true },
      showActivity: { type: Boolean, default: true }
    },
    appearance: {
      theme: { 
        type: String, 
        enum: ['dark', 'light', 'auto'], 
        default: 'dark' 
      },
      accentColor: { 
        type: String, 
        enum: ['purple', 'blue', 'green', 'red'], 
        default: 'purple' 
      },
      fontSize: { 
        type: String, 
        enum: ['small', 'medium', 'large'], 
        default: 'medium' 
      }
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster email lookups
userSchema.index({ email: 1 });

// Virtual for user's gigs
userSchema.virtual('gigs', {
  ref: 'Gig',
  localField: '_id',
  foreignField: 'clientId'
});

// Virtual for user's bids
userSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'freelancerId'
});

// Enable virtual fields when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
