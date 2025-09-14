# Authentication Setup

## Backend Service

The authentication system connects to the user service running on port 8001.

### To start the backend:

1. Navigate to the user service directory:
   ```bash
   cd healprint-server/user-service
   ```

2. Install dependencies (if not already installed):
   ```bash
   pip install fastapi uvicorn
   ```

3. Start the user service:
   ```bash
   python main.py
   ```

The service will be available at `http://localhost:8001`

## Frontend Features

### Authentication Flow:
- **Login/Signup**: Single form that toggles between login and signup modes
- **Form Validation**: Email, password, and name (for signup) validation
- **Error Handling**: User-friendly error messages via toast notifications
- **Loading States**: Visual feedback during authentication requests
- **Protected Routes**: Dashboard requires authentication
- **Auto-login**: Users stay logged in across browser sessions

### API Endpoints Used:
- `POST /login` - User login
- `POST /register` - User registration
- `GET /profile/{user_id}` - Get user profile

### Security Features:
- JWT-like token storage in localStorage
- Protected route component
- Automatic token validation
- Secure API calls with proper headers

## Usage

1. Start the backend service (port 8001)
2. Start the frontend development server
3. Navigate to `/login` to access the authentication form
4. Toggle between "Log in" and "Sign up" modes
5. After successful authentication, users are redirected to `/dashboard`

## Notes

- This is an MVP implementation with in-memory storage
- Passwords are stored in plain text (not recommended for production)
- Google OAuth is placeholder (shows "Coming Soon" message)
- Token format is simplified for demo purposes
