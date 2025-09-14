import { Link } from "react-router-dom";
import { Brain, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - Takes up more space */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-8">
              <img 
                src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" 
                alt="HealPrint Logo" 
                className="h-12 w-auto grayscale"
              />
              <span className="text-3xl font-bold text-black">HealPrint</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Intelligent health diagnostic platform powered by AI for personalized wellness guidance and expert referrals.
            </p>
            <div className="flex items-center text-blue-600 font-semibold text-lg group cursor-pointer">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-6 text-xl text-gray-900">Platform</h4>
                <ul className="space-y-4 text-gray-600">
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Health Chat</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Wellness Insights</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Expert Booking</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Health Tools</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-xl text-gray-900">Resources</h4>
                <ul className="space-y-4 text-gray-600">
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Getting Started</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Health Guide</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Success Stories</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Help Center</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-xl text-gray-900">Company</h4>
                <ul className="space-y-4 text-gray-600">
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">About</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Blog</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Careers</Link></li>
                  <li><Link to="#" className="hover:text-blue-600 transition-colors text-lg">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-200/60 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm">
              &copy; 2024 HealPrint. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
