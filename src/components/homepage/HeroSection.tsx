import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight, 
  MessageCircle,
  Stethoscope,
  Heart,
  Shield,
  Users,
  Star,
  CheckCircle,
  Play,
  ExternalLink,
  Upload,
  Eye,
  BarChart3,
  FileText,
  UserCheck,
  TrendingUp
} from "lucide-react";

const HeroSection = () => {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const goToChatOrLogin = () => {
    if (!query.trim()) return;
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToChatOrLogin();
    }
  };
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center&auto=format&q=80" />
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop&crop=center&auto=format&q=80" />
      <link rel="preload" as="video" href="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=165&oauth2_token_id=57447761" />
      
      <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h4 className="text-3xl font-md text-gray-900 mb-6 leading-tight">
           Curious about your health?
          </h4>
         
          
          {/* Chat Input Interface */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about your health concerns or symptoms..."
                className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={goToChatOrLogin} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors duration-200">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Try: "I have a rash on my arm" or "What causes hair loss?"
            </p>
          </div>
          </div>
          
        {/* Feature Showcase Cards with Image Backgrounds */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* AI Analysis Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer">
            {/* Image Background */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ecosheane/image/upload/v1757844632/christin-hume-0MoF-Fe0w0A-unsplash_ukakzp.jpg" 
                alt="AI Analysis" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Content Below Image */}
            <div className="p-6 pl-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-left">AI Symptom Analysis</h3>
              <p className="text-gray-600 text-left leading-relaxed mb-4">
                Upload photos of skin or hair concerns and receive instant AI-powered analysis with potential causes, severity assessment, and personalized recommendations.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                Try AI Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Expert Consultation Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer">
            {/* Image Background */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ecosheane/image/upload/v1754217273/medical-banner-with-doctor-wearing-goggles_uaauiy.jpg" 
                alt="Expert Consultation" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Content Below Image */}
            <div className="p-6 pl-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-left">Expert Consultations</h3>
              <p className="text-gray-600 text-left leading-relaxed mb-4">
                Connect with certified dermatologists and health professionals for personalized advice, treatment plans, and follow-up care.
              </p>
              <div className="flex items-center text-green-600 font-semibold text-lg group-hover:text-green-700 transition-colors">
                Book Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* How HealPrint Works */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-md text-gray-900 mb-4">How HealPrint Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform combines advanced diagnostics with expert human insight to deliver comprehensive health solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 - Upload & Analyze */}
            <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer">
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/ecosheane/image/upload/v1754218524/woman-with-tablet-device-illustrating-min_zvux1l.jpg" 
                  alt="Upload & Analyze" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              
              {/* Content Below Image */}
              <div className="p-6 pl-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-left">Upload & Analyze</h3>
                <p className="text-gray-600 text-left leading-relaxed">
                  Upload photos of your skin or hair concerns. Our AI analyzes symptoms and provides instant preliminary insights.
                </p>
              </div>
                  </div>

            {/* Step 2 - Expert Review */}
            <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer">
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&crop=center&auto=format&q=80" 
                  alt="Expert Review" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                  </div>
              
              {/* Content Below Image */}
              <div className="p-6 pl-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-left">Expert Review</h3>
                <p className="text-gray-600 text-left leading-relaxed">
                  Certified professionals review your case and provide detailed analysis, treatment recommendations, and next steps.
                </p>
                  </div>
                </div>

            {/* Step 3 - Track & Monitor */}
            <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer">
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/ecosheane/image/upload/v1754218502/retinal-biometrics-technology-with-man-s-eye-digital-remix-min_dhuks8.jpg" 
                  alt="Track & Monitor" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              
              {/* Content Below Image */}
              <div className="p-6 pl-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-left">Track & Monitor</h3>
                <p className="text-gray-600 text-left leading-relaxed">
                  Monitor your progress with personalized tracking, follow-up consultations, and ongoing wellness recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    </>
  );
};

export default HeroSection;
