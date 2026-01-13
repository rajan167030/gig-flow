import { useEffect, useCallback } from 'react';
import socketService from '../lib/socket';

/**
 * Custom hook to manage socket connections and real-time notifications
 * @param {string} userId - The current user's ID
 */
export const useSocket = (userId) => {
  useEffect(() => {
    if (userId) {
      // Connect to socket server when component mounts
      socketService.connect(userId);

      return () => {
        // Optionally disconnect when component unmounts
        // socketService.disconnect();
      };
    }
  }, [userId]);

  return socketService;
};

/**
 * Hook to listen for incoming messages
 * @param {function} callback - Function to call when message is received
 */
export const useMessageListener = (callback) => {
  useEffect(() => {
    socketService.onMessageReceived(callback);

    return () => {
      socketService.removeListener('receive-message');
    };
  }, [callback]);
};

/**
 * Hook to listen for incoming bids
 * @param {function} callback - Function to call when bid is received
 */
export const useBidListener = (callback) => {
  useEffect(() => {
    socketService.onBidReceived(callback);

    return () => {
      socketService.removeListener('bid-received');
    };
  }, [callback]);
};

/**
 * Hook to listen for bid status changes
 * @param {function} callback - Function to call when bid status changes
 */
export const useBidStatusListener = (callback) => {
  useEffect(() => {
    socketService.onBidStatusChange(callback);

    return () => {
      socketService.removeListener('bid-status-change');
    };
  }, [callback]);
};

/**
 * Hook to listen for gig assignments
 * @param {function} callback - Function to call when gig is assigned
 */
export const useGigAssignmentListener = (callback) => {
  useEffect(() => {
    socketService.onGigAssignment(callback);

    return () => {
      socketService.removeListener('gig-assignment-notification');
    };
  }, [callback]);
};

/**
 * Hook to listen for user typing indicators
 * @param {function} callback - Function to call when user is typing
 */
export const useTypingListener = (callback) => {
  useEffect(() => {
    socketService.onUserTyping(callback);

    return () => {
      socketService.removeListener('user-is-typing');
    };
  }, [callback]);
};

/**
 * Hook to listen for user stop typing
 * @param {function} callback - Function to call when user stops typing
 */
export const useStopTypingListener = (callback) => {
  useEffect(() => {
    socketService.onUserStoppedTyping(callback);

    return () => {
      socketService.removeListener('user-stopped-typing');
    };
  }, [callback]);
};

/**
 * Hook to listen for user status changes
 * @param {function} callback - Function to call when user status changes
 */
export const useUserStatusListener = (callback) => {
  useEffect(() => {
    socketService.onUserStatusChange(callback);

    return () => {
      socketService.removeListener('user-status-changed');
    };
  }, [callback]);
};
