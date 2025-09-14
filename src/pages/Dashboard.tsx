
import { useState } from "react";
import { Menu, X, Plus, Activity, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Navigation, 
  HomePage, 
  WellnessPage, 
  ExpertsPage, 
  SettingsPage 
} from "@/components/chatbot";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "discover":
        return <WellnessPage />;
      case "library":
        return <ExpertsPage />;
      case "help":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu when tab changes
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md hover:bg-gray-50"
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Navigation Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-30">
        <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`fixed top-16 left-4 right-4 z-50 lg:hidden transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="flex justify-around space-x-4">
            {[
              { id: "home", name: "Chat", icon: Plus },
              { id: "discover", name: "Wellness", icon: Activity },
              { id: "library", name: "Experts", icon: Users },
              { id: "help", name: "Profile", icon: User }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-20 w-full">
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
