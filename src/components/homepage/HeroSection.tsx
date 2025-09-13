import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  MessageCircle
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>AI-Powered Health Diagnostics</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              HealPrint:
            </span>
            <br />
            <span className="text-gray-800">
              AI Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Diagnostic Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect your skin and hair symptoms to internal health insights using AI. Get personalized wellness guidance, safe product recommendations, and expert referrals - turning beauty concerns into preventative health action 🌿
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Start Health Chat
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Learn More
              <MessageCircle className="w-5 h-5 ml-3" />
            </Button>
          </div>

          {/* Simple Trust Indicators */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trusted by Health Professionals</h3>
                <div className="flex items-center justify-center space-x-8 text-gray-600">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50K+</div>
                    <div className="text-sm">Health Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10K+</div>
                    <div className="text-sm">Users Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
