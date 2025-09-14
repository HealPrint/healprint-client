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
                <img 
                src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" 
                alt="HealPrint Logo" 
                className="h-8 w-auto grayscale"
              />
              <span className="text-2xl font-bold bg-black to-purple-600 bg-clip-text text-transparent">HealPrint</span>
            </div>
           
         
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}  
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
