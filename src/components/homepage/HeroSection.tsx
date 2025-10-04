import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MessageCircle,
  Stethoscope,
  Heart,
  Shield,
  Users,
  Star,
  CheckCircle,
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
      <link rel="preload" as="image" href="/assets/christin-hume-0MoF-Fe0w0A-unsplash_ukakzp.jpg" />
      <link rel="preload" as="image" href="/assets/medical-banner-with-doctor-wearing-goggles_uaauiy.jpg" />
      <link rel="preload" as="image" href="/assets/woman-with-tablet-device-illustrating-min_zvux1l.jpg" />
      
      <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h4 
            className="text-3xl font-md text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
           Curious about your health?
          </motion.h4>
         
          
          {/* Chat Input Interface */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Ask about your health concerns or symptoms..."
                className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <motion.button 
                onClick={goToChatOrLogin} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            <motion.p 
              className="text-sm text-gray-500 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Try: "I have a rash on my arm" or "What causes hair loss?"
            </motion.p>
          </motion.div>
          </motion.div>
          
        {/* Feature Showcase Cards with Image Backgrounds */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {/* AI Analysis Card */}
          <motion.div 
            className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Image Background */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/assets/christin-hume-0MoF-Fe0w0A-unsplash_ukakzp.jpg" 
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
          </motion.div>

          {/* Expert Consultation Card */}
          <motion.div 
            className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          >
            {/* Image Background */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/assets/medical-banner-with-doctor-wearing-goggles_uaauiy.jpg" 
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
          </motion.div>
        </motion.div>

        {/* How HealPrint Works */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-md text-gray-900 mb-4">How HealPrint Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform combines advanced diagnostics with expert human insight to deliver comprehensive health solutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Step 1 - Upload & Analyze */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
            >
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/assets/woman-with-tablet-device-illustrating-min_zvux1l.jpg" 
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
            </motion.div>

            {/* Step 2 - Expert Review */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
            >
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/assets/portrait-african-american-practitioner-doctor-working-hospital-office_eig706.jpg" 
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
            </motion.div>

            {/* Step 3 - Track & Monitor */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
            >
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/assets/retinal-biometrics-technology-with-man-s-eye-digital-remix-min_dhuks8.jpg" 
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
            </motion.div>
          </motion.div>
        </motion.div>


      </div>
    </div>
    </>
  );
};

export default HeroSection;
