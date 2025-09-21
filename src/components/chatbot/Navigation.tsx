
import { Plus, Activity, Users, User, Clock, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatHistory } from "../../contexts/ChatHistoryContext";
import { useState } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewChat?: () => void;
  onSelectConversation?: (id: string) => void;
}

const Navigation = ({ activeTab, setActiveTab, onNewChat, onSelectConversation }: NavigationProps) => {
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const { 
    conversations, 
    currentConversationId, 
    deleteConversation,
    loadConversations,
    isLoading
  } = useChatHistory();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) { // 7 days
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleConversationClick = async (conversationId: string) => {
    if (onSelectConversation) {
      await onSelectConversation(conversationId);
    }
    setIsChatHistoryOpen(false);
  };

  const handleNewChatClick = async () => {
    if (onNewChat) {
      await onNewChat();
    }
    setIsChatHistoryOpen(false);
  };

  const navItems = [
    { id: "home", name: "Chat", icon: Plus },
    { id: "discover", name: "Wellness", icon: Activity },
    { id: "library", name: "Experts", icon: Users },
  ];

  return (
    <>
      {/* Fixed Navigation Icons - Always 80px wide */}
      <div className="w-20 bg-slate-50 border-r border-slate-200 flex flex-col shadow-sm fixed left-0 top-0 h-full z-30">
        {/* Logo */}
        <div 
          className="p-4 border-b border-slate-200 flex items-center justify-center cursor-pointer hover:bg-white/70 transition-colors"
          onClick={() => setActiveTab("home")}
        >
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
            <img 
              src="https://res.cloudinary.com/ecosheane/image/upload/v1758462243/Remifi_logo_wbl8fg.png" 
              alt="HealPrint Logo" 
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="p-2">
          <div className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => {
                    if (item.id === "home") {
                      setIsChatHistoryOpen(!isChatHistoryOpen);
                    } else {
                      setIsChatHistoryOpen(false);
                    }
                    setActiveTab(item.id);
                  }}
                >
                  <div className={`p-3 rounded-full transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-[#2F4F5F] text-white' 
                      : 'text-gray-600 hover:bg-[#2F4F5F]/10 hover:text-[#2F4F5F]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-1 font-medium transition-colors ${
                    activeTab === item.id 
                      ? 'text-[#2F4F5F]' 
                      : 'text-gray-600 group-hover:text-[#2F4F5F]'
                  }`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Spacer to push profile to bottom */}
        <div className="flex-1"></div>

        {/* Profile Icon */}
        <div className="p-2 border-t border-slate-200">
          <div 
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => {
              setIsChatHistoryOpen(false);
              setActiveTab("help");
            }}
          >
            <div className={`p-3 rounded-full transition-all duration-200 ${
              activeTab === "help" 
                ? 'bg-[#2F4F5F] text-white' 
                : 'text-gray-600 hover:bg-[#2F4F5F]/10 hover:text-[#2F4F5F]'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 font-medium transition-colors ${
              activeTab === "help" 
                ? 'text-[#2F4F5F]' 
                : 'text-gray-600 group-hover:text-[#2F4F5F]'
            }`}>
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Chat History Overlay - Only visible when expanded */}
      {isChatHistoryOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-10 z-40 animate-in fade-in duration-200"
            onClick={() => setIsChatHistoryOpen(false)}
          />
          
          {/* Chat History Panel */}
          <div className="fixed left-20 top-0 h-full w-48 bg-slate-50 border-r border-slate-200 z-50 flex flex-col transform transition-all duration-300 ease-out animate-in slide-in-from-left-4">
                   {/* Chat History Header */}
                   <div className="p-3 border-b bg-slate-50 border-slate-200">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-1">
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={handleNewChatClick}
                           className="text-[#2F4F5F] hover:bg-[#2F4F5F]/10 h-8 px-2 text-xs"
                         >
                           <Plus className="w-3 h-3 mr-1" />
                           New
                         </Button>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => loadConversations()}
                           className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                           disabled={isLoading}
                         >
                           <Clock className="w-3 h-3" />
                         </Button>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => setIsChatHistoryOpen(false)}
                           className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                         >
                           <X className="w-3 h-3" />
                         </Button>
                       </div>
                     </div>
                   </div>

                   {/* Chat History List - ChatGPT Style */}
                   <div className="flex-1 overflow-y-auto">
                     {isLoading ? (
                       <div className="p-4 text-center text-gray-500">
                         <div className="text-sm">Loading conversations...</div>
                       </div>
                     ) : conversations.length === 0 ? (
                       <div className="p-4 text-center text-gray-500">
                         <div className="text-sm">No conversations yet</div>
                         <div className="text-xs text-gray-400 mt-1">Start a new chat to begin</div>
                       </div>
                     ) : (
                       <div className="py-2">
                         {conversations.map((conversation) => (
                           <div
                             key={conversation.id}
                             className={`group relative px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-slate-100 ${
                               currentConversationId === conversation.id
                                 ? 'bg-slate-100 border-r-2 border-[#2F4F5F]'
                                 : ''
                             }`}
                             onClick={() => handleConversationClick(conversation.id)}
                           >
                             <div className="flex items-start justify-between">
                               <div className="flex-1 min-w-0">
                                 <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                                   {conversation.title}
                                 </h3>
                                 <p className="text-xs text-gray-500 truncate">
                                   {conversation.lastMessage}
                                 </p>
                                 <div className="flex items-center mt-1 text-xs text-gray-400">
                                   <Clock className="w-2 h-2 mr-1" />
                                   <span>{formatTime(conversation.timestamp)}</span>
                                 </div>
                               </div>
                               
                               {/* Delete Button */}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   deleteConversation(conversation.id);
                                 }}
                                 className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
                               >
                                 <Trash2 className="w-3 h-3" />
                               </button>
                             </div>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
