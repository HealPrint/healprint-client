# HealPrint AI - Digital Health Platform

<div align="center">
  <img src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" alt="HealPrint Logo" width="120" height="120" />
  
  <h3>AI-Powered Health Analysis & Expert Consultation Platform</h3>
  
  <p>Connect internal health symptoms with external skin and hair problems using advanced AI diagnostics and expert medical consultations.</p>
</div>

## 🌟 Overview

HealPrint is a comprehensive digital health platform that combines AI-powered symptom analysis with expert medical consultations. Our platform helps users understand the connection between internal health conditions and external symptoms like skin issues and hair problems.

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Symptom Analysis**: Upload photos of skin or hair concerns for instant AI analysis
- **Pattern Recognition**: Advanced AI identifies complex symptom patterns and root causes
- **Holistic Health Assessment**: Connects internal health (hormones, nutrition, stress) with external symptoms
- **Real-time Chat Interface**: Interactive AI health agent for comprehensive health discussions

### 👨‍⚕️ Expert Consultations
- **Certified Professionals**: Connect with dermatologists, nutritionists, and health coaches
- **Personalized Treatment Plans**: Get tailored advice and follow-up care recommendations
- **Direct Booking**: Easy scheduling and consultation management
- **Expert Matching**: AI-powered matching with the right health professional

### 📊 Health Monitoring
- **Progress Tracking**: Monitor your wellness journey with personalized health reminders
- **Health Insights**: Deep analysis connecting external symptoms to internal health conditions
- **Product Recommendations**: Safe, personalized product suggestions based on your health profile
- **Wellness Tips**: Ongoing recommendations for improved health

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components for accessible UI elements
- **React Router** for navigation
- **React Query** for state management
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend (Microservices)
- **Python** with FastAPI
- **Docker** containerization
- **Microservices Architecture**:
  - User Service (Port 8001)
  - Chat Service (Port 8002) 
  - Diagnostic Service (Port 8003)
  - API Gateway (Port 8000)

### AI Integration
- **OpenAI GPT-4o** through OpenRouter
- **Advanced Pattern Recognition**
- **Medical Knowledge Base**
- **Conversation Management**

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+
- Docker (optional)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healprint/healprint-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   # Development mode
   npm run dev
   
   # Local development with backend
   npm run dev:local
   ```

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd healprint/healprint-server
   ```

2. **Start with Docker Compose (Recommended)**
   ```bash
   docker-compose up --build
   ```

3. **Or start individual services**
   ```bash
   # Terminal 1 - User Service
   cd user-service
   pip install -r requirements.txt
   python main.py

   # Terminal 2 - Chat Service  
   cd chat-service
   pip install -r requirements.txt
   python main.py

   # Terminal 3 - Diagnostic Service
   cd diagnostic-service
   pip install -r requirements.txt
   python main.py

   # Terminal 4 - API Gateway
   cd api-gateway
   pip install -r requirements.txt
   python main.py
   ```

## 📱 Application Structure

### Landing Page
- **Hero Section**: Interactive health query interface
- **Features Showcase**: AI Analysis and Expert Consultation cards
- **How It Works**: Step-by-step process explanation
- **Call-to-Action**: Download and get started

### Dashboard (Protected Route)
- **Home**: Main chat interface with AI health agent
- **Wellness**: Health monitoring and insights
- **Experts**: Browse and connect with health professionals
- **Settings**: User preferences and account management

### Key Components
- **Chat Interface**: Real-time AI conversation
- **Authentication**: Login/Signup with protected routes
- **Navigation**: Responsive sidebar navigation
- **UI Components**: Comprehensive design system with Radix UI

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run dev:local        # Start with local backend

# Building
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
```

## 🌐 API Endpoints

### User Service (Port 8001)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile/{user_id}` - Get user profile

### Chat Service (Port 8002)
- `POST /chat` - Send message to AI
- `GET /conversation/{conversation_id}` - Get conversation history

### Diagnostic Service (Port 8003)
- `POST /analyze` - Analyze symptoms
- `GET /patterns` - Get diagnostic patterns

### API Gateway (Port 8000)
- `GET /health` - Health check for all services

## 🎨 Design System

The application uses a comprehensive design system built with:
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Custom Components** for HealPrint-specific UI elements
- **Responsive Design** for mobile and desktop
- **Dark/Light Mode** support (planned)

## 🔒 Security Features

- **Protected Routes**: Authentication required for dashboard access
- **Token-based Auth**: Secure user authentication
- **CORS Handling**: Proper cross-origin request handling
- **Input Validation**: Zod schema validation for all forms
- **Medical Safety**: AI never provides medical diagnoses, always recommends professional consultation

## 🚀 Deployment

### Frontend Deployment
```bash
# Build the application
npm run build

# The dist/ folder contains the production build
# Deploy to your preferred hosting platform (Vercel, Netlify, etc.)
```

### Backend Deployment
```bash
# Using Docker Compose
docker-compose up --build -d

# Or deploy individual services to cloud platforms
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@healprint.com or join our Discord community.

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI models for specific health conditions
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Telemedicine video consultations
- [ ] Health data export and integration
- [ ] Advanced analytics and insights

---

<div align="center">
  <p>Built with ❤️ by the HealPrint Team</p>
  <p>Making health insights accessible to everyone</p>
</div>