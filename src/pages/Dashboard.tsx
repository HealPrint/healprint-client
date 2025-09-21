
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
import { ChatHistoryProvider } from "../contexts/ChatHistoryContext";
import { useChat } from "../hooks/chat";
import { useChatHistory } from "../contexts/ChatHistoryContext";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { startNewChat, loadConversation } = useChat();
  const { createNewConversation, loadConversations } = useChatHistory();

  const handleNewChat = async () => {
    // First clear the current chat state
    startNewChat();
    // Then create a new conversation in the backend
    await createNewConversation();
  };

  const handleConversationSwitch = async (conversationId: string) => {
    try {
      await loadConversation(conversationId);
      // Refresh the conversation list to show updated timestamps
      await loadConversations();
    } catch (error) {
      console.error('Dashboard: Error switching conversation:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNewChat={handleNewChat} onSelectConversation={handleConversationSwitch} />;
      case "discover":
        return <WellnessPage />;
      case "library":
        return <ExpertsPage />;
      case "help":
        return <SettingsPage />;
      default:
        return <HomePage onNewChat={handleNewChat} onSelectConversation={handleConversationSwitch} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu when tab changes
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile Top Navbar - ChatGPT style */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - ChatGPT menu icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          
          {/* Center - HealPrint branding */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://res.cloudinary.com/ecosheane/image/upload/v1756552072/Logo_jvn2t4.png" 
              alt="HealPrint Logo" 
              className="h-6 w-auto grayscale"
            />
            <h1 className="font-semibold text-gray-900 text-base">HealPrint</h1>
          </div>
          
          {/* Right side - ChatGPT new chat icon */}
          <button
            onClick={() => handleTabChange("home")}
            className="p-2 -mr-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Navigation Sidebar */}
      <div className="hidden lg:block">
             <Navigation 
               activeTab={activeTab} 
               setActiveTab={handleTabChange}
               onNewChat={handleNewChat}
               onSelectConversation={handleConversationSwitch}
             />
      </div>

      {/* Mobile Navigation Dropdown - ChatGPT style */}
      <div className={`fixed top-16 left-4 right-4 z-40 lg:hidden transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-2">
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-20">
        <div className="flex-1 pt-16 lg:pt-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <ChatHistoryProvider>
      <DashboardContent />
    </ChatHistoryProvider>
  );
};

export default Dashboard;
