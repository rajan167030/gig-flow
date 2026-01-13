const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import all models
const User = require('../models/User');
const Gig = require('../models/Gig');
const Bid = require('../models/Bid');
const Message = require('../models/Message');
const Review = require('../models/Review');
const Payment = require('../models/Payment');
const Portfolio = require('../models/Portfolio');

const initializeDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully');

    // Drop existing indexes and recreate them
    console.log('🔄 Creating database indexes...');

    // User indexes
    await User.collection.dropIndexes().catch(() => {});
    await User.syncIndexes();
    console.log('✅ User collection indexes created');

    // Gig indexes
    await Gig.collection.dropIndexes().catch(() => {});
    await Gig.syncIndexes();
    console.log('✅ Gig collection indexes created');

    // Bid indexes
    await Bid.collection.dropIndexes().catch(() => {});
    await Bid.syncIndexes();
    console.log('✅ Bid collection indexes created');

    // Message indexes
    await Message.collection.dropIndexes().catch(() => {});
    await Message.syncIndexes();
    console.log('✅ Message collection indexes created');

    // Review indexes
    await Review.collection.dropIndexes().catch(() => {});
    await Review.syncIndexes();
    console.log('✅ Review collection indexes created');

    // Payment indexes
    await Payment.collection.dropIndexes().catch(() => {});
    await Payment.syncIndexes();
    console.log('✅ Payment collection indexes created');

    // Portfolio indexes
    await Portfolio.collection.dropIndexes().catch(() => {});
    await Portfolio.syncIndexes();
    console.log('✅ Portfolio collection indexes created');

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   🎉 DATABASE INITIALIZATION COMPLETED SUCCESSFULLY 🎉   ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  Collections Created:                                      ║');
    console.log('║  ✅ Users                                                  ║');
    console.log('║  ✅ Gigs                                                   ║');
    console.log('║  ✅ Bids                                                   ║');
    console.log('║  ✅ Messages                                               ║');
    console.log('║  ✅ Reviews                                                ║');
    console.log('║  ✅ Payments                                               ║');
    console.log('║  ✅ Portfolios                                             ║');
    console.log('║                                                            ║');
    console.log('║  All indexes created with ZERO ERRORS ✨                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
};

// Run initialization
initializeDatabase();
