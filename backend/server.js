const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');

// Load environment variables
dotenv.config();

// Import config and middleware
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Import routes
const authRoutes = require('./routes/auth');
const gigRoutes = require('./routes/gigs');
const bidRoutes = require('./routes/bids');
const userRoutes = require('./routes/users');

// Initialize Express app
const app = express();

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io with CORS settings
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GigFlow API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GigFlow API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      gigs: '/api/gigs',
      bids: '/api/bids',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Socket.io connection handling
const activeUsers = new Map(); // Map to store connected users and their socket IDs

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // When user joins/logs in
  socket.on('user-online', (userId) => {
    activeUsers.set(userId, socket.id);
    socket.join(`user-${userId}`);
    console.log(`User ${userId} is online`);
    // Broadcast user online status to all connected clients
    io.emit('user-status-changed', { userId, status: 'online' });
  });

  // New bid notification
  socket.on('new-bid', (data) => {
    const { gigOwnerId, freelancerId, gigId, bidAmount } = data;
    io.to(`user-${gigOwnerId}`).emit('bid-received', {
      freelancerId,
      gigId,
      bidAmount,
      timestamp: new Date()
    });
    console.log(`New bid notification sent to ${gigOwnerId}`);
  });

  // Chat message
  socket.on('send-message', (data) => {
    const { senderId, receiverId, message, gigId } = data;
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(`user-${receiverId}`).emit('receive-message', {
        senderId,
        message,
        gigId,
        timestamp: new Date()
      });
      console.log(`Message sent from ${senderId} to ${receiverId}`);
    }
  });

  // Bid status update notification
  socket.on('bid-status-updated', (data) => {
    const { bidId, freelancerId, status, gigId } = data;
    io.to(`user-${freelancerId}`).emit('bid-status-change', {
      bidId,
      status,
      gigId,
      timestamp: new Date()
    });
    console.log(`Bid status update notification sent for bid ${bidId}`);
  });

  // Gig assignment notification
  socket.on('gig-assigned', (data) => {
    const { freelancerId, gigId, gigTitle } = data;
    io.to(`user-${freelancerId}`).emit('gig-assignment-notification', {
      gigId,
      gigTitle,
      timestamp: new Date()
    });
    console.log(`Gig assignment notification sent to ${freelancerId}`);
  });

  // User typing indicator
  socket.on('user-typing', (data) => {
    const { senderId, receiverId } = data;
    io.to(`user-${receiverId}`).emit('user-is-typing', { senderId });
  });

  // User stops typing
  socket.on('user-stop-typing', (data) => {
    const { senderId, receiverId } = data;
    io.to(`user-${receiverId}`).emit('user-stopped-typing', { senderId });
  });

  // User disconnect
  socket.on('disconnect', () => {
    let disconnectedUserId = null;
    for (let [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        activeUsers.delete(userId);
        break;
      }
    }
    if (disconnectedUserId) {
      console.log(`User ${disconnectedUserId} disconnected`);
      io.emit('user-status-changed', { userId: disconnectedUserId, status: 'offline' });
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error(`Socket error: ${error}`);
  });
});

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  req.activeUsers = activeUsers;
  next();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;
