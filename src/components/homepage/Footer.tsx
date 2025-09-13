import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-white/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HealPrint</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Intelligent health diagnostic platform powered by AI for personalized wellness guidance and expert referrals.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Platform</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Health Chat</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Wellness Insights</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Expert Booking</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Health Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Resources</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Getting Started</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Health Guide</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Success Stories</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900">Company</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; 2024 HealPrint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
