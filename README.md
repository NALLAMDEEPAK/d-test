# CodePro - OAuth Integrated Coding Platform

A full-stack application with NestJS backend and React frontend featuring Google OAuth authentication, protected routes, and email functionality.

## 🚀 Features

### Backend (NestJS)
- **Google OAuth 2.0 Integration** using passport-google-oauth20
- **JWT Authentication** with secure token generation
- **Route Guards** protecting sensitive endpoints
- **Email Service** using Google OAuth tokens for SMTP
- **User Management** with in-memory storage (easily replaceable with database)
- **RESTful API** with proper error handling

### Frontend (React + TypeScript)
- **Google Sign-In** with OAuth client integration
- **Protected Routes** with JWT token validation
- **Secure Token Storage** in localStorage
- **Interactive Code Editor** for practice
- **Email Invitation System** with rich templates
- **Mock Interview Platform** with video chat simulation
- **Responsive Design** with Tailwind CSS
- **Dark/Light Theme** support

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Google Cloud Console project with OAuth 2.0 credentials

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/google/callback`
7. Note down your Client ID and Client Secret

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
# In the root directory, copy environment file
cp .env.example .env

# Edit .env file
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 4. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run backend:install
```

### 5. Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev

# Or run them separately:
# Backend: npm run dev:backend
# Frontend: npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 🔐 Authentication Flow

1. User clicks "Continue with Google" on login page
2. Redirected to Google OAuth consent screen
3. After approval, Google redirects to backend callback
4. Backend validates OAuth response and creates/updates user
5. Backend generates JWT token and redirects to frontend with token
6. Frontend stores token and user data securely
7. Protected routes check for valid JWT token

## 📧 Email Functionality

The email service uses the user's Google OAuth access token to send emails through Gmail API:

1. User must be authenticated with Google OAuth
2. OAuth scope includes Gmail send permissions
3. Emails are sent using the authenticated user's Gmail account
4. Rich HTML templates with interview details
5. Professional styling with CodePro branding

## 🛡️ Security Features

- **JWT Token Validation** on all protected routes
- **OAuth 2.0** for secure authentication
- **CORS Configuration** for cross-origin requests
- **Input Validation** using class-validator
- **Error Handling** with proper HTTP status codes
- **Token Expiration** handling with automatic logout

## 🎨 UI/UX Features

- **Responsive Design** works on all device sizes
- **Dark/Light Theme** with system preference detection
- **Loading States** for better user experience
- **Error Handling** with user-friendly messages
- **Interactive Components** with hover effects and animations
- **Professional Styling** with Tailwind CSS

## 📁 Project Structure

```
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── email/          # Email service
│   │   └── main.ts         # Application entry point
│   └── package.json
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── App.tsx            # Main app component
└── package.json           # Root package.json
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Build the application: `npm run build`
3. Start the production server: `npm run start:prod`

### Frontend Deployment
1. Set environment variables for production API URL
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 🔧 Environment Variables

### Backend (.env)
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_callback_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=your_frontend_url
```

### Frontend (.env)
```env
VITE_API_URL=your_backend_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 📝 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/verify` - Verify JWT token (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Email
- `POST /api/email/send-invite` - Send interview invitation (protected)

### User
- `GET /api/user/profile` - Get user profile (protected)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.