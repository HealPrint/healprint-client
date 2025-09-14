import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 sticky top-0 z-50 shadow-sm border-b backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" 
              alt="HealPrint Logo" 
              className="h-6 sm:h-8 w-auto grayscale"
            />
            <span className="text-lg sm:text-2xl font-bold bg-black to-purple-600 bg-clip-text text-transparent">HealPrint</span>
          </div>
         
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}  
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
