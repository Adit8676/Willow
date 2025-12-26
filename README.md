# Willow - Safe chat starts here

A modern realtime chat application built with MERN stack featuring advanced AI-powered content moderation, friend request system, and comprehensive user management.

**Live Demo**: [Try Willow Now](https://willow-production-9184.up.railway.app/)

## Features

- **Tech Stack**: MERN + Socket.io + TailwindCSS + DaisyUI
- **Authentication**: JWT-based auth with email OTP verification
- **Real-time Messaging**: Socket.io powered instant communication
- **Friend Request System**: Complete user discovery and friend management
- **AI Content Moderation**: Multi-provider toxicity detection and message filtering
- **Smart Filtering**: Fallback protection with rule-based filtering
- **User Status**: Online/offline status tracking
- **State Management**: Zustand for global state
- **Error Handling**: Comprehensive error handling on client and server
- **Production Ready**: Optimized for deployment

## Willow Walkthrough

### Welcome Landing Page
<img src="backend/public/screenshots/S1.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Clean and modern landing page showcasing Willow's core features and benefits*

### Account Registration
<img src="backend/public/screenshots/S2.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Streamlined signup process with email validation and secure authentication*

### Email OTP Verification
<img src="backend/public/screenshots/S3.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Two-factor authentication ensuring account security with email-based OTP*

### Profile Customization
<img src="backend/public/screenshots/S4.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Personalize your profile with custom avatars and personal information*

### Friend Discovery
<img src="backend/public/screenshots/S5.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Find and connect with users through intelligent search and friend requests*

### AI-Powered Content Moderation
<img src="backend/public/screenshots/S6.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Real-time message filtering with AI suggestions for safer communication*

### Rich Media Messaging
<img src="backend/public/screenshots/S7.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Support for text messages, images, and multimedia content sharing*

### AI Chat Assistant
<img src="backend/public/screenshots/S8.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Integrated AI assistant for enhanced user experience and support*

### Internationalization & UI Customization
<img src="backend/public/screenshots/S9.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Dynamic UI adaptation featuring multi-language support and 30+ customizable themes*

### Hindi Language Interface
<img src="backend/public/screenshots/S10.png"
     style="border-radius:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);" />

*Complete Hindi language support with native UI elements and cultural localization*

## Architecture Overview

### Backend Structure
```
backend/
├── src/
│   ├── controllers/        # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── services/          # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication middleware
│   ├── lib/              # Utilities (socket, db, cloudinary)
│   └── index.js          # Server entry point
├── package.json
└── .env.example
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route components
│   ├── store/            # Zustand state management
│   ├── lib/              # API utilities
│   └── App.jsx
├── package.json
└── vite.config.js
```

## Friend Request System

### Core Features
- **User Discovery**: Real-time user search functionality
- **Request Management**: Send, cancel, accept, and reject friend requests
- **Real-time Notifications**: Instant updates via Socket.io
- **Privacy Controls**: Chat access limited to friends only
- **Rate Limiting**: Spam prevention (5 requests per minute)

### Friend Request Workflow
1. User searches for other users in Discovery page
2. Sends friend request with optional message
3. Recipient receives real-time notification
4. Recipient can accept or reject the request
5. Upon acceptance, both users gain chat access

### API Endpoints

```bash
# Send friend request
POST /api/friends/request
Content-Type: application/json
{
  "recipientId": "user_id",
  "message": "Hi there!"
}

# Respond to friend request
POST /api/friends/request/respond
Content-Type: application/json
{
  "requestId": "request_id",
  "action": "accept"
}

# Get friends list
GET /api/friends/list

# Search users
GET /api/users/search?q=username
```

### Socket Events
- `friend:request_sent` - New friend request received
- `friend:request_update` - Request status changed
- `friends:list_updated` - Friend list modified

## AI Moderation System

### Moderation Pipeline
1. **Message Interception**: All messages analyzed before delivery
2. **Multi-Provider Detection**: Gemini, Groq, and Grok API integration
3. **Toxicity Analysis**: Advanced AI models detect harmful content
4. **Smart Rephrasing**: Suggests alternative phrasing for flagged content
5. **Fallback Protection**: Rule-based filtering when AI services unavailable
6. **Audit Logging**: Complete moderation event tracking

### Socket Events
- `send_message` - Client sends message for moderation
- `newMessage` - Clean messages broadcasted to recipients
- `message_blocked` - Toxic messages blocked with suggestions
- `message_sent` - Message delivery confirmation
- `message_error` - Error handling for failed processing

## Environment Configuration

### Required Environment Variables

```bash
# Database & Server
MONGODB_URI=mongodb://localhost:27017/willow
PORT=5001
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Moderation APIs
GEMINI_KEY_1=AIzaSyAAA...
GEMINI_KEY_2=AIzaSyBBB...
GEMINI_KEY_3=AIzaSyCCC...
GEMINI_API_KEY=AIzaSyAAA...
GROK_API_KEY=gsk_your_grok_key
GROQ_API_KEY=gsk_your_groq_key
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions

# Email Authentication (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

NODE_ENV=production
```

### API Key Setup

**Google Gemini API Keys**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create multiple API keys for load balancing
3. Add keys as GEMINI_KEY_1, GEMINI_KEY_2, etc.

**Groq API Key**
1. Go to [Groq Console](https://console.groq.com/keys)
2. Generate new API key
3. Set as GROQ_API_KEY

**Grok API Key**
1. Access [xAI Console](https://console.x.ai)
2. Create API key for Grok integration
3. Set as GROK_API_KEY

**Email Configuration**
1. Use Gmail with App Password authentication
2. EMAIL_USER: Gmail address
3. EMAIL_PASS: Gmail App Password (not regular password)

## Installation & Setup

### Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Build Application
```bash
npm run build
```

### Development Mode
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

### Production Mode
```bash
npm start
```

## Testing

### AI Moderation Testing
```bash
cd backend
node test-moderation.js
```

### Email OTP Testing
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Health Check
Visit `http://localhost:5001/health` to verify:
- Database connectivity
- AI API configuration status
- System health metrics

## Database Models

### User Model
- Profile information and authentication data
- Friend relationships and status
- Account settings and preferences

### Message Model
- Chat message content and metadata
- Sender/receiver information
- Timestamps and delivery status

### Friend Request Model
- Request status and lifecycle tracking
- Sender/recipient relationship data
- Request messages and timestamps

### Moderation Log Model
- AI moderation event tracking
- Toxicity scores and actions taken
- Original content and suggested alternatives

## Deployment

### Supported Platforms
- Heroku
- Railway
- Vercel
- Netlify
- AWS Amplify
- DigitalOcean App Platform

### Deployment Steps
1. Set up environment variables in platform dashboard
2. Configure build commands: `npm run build`
3. Set start command: `npm start`
4. Deploy from GitHub repository (private repos supported)

### Production Considerations
- Enable MongoDB Atlas for database hosting
- Configure CORS for production domains
- Set up SSL certificates
- Monitor AI API usage and quotas
- Implement proper logging and monitoring

## Troubleshooting

**AI Service Failures**
- Application automatically falls back to rule-based filtering
- Check `/health` endpoint for API status
- Verify API keys and quotas

**Connection Issues**
- Ensure correct port configuration
- Check firewall settings
- Verify Socket.io connection parameters

**Database Problems**
- Confirm MongoDB connection string
- Check database permissions
- Monitor connection pool status

**Email Delivery**
- Verify Gmail App Password setup
- Check spam folders for OTP emails
- Ensure EMAIL_USER and EMAIL_PASS are correct

