
import { Plus, Activity, Users, User } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "home", name: "Chat", icon: Plus },
    { id: "discover", name: "Wellness", icon: Activity },
    { id: "library", name: "Experts", icon: Users },
  ];

  return (
    <div className="w-20 lg:w-20 bg-slate-50 border-r border-slate-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div 
        className="p-4 border-b border-slate-200 flex items-center justify-center bg-white/50 cursor-pointer hover:bg-white/70 transition-colors"
        onClick={() => setActiveTab("home")}
      >
        <img 
          src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" 
          alt="HealPrint Logo" 
          className="h-8 w-auto grayscale"
        />
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setActiveTab(item.id)}
              >
                <div className={`p-3 rounded-full transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gray-300 text-gray-700' 
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'text-gray-700' 
                    : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Spacer to push profile to extreme bottom */}
      <div className="flex-1"></div>

      <div className="p-2 pb-4 border-t mt-20 border-slate-200 bg-white/30">
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setActiveTab("help")}
        >
          <div className={`p-3 rounded-full transition-all duration-200 ${
            activeTab === "help" 
              ? 'bg-gray-300 text-gray-700' 
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'
          }`}>
            <User className="w-6 h-6" />
          </div>
          <span className={`text-xs mt-2 font-medium transition-colors ${
            activeTab === "help" 
              ? 'text-gray-700' 
              : 'text-gray-600 group-hover:text-gray-700'
          }`}>
            Profile
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
