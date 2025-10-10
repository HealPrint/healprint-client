/**
 * Marketplace and Product Types
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  description?: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  size?: string;
  inStock?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  category: string;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-low' | 'price-high' | 'name' | 'rating' | '';
  brands: string[];
  inStockOnly: boolean;
}

export interface MarketplaceState {
  cart: CartItem[];
  wishlist: number[];
  orders: OrderData[];
  currentOrder: OrderData | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderConfirmationOpen: boolean;
}

export interface MarketplaceContextType {
  state: MarketplaceState;
  dispatch: React.Dispatch<any>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  placeOrder: (orderData: Omit<OrderData, 'id' | 'date'>) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

