import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Product, CartItem, OrderData, MarketplaceState } from '@/types';

// Actions
type MarketplaceAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: number }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'ADD_ORDER'; payload: OrderData }
  | { type: 'SET_CURRENT_ORDER'; payload: OrderData | null }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CHECKOUT' }
  | { type: 'CLOSE_CHECKOUT' }
  | { type: 'OPEN_ORDER_CONFIRMATION' }
  | { type: 'CLOSE_ORDER_CONFIRMATION' };

// Initial State
const initialState: MarketplaceState = {
  cart: [],
  wishlist: [],
  orders: [],
  currentOrder: null,
  isCartOpen: false,
  isCheckoutOpen: false,
  isOrderConfirmationOpen: false,
};

// Reducer
function marketplaceReducer(state: MarketplaceState, action: MarketplaceAction): MarketplaceState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        brand: product.brand,
        category: product.category,
      };
      
      return {
        ...state,
        cart: [...state.cart, newCartItem],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload),
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
        currentOrder: action.payload,
      };
    
    case 'SET_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: action.payload,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    
    case 'OPEN_CHECKOUT':
      return {
        ...state,
        isCheckoutOpen: true,
        isCartOpen: false,
      };
    
    case 'CLOSE_CHECKOUT':
      return {
        ...state,
        isCheckoutOpen: false,
      };
    
    case 'OPEN_ORDER_CONFIRMATION':
      return {
        ...state,
        isOrderConfirmationOpen: true,
        isCheckoutOpen: false,
      };
    
    case 'CLOSE_ORDER_CONFIRMATION':
      return {
        ...state,
        isOrderConfirmationOpen: false,
        currentOrder: null,
      };
    
    default:
      return state;
  }
}

// Context
interface MarketplaceContextType {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
  // Helper functions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  completeOrder: (orderData: OrderData) => void;
  openOrderConfirmation: () => void;
  closeOrderConfirmation: () => void;
  // Computed values
  cartItemCount: number;
  cartTotal: number;
  isInWishlist: (productId: number) => boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// Provider
interface MarketplaceProviderProps {
  children: ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  // Helper functions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (productId: number) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCheckout = () => {
    dispatch({ type: 'OPEN_CHECKOUT' });
  };

  const closeCheckout = () => {
    dispatch({ type: 'CLOSE_CHECKOUT' });
  };

  const completeOrder = (orderData: OrderData) => {
    dispatch({ type: 'ADD_ORDER', payload: orderData });
    dispatch({ type: 'OPEN_ORDER_CONFIRMATION' });
  };

  const openOrderConfirmation = () => {
    dispatch({ type: 'OPEN_ORDER_CONFIRMATION' });
  };

  const closeOrderConfirmation = () => {
    dispatch({ type: 'CLOSE_ORDER_CONFIRMATION' });
  };

  // Computed values
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const isInWishlist = (productId: number) => {
    return state.wishlist.includes(productId);
  };

  const value: MarketplaceContextType = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    toggleCart,
    openCheckout,
    closeCheckout,
    completeOrder,
    openOrderConfirmation,
    closeOrderConfirmation,
    cartItemCount,
    cartTotal,
    isInWishlist,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

// Hook
export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

// Re-export types for backward compatibility
export type { Product, CartItem, OrderData };

export default MarketplaceProvider;
