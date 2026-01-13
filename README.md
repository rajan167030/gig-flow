# 🚀 GigFlow - Freelance Marketplace Platform

A modern, full-stack freelance marketplace application built with React, Node.js, Express, and MongoDB. GigFlow enables clients to post projects and freelancers to bid on them, with real-time notifications, messaging, and comprehensive project management.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Project Structure](#project-structure)
8. [Installation & Setup](#installation--setup)
9. [Environment Configuration](#environment-configuration)
10. [Running the Application](#running-the-application)
11. [Socket.io Events](#socketio-events)

---

## 🎯 Project Overview

**GigFlow** is a comprehensive freelance marketplace platform that connects clients with talented freelancers. The platform provides a seamless experience for posting gigs, bidding on projects, real-time communication, and secure payment processing.

### Core Business Logic:
- **Clients** can post gigs (projects) with detailed requirements and budgets
- **Freelancers** can browse gigs and submit competitive bids
- **Real-time notifications** keep users updated on bids, messages, and gig updates
- **Secure messaging system** for client-freelancer communication
- **Rating & review system** to build trust and credibility
- **Payment tracking** for transparent transaction management

---

## 🏗️ System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React SPA (Vite)                                        │   │
│  │  ├─ Components                                           │   │
│  │  ├─ Pages                                                │   │
│  │  ├─ State Management (Zustand)                           │   │
│  │  └─ Real-time Updates (Socket.io)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    HTTP + WebSocket
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js Server (Port 5000)                          │   │
│  │  ├─ REST API Routes                                     │   │
│  │  ├─ WebSocket Handler (Socket.io)                       │   │
│  │  ├─ Middleware (Auth, Logging, Error)                   │   │
│  │  └─ CORS Configuration                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Mongoose ODM
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LOGIC LAYER                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers & Services                                 │   │
│  │  ├─ Auth Controller                                     │   │
│  │  ├─ Gig Controller                                      │   │
│  │  ├─ Bid Controller                                      │   │
│  │  ├─ User Controller                                     │   │
│  │  └─ Message & Notification Services                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Business Logic
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Mongoose Models                                        │   │
│  │  ├─ User Model                                          │   │
│  │  ├─ Gig Model                                           │   │
│  │  ├─ Bid Model                                           │   │
│  │  ├─ Message Model                                       │   │
│  │  ├─ Review Model                                        │   │
│  │  ├─ Payment Model                                       │   │
│  │  └─ Portfolio Model                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    MongoDB Driver
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB Atlas Cluster                                  │   │
│  │  ├─ GigFlow Database                                    │   │
│  │  ├─ Collections (7)                                     │   │
│  │  └─ Indexes & Validation                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool & Dev server |
| **Socket.io-client** | Real-time communication |
| **Zustand** | State management |
| **Tailwind CSS** | Styling |
| **JavaScript (ES6+)** | Core language |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Socket.io** | WebSocket library |
| **Mongoose** | MongoDB ODM |
| **Dotenv** | Environment variables |
| **Nodemon** | Development tool |

### Database
| Technology | Purpose |
|-----------|---------|
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | Schema validation & ODM |

### DevTools
| Tool | Purpose |
|------|---------|
| **npm** | Package manager |
| **Git** | Version control |
| **Postman** | API testing |

---

## ✨ Features

### User Management
- ✅ User registration & authentication
- ✅ Profile management (freelancer & client)
- ✅ Skill management for freelancers
- ✅ Hourly rate configuration
- ✅ Location & timezone settings
- ✅ Profile picture upload
- ✅ User verification system

### Gig Management
- ✅ Create, read, update, delete gigs
- ✅ Category-based classification
- ✅ Budget & deadline setting
- ✅ Skill requirements
- ✅ File attachments
- ✅ Status tracking (open → completed)
- ✅ Search & filter functionality

### Bidding System
- ✅ Submit competitive bids
- ✅ Bid status management (pending → hired)
- ✅ Proposal messages
- ✅ Portfolio showcase
- ✅ Delivery time estimates
- ✅ Prevent duplicate bids

### Real-time Features
- ✅ **Instant notifications** for bids
- ✅ **Live chat** between clients & freelancers
- ✅ **Typing indicators** during conversation
- ✅ **User status** (online/offline)
- ✅ **Gig assignment notifications**
- ✅ **Bid status updates**

### Communication
- ✅ Direct messaging system
- ✅ Message history
- ✅ File sharing in messages
- ✅ Read/unread status
- ✅ Context-aware conversations (linked to gigs)

### Reviews & Ratings
- ✅ Rate freelancers (1-5 stars)
- ✅ Detailed feedback by category
- ✅ Client & freelancer reviews
- ✅ Review visibility in profiles

### Settings
- ✅ Notification preferences
- ✅ Privacy controls
- ✅ Theme selection (dark/light/auto)
- ✅ UI customization (accent color, font size)

---

## 📊 Database Schema

### Collection: Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  role: 'client' | 'freelancer' | 'both',
  bio: String,
  location: String,
  website: String,
  skills: [String],
  hourlyRate: Number,
  timezone: String,
  profilePicture: String,
  settings: {
    notifications: {...},
    privacy: {...},
    appearance: {...}
  },
  isVerified: Boolean,
  totalEarned: Number,
  totalSpent: Number,
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Gigs
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  budget: Number,
  clientId: ObjectId (ref: User),
  clientName: String,
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'closed' | 'cancelled',
  category: String,
  skillsRequired: [String],
  deadline: Date,
  bidsCount: Number,
  attachments: [{fileName, fileUrl, fileSize}],
  assignedTo: ObjectId (ref: User),
  assignedBidId: ObjectId (ref: Bid),
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Bids
```javascript
{
  _id: ObjectId,
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  freelancerName: String,
  amount: Number,
  message: String,
  status: 'pending' | 'hired' | 'rejected' | 'withdrawn',
  deliveryTime: Number (in days),
  coverLetter: String,
  portfolio: [{title, url, description}],
  attachments: [{fileName, fileUrl, fileSize}],
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Messages
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: User),
  senderName: String,
  receiverId: ObjectId (ref: User),
  receiverName: String,
  gigId: ObjectId (ref: Gig, optional),
  message: String,
  attachments: [{fileName, fileUrl, fileSize}],
  isRead: Boolean,
  readAt: Date,
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Reviews
```javascript
{
  _id: ObjectId,
  gigId: ObjectId (ref: Gig),
  reviewerId: ObjectId (ref: User),
  reviewerName: String,
  revieweeId: ObjectId (ref: User),
  revieweeName: String,
  rating: Number (1-5),
  comment: String,
  categories: {
    communication: Number,
    quality: Number,
    deadline: Number,
    professionalism: Number
  },
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Payments
```javascript
{
  _id: ObjectId,
  gigId: ObjectId (ref: Gig),
  clientId: ObjectId (ref: User),
  clientName: String,
  freelancerId: ObjectId (ref: User),
  freelancerName: String,
  amount: Number,
  status: 'pending' | 'completed' | 'refunded' | 'cancelled',
  paymentMethod: 'card' | 'paypal' | 'stripe' | 'bank-transfer' | 'other',
  transactionId: String (sparse),
  description: String,
  platformFee: Number,
  netAmount: Number,
  timestamps: { createdAt, updatedAt }
}
```

### Collection: Portfolios
```javascript
{
  _id: ObjectId,
  freelancerId: ObjectId (ref: User),
  title: String,
  description: String,
  category: String,
  images: [String],
  link: String,
  tools: [String],
  completionDate: Date,
  featured: Boolean,
  timestamps: { createdAt, updatedAt }
}
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user profile

### Gig Routes (`/api/gigs`)
- `GET /` - Get all gigs
- `POST /` - Create new gig
- `GET /:id` - Get gig details
- `PUT /:id` - Update gig
- `DELETE /:id` - Delete gig
- `GET /search?q=keyword` - Search gigs

### Bid Routes (`/api/bids`)
- `GET /` - Get all bids
- `POST /` - Submit new bid
- `GET /:id` - Get bid details
- `PUT /:id` - Update bid status
- `DELETE /:id` - Withdraw bid

### User Routes (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user profile
- `PUT /:id` - Update user profile
- `GET /:id/gigs` - Get user's gigs
- `GET /:id/bids` - Get user's bids
- `GET /:id/reviews` - Get user reviews

### Health Check (`/api/health`)
- `GET /` - API health status

---

## 📁 Project Structure

```
gig-flow/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── gigController.js      # Gig management
│   │   ├── bidController.js      # Bid management
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   ├── errorHandler.js       # Error handling
│   │   ├── logger.js             # Request logging
│   │   └── notFound.js           # 404 handler
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Gig.js                # Gig schema
│   │   ├── Bid.js                # Bid schema
│   │   ├── Message.js            # Message schema
│   │   ├── Review.js             # Review schema
│   │   ├── Payment.js            # Payment schema
│   │   └── Portfolio.js          # Portfolio schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── gigs.js               # Gig routes
│   │   ├── bids.js               # Bid routes
│   │   └── users.js              # User routes
│   ├── scripts/
│   │   └── initializeDb.js       # DB initialization
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server file
│
├── src/
│   ├── components/               # React components
│   │   ├── auth-form.jsx
│   │   ├── bid-modal.jsx
│   │   ├── dashboard.jsx
│   │   ├── gig-card.jsx
│   │   ├── navbar.jsx
│   │   └── ...
│   ├── lib/
│   │   ├── socket.js             # Socket.io service
│   │   ├── useSocket.js          # Socket hooks
│   │   ├── store.js              # State management
│   │   └── utils.js              # Utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/                       # Static assets
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd gig-flow
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ..
npm install
```

### Step 4: Database Initialization
```bash
cd backend
npm run init-db
```

---

## 🔐 Environment Configuration

### Backend `.env` file
```env
# Environment Configuration
NODE_ENV=development

# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# File Upload Configuration
MAX_FILE_SIZE=5242880
FILE_UPLOAD_PATH=./public/uploads
```

---

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm run dev          # Development mode with nodemon
# or
npm start            # Production mode
```

Backend runs on: `http://localhost:5000`

### Start Frontend Development Server
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Initialize Database (if needed)
```bash
cd backend
npm run init-db
```

---

## 🔌 Socket.io Events

### Client → Server
- `user-online` - User comes online
- `send-message` - Send a message
- `new-bid` - Notify about new bid
- `bid-status-updated` - Update bid status
- `gig-assigned` - Assign gig to freelancer
- `user-typing` - User typing indicator
- `user-stop-typing` - Stop typing indicator

### Server → Client
- `receive-message` - Receive incoming message
- `bid-received` - Receive bid notification
- `bid-status-change` - Bid status changed
- `gig-assignment-notification` - Gig assigned notification
- `user-is-typing` - User typing in chat
- `user-stopped-typing` - User stopped typing
- `user-status-changed` - User online/offline status

---

## 📝 API Usage Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "freelancer"
}
```

### Create Gig
```bash
POST /api/gigs
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Build React Dashboard",
  "description": "Need a responsive dashboard...",
  "budget": 500,
  "category": "web-development",
  "skillsRequired": ["React", "Node.js", "MongoDB"],
  "deadline": "2026-02-13"
}
```

### Submit Bid
```bash
POST /api/bids
Content-Type: application/json
Authorization: Bearer <token>

{
  "gigId": "507f1f77bcf86cd799439011",
  "amount": 450,
  "message": "I can deliver this in 10 days...",
  "deliveryTime": 10
}
```

---

## 🔍 Key Features Explained

### Real-time Notifications
Using Socket.io, users receive instant notifications when:
- A new bid is placed on their gig
- Their bid status changes
- They are assigned a gig
- They receive a message

### Messaging System
- Direct client-freelancer communication
- Context-aware messages (linked to specific gigs)
- Message read status tracking
- File sharing capability

### Payment Management
- Track all transactions
- Calculate platform fees
- Support multiple payment methods
- Maintain payment history

### Quality Assurance
- Rating system (1-5 stars)
- Category-based feedback (communication, quality, deadline, professionalism)
- Public reviews on profiles
- Build reputation over time

---

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure password special characters are URL-encoded

### Socket.io Connection Failed
- Check CORS origins in server.js
- Verify client and server are on same network
- Clear browser cache and reconnect

### Port Already in Use
```bash
# Change PORT in .env or use different port
PORT=5001
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

---

## 📧 Support

For support or questions, please contact: support@gigflow.com

---

**Built with ❤️ by GigFlow Team**

