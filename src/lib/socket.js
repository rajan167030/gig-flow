import io from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = {};
  }

  // Connect to socket server
  connect(userId) {
    if (this.socket && this.isConnected) {
      console.log('Already connected to socket server');
      return this.socket;
    }

    this.socket = io(API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      this.isConnected = true;
      
      // Send user ID to server to track online status
      if (userId) {
        this.socket.emit('user-online', userId);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  // Disconnect from socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  // Send a message
  sendMessage(senderId, receiverId, message, gigId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send-message', {
        senderId,
        receiverId,
        message,
        gigId,
        timestamp: new Date()
      });
    } else {
      console.error('Socket not connected');
    }
  }

  // Listen for incoming messages
  onMessageReceived(callback) {
    if (this.socket) {
      this.socket.on('receive-message', (data) => {
        callback(data);
      });
    }
  }

  // Notify about new bid
  sendBidNotification(gigOwnerId, freelancerId, gigId, bidAmount) {
    if (this.socket && this.isConnected) {
      this.socket.emit('new-bid', {
        gigOwnerId,
        freelancerId,
        gigId,
        bidAmount
      });
    }
  }

  // Listen for bid notifications
  onBidReceived(callback) {
    if (this.socket) {
      this.socket.on('bid-received', (data) => {
        callback(data);
      });
    }
  }

  // Notify about bid status update
  sendBidStatusUpdate(bidId, freelancerId, status, gigId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('bid-status-updated', {
        bidId,
        freelancerId,
        status,
        gigId
      });
    }
  }

  // Listen for bid status changes
  onBidStatusChange(callback) {
    if (this.socket) {
      this.socket.on('bid-status-change', (data) => {
        callback(data);
      });
    }
  }

  // Notify about gig assignment
  sendGigAssignment(freelancerId, gigId, gigTitle) {
    if (this.socket && this.isConnected) {
      this.socket.emit('gig-assigned', {
        freelancerId,
        gigId,
        gigTitle
      });
    }
  }

  // Listen for gig assignment notifications
  onGigAssignment(callback) {
    if (this.socket) {
      this.socket.on('gig-assignment-notification', (data) => {
        callback(data);
      });
    }
  }

  // Send typing indicator
  sendTypingIndicator(senderId, receiverId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('user-typing', {
        senderId,
        receiverId
      });
    }
  }

  // Listen for typing indicators
  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('user-is-typing', (data) => {
        callback(data);
      });
    }
  }

  // Send stop typing indicator
  sendStopTypingIndicator(senderId, receiverId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('user-stop-typing', {
        senderId,
        receiverId
      });
    }
  }

  // Listen for stop typing
  onUserStoppedTyping(callback) {
    if (this.socket) {
      this.socket.on('user-stopped-typing', (data) => {
        callback(data);
      });
    }
  }

  // Listen for user status changes
  onUserStatusChange(callback) {
    if (this.socket) {
      this.socket.on('user-status-changed', (data) => {
        callback(data);
      });
    }
  }

  // Remove listener
  removeListener(eventName) {
    if (this.socket) {
      this.socket.off(eventName);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.offAny();
    }
  }
}

// Export singleton instance
export default new SocketService();
