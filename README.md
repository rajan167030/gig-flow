# 🚀 GigFlow - Freelance Marketplace Platform

A modern, full-stack freelance marketplace application built with React, Node.js, Express, and MongoDB. GigFlow enables clients to post projects and freelancers to bid on them, with real-time notifications, messaging, and comprehensive project management.

## 📸 Screenshots

<img width="1921" height="874" alt="GigFlow Dashboard" src="https://github.com/user-attachments/assets/6df68464-4a39-433d-9f6f-814cfde28ee9" />

<img width="1921" height="880" alt="GigFlow Gigs List" src="https://github.com/user-attachments/assets/b2dc753a-3174-46e5-8335-87c34ac33ce5" />

<img width="1921" height="878" alt="GigFlow Bidding Interface" src="https://github.com/user-attachments/assets/ddb07711-0f56-460e-aa9e-a657d1783835" />

<img width="1916" height="864" alt="GigFlow Profile Management" src="https://github.com/user-attachments/assets/5cc0a597-2963-4117-9b4d-388d4d7df1ad" />

---

## 📋 Table of Contents

- [📖 Project Overview](#-project-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [💻 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [📊 Database Schema](#-database-schema)
  - [Users Collection](#users-collection-detailed)
  - [Gigs Collection](#gigs-collection-detailed)
  - [Bids Collection](#bids-collection-detailed)
  - [Messages Collection](#messages-collection-detailed)
  - [Reviews Collection](#reviews-collection-detailed)
  - [Payments Collection](#payments-collection-detailed)
  - [Portfolios Collection](#portfolios-collection-detailed)
- [🔌 API Endpoints](#-api-endpoints)
  - [Authentication Routes](#authentication-routes-apiauthdetailed)
  - [Gig Routes](#gig-routes-apigigs-detailed)
  - [Bid Routes](#bid-routes-apibids-detailed)
  - [User Routes](#user-routes-apiusers-detailed)
- [📁 Project Structure](#-project-structure)
  - [Backend Structure](#backend-folder-structure)
  - [Frontend Structure](#frontend-folder-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [🔐 Environment Configuration](#-environment-configuration)
- [▶️ Running the Application](#️-running-the-application)
- [🔌 Socket.io Events](#-socketio-events-detailed)
  - [Real-time Notifications](#real-time-notifications)
  - [Chat Messaging](#chat-messaging)
  - [Status Updates](#status-updates)
- [📝 API Usage Examples](#-api-usage-examples)
- [🔍 Key Features Explained](#-key-features-explained)
  - [Real-time Notifications System](#real-time-notifications-system-detailed)
  - [Messaging System](#messaging-system-detailed)
  - [Payment Management](#payment-management-detailed)
  - [Quality Assurance](#quality-assurance-system-detailed)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📄 License](#-license)
- [👥 Contributing](#-contributing)

---

## 📖 Project Overview

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

### Architecture Overview

GigFlow follows a **layered architecture pattern** with clear separation of concerns. The application is divided into multiple layers, each responsible for specific functionality:

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React SPA (Vite)                                        │   │
│  │  ├─ Components (JSX)                                     │   │
│  │  ├─ Pages & Routes                                       │   │
│  │  ├─ State Management (Zustand)                           │   │
│  │  ├─ Real-time Updates (Socket.io Client)                 │   │
│  │  └─ HTTP Client (Fetch/Axios)                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Responsibility: User Interface, User Interaction, State         │
│  Management, Real-time Event Handling                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                    HTTP REST + WebSocket
                              │
                    (CORS enabled)
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js Server (Port 5000)                          │   │
│  │  ├─ REST API Routes                                     │   │
│  │    ├─ /api/auth                                         │   │
│  │    ├─ /api/gigs                                         │   │
│  │    ├─ /api/bids                                         │   │
│  │    └─ /api/users                                        │   │
│  │  ├─ WebSocket Handler (Socket.io Server)                │   │
│  │  ├─ Middleware Stack                                    │   │
│  │    ├─ Authentication Middleware                         │   │
│  │    ├─ Error Handler Middleware                          │   │
│  │    ├─ Request Logging Middleware                        │   │
│  │    └─ CORS Middleware                                   │   │
│  │  └─ Request/Response Validation                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Responsibility: Route Handling, Request Processing,             │
│  Error Handling, Cross-Origin Requests                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Mongoose ODM
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LOGIC LAYER                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers & Business Logic Services                  │   │
│  │  ├─ Auth Controller                                     │   │
│  │  │  ├─ User registration                               │   │
│  │  │  ├─ Login/logout                                    │   │
│  │  │  └─ Token generation                                │   │
│  │  ├─ Gig Controller                                      │   │
│  │  │  ├─ Create/Read/Update/Delete gigs                 │   │
│  │  │  ├─ Filter & search                                 │   │
│  │  │  └─ Status management                               │   │
│  │  ├─ Bid Controller                                      │   │
│  │  │  ├─ Submit bids                                     │   │
│  │  │  ├─ Accept/reject bids                              │   │
│  │  │  └─ Prevent duplicate bids                          │   │
│  │  ├─ User Controller                                     │   │
│  │  │  ├─ Profile management                              │   │
│  │  │  ├─ Skill management                                │   │
│  │  │  └─ Settings                                        │   │
│  │  └─ Socket.io Event Services                            │   │
│  │     ├─ Notification service                             │   │
│  │     ├─ Message service                                  │   │
│  │     └─ Real-time update service                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Responsibility: Business Logic, Data Validation,                │
│  Event Handling, Notification Logic                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Mongoose Models
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Mongoose Models (Schema & Validation)                  │   │
│  │  ├─ User Model                                          │   │
│  │  │  └─ Schema validation, indexes, hooks                │   │
│  │  ├─ Gig Model                                           │   │
│  │  │  └─ Full-text search index                           │   │
│  │  ├─ Bid Model                                           │   │
│  │  │  └─ Unique constraint (gigId + freelancerId)         │   │
│  │  ├─ Message Model                                       │   │
│  │  │  └─ Conversation indexes                             │   │
│  │  ├─ Review Model                                        │   │
│  │  │  └─ Rating validation (1-5)                          │   │
│  │  ├─ Payment Model                                       │   │
│  │  │  └─ Transaction tracking                             │   │
│  │  └─ Portfolio Model                                     │   │
│  │     └─ Freelancer work samples                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Responsibility: Data Schema Definition, Validation Rules,       │
│  Relationships, Indexes for Query Optimization                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    MongoDB Native Driver
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB Atlas Cluster (Cloud Database)                 │   │
│  │  ├─ GigFlow Database                                    │   │
│  │  ├─ Collections (7 Total)                               │   │
│  │  │  ├─ Users (User profiles & settings)                │   │
│  │  │  ├─ Gigs (Project listings)                         │   │
│  │  │  ├─ Bids (Freelancer proposals)                     │   │
│  │  │  ├─ Messages (Chat conversations)                   │   │
│  │  │  ├─ Reviews (Ratings & feedback)                    │   │
│  │  │  ├─ Payments (Transaction records)                  │   │
│  │  │  └─ Portfolios (Work samples)                       │   │
│  │  └─ Indexes & Replication                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Responsibility: Persistent Data Storage, Replication,           │
│  Backup, Query Optimization                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Explanation

**User Registration Flow:**
```
1. User enters credentials in React form
   ↓
2. Form validation in React
   ↓
3. POST /api/auth/register request
   ↓
4. Express receives request, applies middleware
   ↓
5. Auth controller validates input
   ↓
6. Password hashing (bcrypt)
   ↓
7. Mongoose saves user to MongoDB
   ↓
8. JWT token generated
   ↓
9. Response sent back to React
   ↓
10. User logged in and state updated
```

**Real-time Notification Flow:**
```
1. Freelancer submits bid
   ↓
2. POST /api/bids to backend
   ↓
3. Bid saved to MongoDB
   ↓
4. Gig owner's Socket.io event emitted
   ↓
5. Client-side listener receives event
   ↓
6. Notification displayed in React UI
   ↓
7. Toast/Alert shown to user
```

### Architecture Benefits

| Benefit | Explanation |
|---------|-------------|
| **Scalability** | Easy to add new features without affecting existing code |
| **Maintainability** | Clear separation makes debugging and updates easier |
| **Reusability** | Controllers and services can be reused across routes |
| **Testability** | Each layer can be tested independently |
| **Performance** | Database indexes and query optimization at data layer |
| **Security** | Middleware handles auth and validation before reaching business logic |

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

GigFlow uses MongoDB with Mongoose for schema validation. Each collection is designed with specific fields and validation rules to ensure data integrity and optimal query performance.

### Users Collection (Detailed)

The Users collection stores all user information including personal profiles, settings, and performance metrics.

```javascript
{
  _id: ObjectId,
  
  // Basic Information
  name: String,                    // Required, 2-100 chars
  email: String,                   // Required, unique, validated email format
  role: String,                    // 'client', 'freelancer', 'both'
  
  // Profile Information
  bio: String,                     // Max 1000 chars, user biography
  location: String,                // Max 200 chars, geographic location
  website: String,                 // Max 200 chars, portfolio website URL
  timezone: String,                // User's timezone for scheduling
  profilePicture: String,          // URL to profile image
  
  // Freelancer Information
  skills: [String],                // Array of expertise areas
  hourlyRate: Number,              // Minimum wage for freelancers
  
  // Account Settings
  settings: {
    notifications: {
      emailNotifications: Boolean, // Default: true
      bidNotifications: Boolean,   // Alert on new bids
      messageNotifications: Boolean, // Chat alerts
      marketingEmails: Boolean,    // Default: false
      weeklyDigest: Boolean,       // Default: true
      pushNotifications: Boolean   // Default: true
    },
    privacy: {
      profileVisibility: String,   // 'public', 'private', 'connections'
      showOnlineStatus: Boolean,   // Display online/offline
      showEmail: Boolean,          // Show email to others
      allowMessages: Boolean,      // Enable messaging
      showActivity: Boolean        // Show work history
    },
    appearance: {
      theme: String,               // 'dark', 'light', 'auto'
      accentColor: String,         // 'purple', 'blue', 'green', 'red'
      fontSize: String             // 'small', 'medium', 'large'
    }
  },
  
  // Account Status
  isVerified: Boolean,             // Email verification status
  totalEarned: Number,             // Total earnings (sum of payments)
  totalSpent: Number,              // Total spent (sum of paid gigs)
  
  // Timestamps
  createdAt: Date,                 // Account creation time
  updatedAt: Date                  // Last profile update
}
```

**Indexes:**
- Primary: `email` (unique)
- Query optimization: `role`, `createdAt`

**Use Cases:**
- User login/authentication
- Profile display and updates
- Freelancer skill-based search
- Notification preferences

---

### Gigs Collection (Detailed)

Stores all project postings created by clients.

```javascript
{
  _id: ObjectId,
  
  // Project Details
  title: String,                   // Required, 5-200 chars, gig title
  description: String,             // Required, 10-5000 chars, detailed description
  budget: Number,                  // Required, minimum 1 dollar
  category: String,                // 'web-development', 'mobile-development', 'design', etc.
  
  // Client Information
  clientId: ObjectId,              // Reference to User (required)
  clientName: String,              // Cache for quick access
  
  // Project Specifications
  skillsRequired: [String],        // Array of required skills
  deadline: Date,                  // Optional completion date
  
  // Status Tracking
  status: String,                  // 'open', 'assigned', 'in-progress', 'completed', 'closed', 'cancelled'
  bidsCount: Number,               // Total bids received (auto-incremented)
  
  // Bidding Information
  assignedTo: ObjectId,            // Reference to hired freelancer
  assignedBidId: ObjectId,         // Reference to winning bid
  
  // Files & Attachments
  attachments: [{
    fileName: String,              // Original filename
    fileUrl: String,               // URL to download
    fileSize: Number               // File size in bytes
  }],
  
  // Timestamps
  createdAt: Date,                 // When gig was posted
  updatedAt: Date                  // Last modification
}
```

**Indexes:**
- Query: `clientId`, `status`, `category`
- Sort: `createdAt` (descending)
- Search: Full-text index on `title` and `description`

**Use Cases:**
- Display all open gigs
- Client's gig management dashboard
- Category-based filtering
- Gig search and discovery

---

### Bids Collection (Detailed)

Stores all freelancer proposals/bids on gigs.

```javascript
{
  _id: ObjectId,
  
  // Bid Identification
  gigId: ObjectId,                 // Reference to Gig (required)
  freelancerId: ObjectId,          // Reference to User (required)
  freelancerName: String,          // Cache for notifications
  
  // Bid Terms
  amount: Number,                  // Proposed bid amount (required, > 0)
  deliveryTime: Number,            // Estimated days to complete
  
  // Proposal Content
  message: String,                 // Required, 10-2000 chars, proposal text
  coverLetter: String,             // Optional, detailed cover letter
  
  // Freelancer Portfolio Items
  portfolio: [{
    title: String,                 // Project title
    url: String,                    // Link to work
    description: String            // Brief description
  }],
  
  // Supporting Files
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }],
  
  // Bid Status
  status: String,                  // 'pending', 'hired', 'rejected', 'withdrawn'
  
  // Timestamps
  createdAt: Date,                 // When bid was submitted
  updatedAt: Date                  // Last status change
}
```

**Indexes:**
- Query: `gigId`, `freelancerId`, `status`
- Unique: `{gigId, freelancerId}` (prevent duplicate bids)
- Sort: `createdAt` (descending)

**Use Cases:**
- Get all bids for a gig
- Get freelancer's bids history
- Filter by bid status
- Prevent duplicate bidding

---

### Messages Collection (Detailed)

Enables direct communication between clients and freelancers.

```javascript
{
  _id: ObjectId,
  
  // Participants
  senderId: ObjectId,              // Reference to User (sender)
  senderName: String,              // Cached for display
  receiverId: ObjectId,            // Reference to User (receiver)
  receiverName: String,            // Cached for display
  
  // Message Context
  gigId: ObjectId,                 // Optional, linked gig for context
  message: String,                 // Required, 1-5000 chars
  
  // Message Status
  isRead: Boolean,                 // Default: false
  readAt: Date,                    // When message was read
  
  // Attachments
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }],
  
  // Timestamps
  createdAt: Date,                 // When sent
  updatedAt: Date                  // Last modification
}
```

**Indexes:**
- Conversation: `{senderId, receiverId}`, `{senderId, receiverId, createdAt}`
- Query: `senderId`, `receiverId`, `gigId`
- Sort: `createdAt` (descending)

**Use Cases:**
- Load conversation history
- Get unread message count
- Search messages
- Chat pagination

---

### Reviews Collection (Detailed)

Stores ratings and feedback after gig completion.

```javascript
{
  _id: ObjectId,
  
  // Review Context
  gigId: ObjectId,                 // Reference to completed Gig
  
  // Participants
  reviewerId: ObjectId,            // User giving review
  reviewerName: String,            // Cached name
  revieweeId: ObjectId,            // User being reviewed
  revieweeName: String,            // Cached name
  
  // Rating
  rating: Number,                  // 1-5 stars (required)
  comment: String,                 // 10-1000 chars, written feedback
  
  // Detailed Ratings by Category
  categories: {
    communication: Number,         // How responsive (1-5)
    quality: Number,               // Work quality (1-5)
    deadline: Number,              // Deadline adherence (1-5)
    professionalism: Number        // Professionalism (1-5)
  },
  
  // Timestamps
  createdAt: Date,                 // When review posted
  updatedAt: Date                  // When edited
}
```

**Indexes:**
- Query: `gigId`, `reviewerId`, `revieweeId`
- Rating: `rating` for sorting
- Timeline: `createdAt` (descending)

**Use Cases:**
- Display user reviews on profile
- Calculate average rating
- Verify reviews only on completed gigs
- Review history timeline

---

### Payments Collection (Detailed)

Tracks all financial transactions on the platform.

```javascript
{
  _id: ObjectId,
  
  // Transaction Identification
  transactionId: String,           // Payment gateway reference ID (sparse, unique)
  gigId: ObjectId,                 // Reference to paid Gig
  
  // Parties
  clientId: ObjectId,              // User paying
  clientName: String,              // Cached name
  freelancerId: ObjectId,          // User receiving payment
  freelancerName: String,          // Cached name
  
  // Amount Details
  amount: Number,                  // Total amount
  platformFee: Number,             // Commission (default: 0)
  netAmount: Number,               // Amount freelancer receives
  
  // Payment Details
  paymentMethod: String,           // 'card', 'paypal', 'stripe', 'bank-transfer'
  status: String,                  // 'pending', 'completed', 'refunded', 'cancelled'
  description: String,             // Optional reason/reference
  
  // Timestamps
  createdAt: Date,                 // Payment initiated
  updatedAt: Date                  // Last status change
}
```

**Indexes:**
- Query: `gigId`, `clientId`, `freelancerId`
- Status: `status` for filtering
- Transaction: `transactionId` (unique)
- Timeline: `createdAt` (descending)

**Use Cases:**
- Payment history
- Earnings tracking
- Refund management
- Revenue reports

---

### Portfolios Collection (Detailed)

Freelancer work samples and portfolio projects.

```javascript
{
  _id: ObjectId,
  
  // Portfolio Item Details
  freelancerId: ObjectId,          // Reference to freelancer
  title: String,                   // Required, 3-200 chars
  description: String,             // Max 2000 chars
  category: String,                // 'web-development', 'design', etc.
  
  // Project Information
  link: String,                    // URL to live project
  tools: [String],                 // Technologies used
  completionDate: Date,            // When project was completed
  featured: Boolean,               // Highlighted on profile
  
  // Media
  images: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number
  }],
  
  // Timestamps
  createdAt: Date,                 // When added to portfolio
  updatedAt: Date                  // When edited
}
```

**Indexes:**
- Query: `freelancerId`, `featured`
- Category: `category` for browsing
- Timeline: `createdAt` (descending)

**Use Cases:**
- Display freelancer's portfolio
- Portfolio management dashboard
- Category-based portfolio browsing

---

## 🔌 API Endpoints

All API endpoints follow RESTful conventions with proper HTTP methods and status codes.

### Authentication Routes (`/api/auth`) (Detailed)

Handle user authentication, registration, and account management.

#### Register New User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123!",
  "role": "freelancer"  // or "client" or "both"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123!"
}

Response (200):
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User Profile
```
GET /api/auth/me
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "bio": "Experienced web developer",
    "skills": ["React", "Node.js", "MongoDB"],
    "hourlyRate": 50,
    "profilePicture": "https://...",
    "isVerified": true,
    "settings": {...}
  }
}
```

#### Logout User
```
POST /api/auth/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Gig Routes (`/api/gigs`) (Detailed)

Manage gig (project) creation, updates, and retrieval.

#### Get All Gigs (with Pagination & Filtering)
```
GET /api/gigs?page=1&limit=10&category=web-development&status=open
Authorization: Bearer {token}

Query Parameters:
- page: Pagination page (default: 1)
- limit: Items per page (default: 10)
- category: Filter by category
- status: Filter by status (open, assigned, completed, etc.)
- search: Full-text search on title/description
- minBudget: Minimum budget filter
- maxBudget: Maximum budget filter
- sortBy: created|budget|deadline
- sortOrder: asc|desc

Response (200):
{
  "success": true,
  "data": {
    "gigs": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Build React Dashboard",
        "description": "Need a responsive dashboard with real-time data...",
        "budget": 500,
        "category": "web-development",
        "status": "open",
        "bidsCount": 5,
        "clientName": "Jane Smith",
        "skillsRequired": ["React", "Node.js", "MongoDB"],
        "deadline": "2026-02-13T00:00:00Z",
        "createdAt": "2026-01-13T10:30:00Z"
      },
      // ... more gigs
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalGigs": 47,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Create New Gig
```
POST /api/gigs
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "title": "Build React Dashboard",
  "description": "I need a responsive admin dashboard...",
  "budget": 500,
  "category": "web-development",
  "skillsRequired": ["React", "Node.js", "MongoDB"],
  "deadline": "2026-02-13"
}

Response (201):
{
  "success": true,
  "message": "Gig created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build React Dashboard",
    "description": "I need a responsive admin dashboard...",
    "budget": 500,
    "category": "web-development",
    "status": "open",
    "bidsCount": 0,
    "clientId": "507f1f77bcf86cd799439011",
    "clientName": "Jane Smith",
    "createdAt": "2026-01-13T10:30:00Z"
  }
}
```

#### Get Single Gig Details
```
GET /api/gigs/:gigId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build React Dashboard",
    "description": "Detailed description...",
    "budget": 500,
    "category": "web-development",
    "status": "open",
    "bidsCount": 5,
    "clientId": "507f1f77bcf86cd799439011",
    "clientName": "Jane Smith",
    "skillsRequired": ["React", "Node.js", "MongoDB"],
    "deadline": "2026-02-13T00:00:00Z",
    "attachments": [
      {
        "fileName": "requirements.pdf",
        "fileUrl": "https://...",
        "fileSize": 102400
      }
    ],
    "bids": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "freelancerName": "John Doe",
        "amount": 450,
        "status": "pending",
        "deliveryTime": 10
      }
    ],
    "createdAt": "2026-01-13T10:30:00Z"
  }
}
```

#### Update Gig
```
PUT /api/gigs/:gigId
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "title": "Build React Dashboard (Updated)",
  "budget": 600,
  "status": "assigned"
}

Response (200):
{
  "success": true,
  "message": "Gig updated successfully",
  "data": { ...updated gig data... }
}
```

#### Delete Gig
```
DELETE /api/gigs/:gigId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Gig deleted successfully"
}
```

---

### Bid Routes (`/api/bids`) (Detailed)

Handle freelancer bids and proposal submissions.

#### Get All Bids for a Gig
```
GET /api/bids?gigId=507f1f77bcf86cd799439012
Authorization: Bearer {token}

Query Parameters:
- gigId: Filter by gig (required)
- status: Filter by bid status
- sortBy: created|amount
- sortOrder: asc|desc

Response (200):
{
  "success": true,
  "data": {
    "bids": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "gigId": "507f1f77bcf86cd799439012",
        "freelancerId": "507f1f77bcf86cd799439013",
        "freelancerName": "John Doe",
        "amount": 450,
        "deliveryTime": 10,
        "status": "pending",
        "message": "I can build this dashboard...",
        "portfolio": [
          {
            "title": "E-commerce Dashboard",
            "url": "https://portfolio.com/project1",
            "description": "Built with React and Node.js"
          }
        ],
        "createdAt": "2026-01-13T12:00:00Z"
      }
    ],
    "totalBids": 5
  }
}
```

#### Submit New Bid
```
POST /api/bids
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "gigId": "507f1f77bcf86cd799439012",
  "amount": 450,
  "deliveryTime": 10,
  "message": "I can build this dashboard in 10 days. I have experience with...",
  "coverLetter": "Additional details about my approach...",
  "portfolio": [
    {
      "title": "Previous Dashboard",
      "url": "https://...",
      "description": "Built with React and Node.js"
    }
  ]
}

Response (201):
{
  "success": true,
  "message": "Bid submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "gigId": "507f1f77bcf86cd799439012",
    "freelancerId": "507f1f77bcf86cd799439013",
    "freelancerName": "John Doe",
    "amount": 450,
    "status": "pending",
    "createdAt": "2026-01-13T12:00:00Z"
  }
}
```

#### Accept/Hire Freelancer
```
PUT /api/bids/:bidId
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "status": "hired"
}

Response (200):
{
  "success": true,
  "message": "Freelancer hired successfully",
  "data": {
    ...updated bid data...
  }
}
```

#### Reject Bid
```
PUT /api/bids/:bidId
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "status": "rejected"
}

Response (200):
{
  "success": true,
  "message": "Bid rejected"
}
```

---

### User Routes (`/api/users`) (Detailed)

Manage user profiles and information.

#### Get User Profile
```
GET /api/users/:userId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "bio": "Full-stack developer with 5+ years experience",
    "location": "San Francisco, CA",
    "website": "https://johndoe.com",
    "skills": ["React", "Node.js", "MongoDB", "AWS"],
    "hourlyRate": 50,
    "timezone": "PST",
    "profilePicture": "https://...",
    "isVerified": true,
    "totalEarned": 15000,
    "totalSpent": 0,
    "averageRating": 4.8,
    "totalReviews": 25,
    "createdAt": "2025-06-01T00:00:00Z"
  }
}
```

#### Update User Profile
```
PUT /api/users/:userId
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "bio": "Updated bio",
  "skills": ["React", "Vue.js", "Node.js"],
  "hourlyRate": 55,
  "timezone": "EST"
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ...updated user data... }
}
```

#### Get User's Gigs
```
GET /api/users/:userId/gigs
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "gigs": [
      { ...gig data... }
    ],
    "totalGigs": 5
  }
}
```

#### Get User's Bids
```
GET /api/users/:userId/bids
Authorization: Bearer {token}

Query Parameters:
- status: Filter by status
- page: Pagination
- limit: Items per page

Response (200):
{
  "success": true,
  "data": {
    "bids": [
      { ...bid data... }
    ],
    "totalBids": 12
  }
}
```

#### Get User Reviews/Ratings
```
GET /api/users/:userId/reviews
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439030",
        "gigId": "507f1f77bcf86cd799439012",
        "reviewerName": "Jane Smith",
        "rating": 5,
        "comment": "Excellent work, delivered on time!",
        "categories": {
          "communication": 5,
          "quality": 5,
          "deadline": 5,
          "professionalism": 5
        },
        "createdAt": "2026-01-10T00:00:00Z"
      }
    ],
    "averageRating": 4.8,
    "totalReviews": 25
  }
}
```

---

## 📁 Project Structure

Detailed explanation of the project's folder organization and file purposes.

### Backend Folder Structure

```
backend/
├── config/
│   └── db.js                          # MongoDB connection configuration
│       └── Handles Mongoose connection with error handling
│
├── controllers/
│   ├── authController.js              # Authentication logic
│   │   ├── User registration
│   │   ├── Login/logout
│   │   ├── Password hashing (bcrypt)
│   │   └── JWT token generation
│   │
│   ├── gigController.js               # Gig management
│   │   ├── Create/read/update/delete gigs
│   │   ├── Search and filter
│   │   ├── Status management
│   │   └── Bid counting
│   │
│   ├── bidController.js               # Bid management
│   │   ├── Submit bids
│   │   ├── Accept/reject bids
│   │   ├── Prevent duplicate bids
│   │   └── Update bid status
│   │
│   └── userController.js              # User management
│       ├── Profile management
│       ├── Skill management
│       ├── Settings management
│       └── User statistics
│
├── middleware/
│   ├── errorHandler.js                # Global error handling
│   │   └── Catch and format all errors
│   │
│   ├── logger.js                      # Request logging
│   │   └── Log all incoming requests
│   │
│   └── notFound.js                    # 404 handler
│       └── Handle undefined routes
│
├── models/
│   ├── User.js                        # User schema and validation
│   │   └── Index: email
│   │
│   ├── Gig.js                         # Gig schema
│   │   └── Indexes: clientId, status, createdAt, full-text search
│   │
│   ├── Bid.js                         # Bid schema
│   │   └── Unique index: {gigId, freelancerId}
│   │
│   ├── Message.js                     # Message schema
│   │   └── Indexes for conversation lookup
│   │
│   ├── Review.js                      # Review schema
│   │   └── Indexes: revieweeId, rating
│   │
│   ├── Payment.js                     # Payment schema
│   │   └── Indexes: status, transactionId
│   │
│   └── Portfolio.js                   # Portfolio schema
│       └── Indexes: freelancerId, featured
│
├── routes/
│   ├── auth.js                        # Authentication endpoints
│   │   ├── POST /register
│   │   ├── POST /login
│   │   ├── POST /logout
│   │   └── GET /me
│   │
│   ├── gigs.js                        # Gig endpoints
│   │   ├── GET / (all gigs with filters)
│   │   ├── POST / (create gig)
│   │   ├── GET /:id (single gig)
│   │   ├── PUT /:id (update gig)
│   │   └── DELETE /:id (delete gig)
│   │
│   ├── bids.js                        # Bid endpoints
│   │   ├── GET / (all bids)
│   │   ├── POST / (submit bid)
│   │   ├── GET /:id (single bid)
│   │   ├── PUT /:id (update bid status)
│   │   └── DELETE /:id (withdraw bid)
│   │
│   └── users.js                       # User endpoints
│       ├── GET / (all users)
│       ├── GET /:id (user profile)
│       ├── PUT /:id (update profile)
│       ├── GET /:id/gigs
│       ├── GET /:id/bids
│       └── GET /:id/reviews
│
├── scripts/
│   └── initializeDb.js                # Database initialization script
│       └── Creates collections and indexes
│
├── .env                               # Environment variables
│       ├── MONGODB_URI
│       ├── PORT
│       ├── NODE_ENV
│       ├── JWT_SECRET
│       └── CLIENT_URL
│
├── package.json                       # Dependencies and scripts
│       ├── "dev": "nodemon server.js"
│       ├── "start": "node server.js"
│       └── "init-db": "node scripts/initializeDb.js"
│
└── server.js                          # Main application entry point
    ├── Express app initialization
    ├── Socket.io setup
    ├── Middleware configuration
    ├── Routes registration
    └── Server startup
```

### Frontend Folder Structure

```
src/
├── components/                        # React components
│   ├── auth-form.jsx                  # Login/Register form
│   ├── bid-modal.jsx                  # Modal for submitting bids
│   ├── bids-list-modal.jsx            # Display all bids on gig
│   ├── dashboard.jsx                  # Main dashboard page
│   ├── gig-card.jsx                   # Individual gig card component
│   ├── gigs-list.jsx                  # List of gigs with filtering
│   ├── menu-bar.jsx                   # Navigation menu
│   ├── my-bids-tab.jsx                # User's bids view
│   ├── my-gigs-tab.jsx                # User's gigs management
│   ├── navbar.jsx                     # Top navigation bar
│   ├── post-gig-modal.jsx             # Create new gig form
│   ├── profile-menu-card.jsx          # User profile dropdown
│   ├── settings-tab.jsx               # User settings page
│   ├── theme-provider.jsx             # Dark/light theme wrapper
│   ├── user-profile-tab.jsx           # User profile view
│   │
│   └── ui/                            # Reusable UI components
│       ├── button.jsx                 # Button component
│       ├── card.jsx                   # Card wrapper
│       └── input.jsx                  # Input field component
│
├── lib/
│   ├── socket.js                      # Socket.io service
│   │   ├── connect() - Establish connection
│   │   ├── sendMessage() - Send chat message
│   │   ├── onMessageReceived() - Listen for messages
│   │   ├── sendBidNotification() - Notify about bid
│   │   ├── onBidReceived() - Listen for bids
│   │   └── ... other Socket.io methods
│   │
│   ├── useSocket.js                   # Custom React hooks
│   │   ├── useSocket() - Initialize socket
│   │   ├── useMessageListener() - Listen for messages
│   │   ├── useBidListener() - Listen for bids
│   │   ├── useBidStatusListener() - Listen for bid updates
│   │   ├── useGigAssignmentListener()
│   │   ├── useTypingListener()
│   │   └── useUserStatusListener()
│   │
│   ├── store.js                       # Zustand state management
│   │   ├── User state
│   │   ├── Gigs state
│   │   ├── Bids state
│   │   ├── Notifications state
│   │   └── UI state
│   │
│   └── utils.js                       # Utility functions
│       ├── API helpers
│       ├── Formatting functions
│       ├── Validation functions
│       └── Date/time utilities
│
├── styles/
│   └── globals.css                    # Global styles (Tailwind)
│
├── App.jsx                            # Main app component
│   ├── Router setup
│   ├── Global state initialization
│   ├── Socket.io initialization
│   └── Theme setup
│
├── index.css                          # Global CSS
├── main.jsx                           # React entry point
│
└── public/                            # Static assets
    ├── Images
    ├── Icons
    └── Fonts
```

### Root Level Files

```
gig-flow/
├── .gitignore                         # Git ignore rules (no .env* excluded)
├── .env.example                       # Template environment variables
├── components.json                    # UI component configuration
├── index.html                         # HTML entry point
├── jsconfig.json                      # JavaScript config
├── package.json                       # Frontend dependencies
├── postcss.config.mjs                 # PostCSS configuration
├── vite.config.js                     # Vite configuration
├── README.md                          # This file
└── SETTINGS_FEATURE_README.md         # Settings feature documentation
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

## 🔌 Socket.io Events (Detailed)

Real-time WebSocket communication enables instant notifications and live updates without polling.

### Real-time Notifications

#### User Online Status
When a user connects to the application, their online status is broadcast to other users.

```javascript
// Client Side (Frontend)
socket.emit('user-online', userId);

// Server Side (Backend)
socket.on('user-online', (userId) => {
  activeUsers.set(userId, socket.id);
  socket.join(`user-${userId}`);
  io.emit('user-status-changed', { 
    userId, 
    status: 'online' 
  });
});

// Listening for status changes
socket.on('user-status-changed', (data) => {
  console.log(`${data.userId} is now ${data.status}`);
  updateUserStatusInUI(data.userId, data.status);
});
```

#### New Bid Notification
When a freelancer submits a bid, the gig owner receives an instant notification.

```javascript
// Client Side - Freelancer submitting bid
socket.emit('new-bid', {
  gigOwnerId: '507f1f77bcf86cd799439011',
  freelancerId: '507f1f77bcf86cd799439013',
  gigId: '507f1f77bcf86cd799439012',
  bidAmount: 450
});

// Server Side
socket.on('new-bid', (data) => {
  io.to(`user-${data.gigOwnerId}`).emit('bid-received', {
    freelancerId: data.freelancerId,
    gigId: data.gigId,
    bidAmount: data.bidAmount,
    timestamp: new Date(),
    message: `New bid of $${data.bidAmount} received!`
  });
});

// Client Side - Gig owner receiving notification
socket.on('bid-received', (data) => {
  console.log(`New bid: $${data.bidAmount}`);
  showNotificationToast({
    title: 'New Bid Received',
    message: `Someone bid $${data.bidAmount} on your gig`,
    gigId: data.gigId
  });
  // Update bids count in real-time
  incrementGigBidsCount(data.gigId);
});
```

#### Bid Status Update Notification
When a client accepts or rejects a bid, the freelancer is instantly notified.

```javascript
// Server Side - Client accepts/rejects bid
socket.emit('bid-status-updated', {
  bidId: '507f1f77bcf86cd799439020',
  freelancerId: '507f1f77bcf86cd799439013',
  status: 'hired', // or 'rejected'
  gigId: '507f1f77bcf86cd799439012'
});

// Client Side - Freelancer receiving update
socket.on('bid-status-change', (data) => {
  if (data.status === 'hired') {
    showNotificationToast({
      title: 'Congratulations!',
      message: 'Your bid was accepted!',
      type: 'success'
    });
  } else if (data.status === 'rejected') {
    showNotificationToast({
      title: 'Bid Rejected',
      message: 'Your bid was not accepted for this gig',
      type: 'info'
    });
  }
  updateBidStatus(data.bidId, data.status);
});
```

#### Gig Assignment Notification
When a freelancer is hired for a gig, they receive a confirmation notification.

```javascript
// Server Side
socket.emit('gig-assigned', {
  freelancerId: '507f1f77bcf86cd799439013',
  gigId: '507f1f77bcf86cd799439012',
  gigTitle: 'Build React Dashboard'
});

// Client Side
socket.on('gig-assignment-notification', (data) => {
  showNotificationToast({
    title: 'Gig Assigned',
    message: `You've been assigned to: ${data.gigTitle}`,
    type: 'success'
  });
  // Redirect to gig details
  navigateToGig(data.gigId);
});
```

---

### Chat Messaging

#### Send Message
Direct messaging between clients and freelancers with optional file attachments.

```javascript
// Client Side - Sending message
socket.emit('send-message', {
  senderId: '507f1f77bcf86cd799439011',
  receiverId: '507f1f77bcf86cd799439013',
  message: 'Hi, I have some questions about the project requirements',
  gigId: '507f1f77bcf86cd799439012', // Optional, for context
  timestamp: new Date()
});

// Server Side
socket.on('send-message', (data) => {
  // Save message to database
  const message = new Message(data);
  await message.save();
  
  // Send to receiver only
  io.to(`user-${data.receiverId}`).emit('receive-message', {
    senderId: data.senderId,
    senderName: data.senderName,
    message: data.message,
    gigId: data.gigId,
    timestamp: new Date(),
    _id: message._id
  });
});

// Client Side - Receiving message
socket.on('receive-message', (data) => {
  // Add message to chat UI
  addMessageToChat({
    from: data.senderName,
    text: data.message,
    timestamp: data.timestamp,
    isOwn: false
  });
  
  // Show notification if chat is not open
  if (!isChatOpen(data.senderId)) {
    showNotificationToast({
      title: `Message from ${data.senderName}`,
      message: data.message.substring(0, 50) + '...'
    });
  }
});
```

#### Typing Indicators
Show when the other person is typing in the chat.

```javascript
// Client Side - User starts typing
const handleMessageInput = (text) => {
  if (!isTyping.current) {
    socket.emit('user-typing', {
      senderId: currentUserId,
      receiverId: chatPartnerId
    });
    isTyping.current = true;
  }
  setText(text);
};

// Server Side
socket.on('user-typing', (data) => {
  io.to(`user-${data.receiverId}`).emit('user-is-typing', {
    senderId: data.senderId,
    senderName: data.senderName
  });
});

// Client Side - Receiving typing indicator
socket.on('user-is-typing', (data) => {
  displayTypingIndicator(data.senderName);
  // e.g., show "John is typing..."
});

// Client Side - User stops typing
const handleMessageSendOrBlur = () => {
  if (isTyping.current) {
    socket.emit('user-stop-typing', {
      senderId: currentUserId,
      receiverId: chatPartnerId
    });
    isTyping.current = false;
  }
};

// Server Side
socket.on('user-stop-typing', (data) => {
  io.to(`user-${data.receiverId}`).emit('user-stopped-typing', {
    senderId: data.senderId
  });
});

// Client Side - Receiving stop typing
socket.on('user-stopped-typing', (data) => {
  removeTypingIndicator(data.senderId);
});
```

---

### Status Updates

#### User Disconnect
When a user logs out or loses connection.

```javascript
// Server Side - Automatic
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
    io.emit('user-status-changed', { 
      userId: disconnectedUserId, 
      status: 'offline' 
    });
  }
});

// Client Side
socket.on('user-status-changed', (data) => {
  if (data.status === 'offline') {
    updateUserAvailability(data.userId, false);
    // Show "Last seen" timestamp
  }
});
```

#### Error Handling
Graceful error handling for socket issues.

```javascript
// Server Side
socket.on('error', (error) => {
  console.error(`Socket error for ${socket.id}:`, error);
  // Log error and notify client
});

// Client Side
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  showErrorToast('Connection lost. Retrying...');
});

socket.on('reconnect', () => {
  console.log('Reconnected to server');
  showSuccessToast('Connection restored');
  // Resend user-online event
  socket.emit('user-online', currentUserId);
});
```

---

## � Key Features Explained

### Real-time Notifications System (Detailed)

The notification system is built on Socket.io and provides instant updates to users without requiring page refreshes.

#### How It Works:
1. User logs in → `user-online` event emitted
2. Server stores user ID and Socket connection
3. When relevant events occur (bid, message, etc.), server emits to that user
4. Frontend receives event and updates UI instantly

#### Implementation in React:

```jsx
import { useSocket, useBidListener } from '@/lib/useSocket';

export function NotificationCenter() {
  const socket = useSocket(userId);
  
  // Listen for bid notifications
  useBidListener((data) => {
    // Show toast notification
    toast.success(`New bid of $${data.bidAmount} received!`);
    
    // Update gigs list
    updateGigBidsCount(data.gigId);
  });
  
  // Listen for bid status updates
  useBidStatusListener((data) => {
    if (data.status === 'hired') {
      toast.success('Congratulations! Your bid was accepted!');
      navigateToGig(data.gigId);
    }
  });
  
  return <div>{/* Notification UI */}</div>;
}
```

#### Benefits:
- **Instant Updates** - No need to refresh
- **User Engagement** - Immediate feedback on actions
- **Better UX** - Real-time bid notifications keep users engaged
- **Reduced Server Load** - WebSocket is more efficient than polling

---

### Messaging System (Detailed)

Direct messaging enables secure communication between clients and freelancers.

#### Features:
- **One-to-One Messaging** - Direct conversations between two users
- **Message History** - Persistent storage with pagination
- **Read Status** - Track if message was read
- **Gig Context** - Messages linked to specific gigs
- **File Sharing** - Attach files to messages
- **Typing Indicators** - See when other person is typing

#### Message Flow:

```
Client A sends message
    ↓
Frontend Socket emits 'send-message'
    ↓
Backend receives, validates, saves to MongoDB
    ↓
Backend emits 'receive-message' to Client B
    ↓
Client B's UI updates instantly
    ↓
Client B reads message → 'readAt' timestamp updated
```

#### React Component Example:

```jsx
export function ChatWindow({ conversationId, partnerId }) {
  const [messages, setMessages] = useState([]);
  const socket = useSocket(userId);
  
  // Listen for incoming messages
  useMessageListener((data) => {
    if (data.senderId === partnerId) {
      setMessages(prev => [...prev, data]);
      // Mark as read
      markMessageAsRead(data._id);
    }
  });
  
  // Send message
  const sendMessage = (text) => {
    socket.sendMessage(userId, partnerId, text, gigId);
  };
  
  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
```

#### Benefits:
- **Secure** - Only involved parties can see messages
- **Efficient** - Uses WebSocket for low-latency communication
- **Contextual** - Messages linked to gigs for clarity
- **Professional** - Read receipts build trust

---

### Payment Management (Detailed)

Tracks all financial transactions with multiple payment methods and status tracking.

#### Payment Process:

```
1. Freelancer hired (bid status = 'hired')
   ↓
2. Payment record created (status = 'pending')
   ↓
3. Client initiates payment (external payment gateway)
   ↓
4. Payment gateway processes transaction
   ↓
5. Webhook/Callback updates payment status
   ↓
6. Payment status = 'completed'
   ↓
7. Freelancer balance updated
   ↓
8. Both parties notified
```

#### Supported Payment Methods:
- Credit/Debit Card
- PayPal
- Stripe
- Bank Transfer
- Custom (escrow, etc.)

#### Payment Schema Example:

```javascript
{
  transactionId: "stripe_txn_12345",
  gigId: ObjectId,
  clientId: ObjectId,
  freelancerId: ObjectId,
  amount: 500,
  platformFee: 50,      // 10% commission
  netAmount: 450,       // Amount freelancer receives
  paymentMethod: "card",
  status: "completed",  // pending | completed | refunded | cancelled
  createdAt: Date,
  updatedAt: Date
}
```

#### Backend Implementation:

```javascript
const createPayment = async (gigId, clientId, freelancerId, amount) => {
  // Calculate platform fee (10%)
  const platformFee = amount * 0.1;
  const netAmount = amount - platformFee;
  
  // Create payment record
  const payment = new Payment({
    gigId,
    clientId,
    freelancerId,
    amount,
    platformFee,
    netAmount,
    status: 'pending'
  });
  
  await payment.save();
  return payment;
};

// After payment gateway confirms
const completePayment = async (transactionId) => {
  const payment = await Payment.findOneAndUpdate(
    { transactionId },
    { status: 'completed' },
    { new: true }
  );
  
  // Update freelancer earnings
  await User.findByIdAndUpdate(
    payment.freelancerId,
    { $inc: { totalEarned: payment.netAmount } }
  );
  
  // Notify both parties
  io.to(`user-${payment.clientId}`).emit('payment-completed', payment);
  io.to(`user-${payment.freelancerId}`).emit('payment-received', payment);
};
```

#### Benefits:
- **Transparent** - Clear breakdown of fees
- **Secure** - Integration with trusted payment providers
- **Trackable** - Complete transaction history
- **Flexible** - Multiple payment options
- **Protected** - Escrow mechanism prevents fraud

---

### Quality Assurance System (Detailed)

Reviews and ratings build trust and maintain quality on the platform.

#### Review Process:

```
1. Gig completed
   ↓
2. Review prompt shown to client
   ↓
3. Client rates freelancer (1-5 stars)
   ↓
4. Client provides detailed feedback
   ↓
5. Categories rated separately:
   - Communication (1-5)
   - Quality (1-5)
   - Deadline adherence (1-5)
   - Professionalism (1-5)
   ↓
6. Review saved to database
   ↓
7. Freelancer average rating updated
   ↓
8. Freelancer can view review
```

#### Review Component:

```jsx
export function ReviewForm({ gigId, freelancerId }) {
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState({
    communication: 0,
    quality: 0,
    deadline: 0,
    professionalism: 0
  });
  const [comment, setComment] = useState('');
  
  const submitReview = async () => {
    const review = {
      gigId,
      freelancerId,
      rating,
      categories,
      comment
    };
    
    await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: { 'Authorization': `Bearer ${token}` }
    });
  };
  
  return (
    <form onSubmit={submitReview}>
      <StarRating value={rating} onChange={setRating} />
      
      <div>
        <label>Communication</label>
        <StarRating 
          value={categories.communication}
          onChange={(val) => setCategories({...categories, communication: val})}
        />
      </div>
      
      {/* Similar for quality, deadline, professionalism */}
      
      <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us about your experience..."
      />
      
      <button type="submit">Submit Review</button>
    </form>
  );
}
```

#### Profile Display:

```jsx
export function ProfileCard({ userId }) {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    // Fetch user and their reviews
    const fetchProfile = async () => {
      const userRes = await fetch(`/api/users/${userId}`);
      const reviewRes = await fetch(`/api/users/${userId}/reviews`);
      
      setUser(await userRes.json());
      setReviews(await reviewRes.json());
    };
    fetchProfile();
  }, [userId]);
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <div>
        <strong>Rating: {user?.averageRating}/5</strong>
        <p>({user?.totalReviews} reviews)</p>
      </div>
      
      <div>
        {reviews.map(review => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
```

#### Benefits:
- **Trust Building** - Reviews build credibility
- **Quality Control** - Poor performers are identified
- **Motivation** - Encourages high-quality work
- **Informed Decisions** - Clients choose based on ratings
- **Accountability** - Reviews hold freelancers accountable

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

For support or questions, please contact: rajan.jha114430@gmail.com

---

**Built with ❤️ by Rajan Jha**

