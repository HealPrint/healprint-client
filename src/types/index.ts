/**
 * Centralized Type Exports
 * 
 * Import types from this file throughout the application:
 * import { User, ChatMessage, Product } from '@/types';
 */

// Auth types
export type {
  User,
  LoginCredentials,
  SignupData,
  AuthResponse,
  AuthContextType,
} from './auth.types';

// Chat types
export type {
  ChatMessage,
  ChatResponse,
  Message,
  ConversationHistory,
  ConversationSummary,
  ChatHistoryContextType,
} from './chat.types';

// Marketplace types
export type {
  Product,
  CartItem,
  OrderData,
  FilterOptions,
  MarketplaceState,
  MarketplaceContextType,
} from './marketplace.types';

// Common types
export type {
  ApiError,
  Config,
  ToastProps,
  HealthProfile,
} from './common.types';

