import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HealPrintService } from '../api/openaiService';
import type { ConversationSummary } from '@/types';

export interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatHistoryContextType {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  addConversation: (conversation: ChatConversation) => void;
  updateConversation: (id: string, updates: Partial<ChatConversation>) => void;
  deleteConversation: (id: string) => void;
  setCurrentConversation: (id: string | null) => void;
  loadConversations: () => Promise<void>;
  createNewConversation: () => Promise<string | null>;
  isLoading: boolean;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
};

interface ChatHistoryProviderProps {
  children: ReactNode;
}

export const ChatHistoryProvider: React.FC<ChatHistoryProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load conversations from backend on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const backendConversations = await HealPrintService.getUserConversations();
      const convertedConversations: ChatConversation[] = backendConversations.map(conv => ({
        id: conv.conversation_id,
        title: conv.title,
        lastMessage: conv.last_message,
        timestamp: new Date(conv.updated_at),
        messageCount: conv.message_count
      }));
      setConversations(convertedConversations);
    } catch (error) {
      console.error('Error loading conversations from backend:', error);
      // Fallback to localStorage if backend fails
      const savedConversations = localStorage.getItem('healprint_chat_history');
      if (savedConversations) {
        try {
          const parsed = JSON.parse(savedConversations);
          const conversationsWithDates = parsed.map((conv: any) => ({
            ...conv,
            timestamp: new Date(conv.timestamp)
          }));
          setConversations(conversationsWithDates);
        } catch (error) {
          console.error('Error loading chat history from localStorage:', error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addConversation = (conversation: ChatConversation) => {
    setConversations(prev => [conversation, ...prev]);
    // Also save to localStorage as backup
    const updatedConversations = [conversation, ...conversations];
    localStorage.setItem('healprint_chat_history', JSON.stringify(updatedConversations));
  };

  const updateConversation = (id: string, updates: Partial<ChatConversation>) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, ...updates } : conv
      )
    );
    // Update localStorage as well
    const updatedConversations = conversations.map(conv => 
      conv.id === id ? { ...conv, ...updates } : conv
    );
    localStorage.setItem('healprint_chat_history', JSON.stringify(updatedConversations));
  };

  const setCurrentConversation = (id: string | null) => {
    setCurrentConversationId(id);
  };

  const deleteConversation = async (id: string) => {
    try {
      const success = await HealPrintService.deleteConversation(id);
      if (success) {
        setConversations(prev => prev.filter(conv => conv.id !== id));
        if (currentConversationId === id) {
          setCurrentConversationId(null);
        }
        // Update localStorage
        const updatedConversations = conversations.filter(conv => conv.id !== id);
        localStorage.setItem('healprint_chat_history', JSON.stringify(updatedConversations));
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const createNewConversation = async (): Promise<string | null> => {
    try {
      const conversationId = await HealPrintService.createNewConversation();
      if (conversationId) {
        setCurrentConversationId(conversationId);
        // Reload conversations to get the new one
        await loadConversations();
      }
      return conversationId;
    } catch (error) {
      console.error('Error creating new conversation:', error);
      return null;
    }
  };

  const value: ChatHistoryContextType = {
    conversations,
    currentConversationId,
    addConversation,
    updateConversation,
    deleteConversation,
    setCurrentConversation,
    loadConversations,
    createNewConversation,
    isLoading,
  };

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};