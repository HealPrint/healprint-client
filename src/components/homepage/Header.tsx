import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 sticky top-0 z-50 shadow-sm border-b backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HealPrint</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Services
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>
         
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
           <div className="hidden md:flex items-end space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-xl transition-all duration-300">
                Get Started
              </Button>
              </Link>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
