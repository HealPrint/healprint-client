/**
 * Chat and Conversation Types
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  message_id: string;
  assessment_stage: string;
  symptoms_collected: Record<string, any>;
  needs_diagnosis: boolean;
  error?: string;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  message_id?: string;
}

export interface ConversationHistory {
  conversation_id: string;
  messages: Message[];
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationSummary {
  conversation_id: string;
  title: string;
  last_message: string;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatHistoryContextType {
  conversations: ConversationSummary[];
  currentConversationId: string | null;
  isLoading: boolean;
  loadConversations: () => Promise<void>;
  createNewConversation: () => Promise<string | null>;
  setCurrentConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => Promise<boolean>;
  refreshConversations: () => Promise<void>;
}

