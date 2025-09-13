
import { useState } from "react";
import { 
  Navigation, 
  HomePage, 
  WellnessPage, 
  ExpertsPage, 
  SettingsPage 
} from "@/components/chatbot";



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

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

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Fixed Left Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="flex-1 flex flex-col ml-20">
        <div className="flex-1">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
