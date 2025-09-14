// HealPrint AI Backend Service Integration
import { getApiUrl } from '../config';

const API_BASE_URL = getApiUrl();

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

export interface ConversationHistory {
  conversation_id: string;
  messages: Array<{
    id: string;
    user_message: string;
    ai_response: string;
    timestamp: string;
  }>;
}

export class HealPrintService {
  private static userId = 'user_' + Math.random().toString(36).substr(2, 9);
  private static currentConversationId: string | null = null;
  
  // Initialize user ID once and keep it consistent
  static {
    // Try to get existing user ID from localStorage, or create new one
    const storedUserId = localStorage.getItem('healprint_user_id');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      localStorage.setItem('healprint_user_id', this.userId);
    }
    
    // Try to get existing conversation ID from localStorage
    const storedConversationId = localStorage.getItem('healprint_conversation_id');
    if (storedConversationId) {
      this.currentConversationId = storedConversationId;
    }
  }

  static async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user_id: this.userId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store conversation ID for future use
      this.currentConversationId = data.conversation_id;
      localStorage.setItem('healprint_conversation_id', data.conversation_id);
      
      return data;
    } catch (error) {
      console.error('HealPrint API Error:', error);
      return {
        response: '',
        conversation_id: '',
        message_id: '',
        assessment_stage: 'error',
        symptoms_collected: {},
        needs_diagnosis: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async getConversationHistory(conversationId: string): Promise<ConversationHistory | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return null;
    }
  }

  static async analyzeConversation(conversationId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      return null;
    }
  }

  static async getConversationSummary(conversationId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}/summary`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversation summary:', error);
      return null;
    }
  }

  static getCurrentConversationId(): string | null {
    return this.currentConversationId;
  }

  static resetConversation(): void {
    this.currentConversationId = null;
    // Clear the conversation from localStorage
    localStorage.removeItem('healprint_conversation_id');
  }
  
  static getUserId(): string {
    return this.userId;
  }
}