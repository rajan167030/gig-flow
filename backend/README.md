# GigFlow Backend API

Backend API for GigFlow - A Premium Freelance Marketplace Platform

## Features

- User authentication and authorization
- Gig posting and management
- Bid submission and tracking
- User profiles and settings
- Real-time database operations with MongoDB
- RESTful API architecture

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or start in production mode:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login or register user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Gigs
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create new gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig
- `GET /api/gigs/user/:userId` - Get gigs by user

### Bids
- `GET /api/bids/gig/:gigId` - Get all bids for a gig
- `GET /api/bids/user/:userId` - Get all bids by a user
- `POST /api/bids` - Create new bid
- `PUT /api/bids/:id` - Update bid status
- `DELETE /api/bids/:id` - Delete bid (withdraw)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/settings` - Get user settings
- `PUT /api/users/:id/settings` - Update user settings
- `DELETE /api/users/:id` - Delete user account

### Health Check
- `GET /api/health` - API health check
- `GET /` - API information

## Database Schema

### User Schema
- name, email, role, bio, location
- skills, hourlyRate, timezone
- settings (notifications, privacy, appearance)
- totalEarned, totalSpent

### Gig Schema
- title, description, budget
- clientId, clientName, status
- category, skillsRequired, deadline
- bidsCount, assignedTo

### Bid Schema
- gigId, freelancerId, amount
- message, status, deliveryTime
- portfolio, attachments

## Environment Variables

See `.env.example` for all available environment variables.

## Project Structure

```
backend/
├── controllers/       # Request handlers
│   ├── authController.js
│   ├── gigController.js
│   ├── bidController.js
│   └── userController.js
├── models/           # Database models
│   ├── User.js
│   ├── Gig.js
│   └── Bid.js
├── routes/           # API routes
│   ├── auth.js
│   ├── gigs.js
│   ├── bids.js
│   └── users.js
├── .env             # Environment variables
├── .env.example     # Environment template
├── .gitignore       # Git ignore file
├── package.json     # Dependencies
└── server.js        # Entry point
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Error Handling

The API returns standardized error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Responses

Success responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
