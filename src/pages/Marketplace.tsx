import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { 
  ProductCard, 
  ProductFilters, 
  Cart, 
  Checkout, 
  OrderConfirmation,
  MarketplaceProvider,
  useMarketplace,
  type Product,
  type CartItem,
  type OrderData
} from '../components/marketplace';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Search, 
  Filter, 
  Grid, 
  List,
  SlidersHorizontal,
  TrendingUp,
  Shield,
  Truck
} from "lucide-react";

// Main marketplace content component
const MarketplaceContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    openCheckout,
    completeOrder,
    closeOrderConfirmation,
    cartItemCount,
    isInWishlist
  } = useMarketplace();

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    priceRange: [0, 1000] as [number, number],
    rating: 0,
    brands: [] as string[],
    availability: [] as string[],
    features: [] as string[],
    sortBy: 'featured'
  });

  const products: Product[] = [
    {
      id: 1,
      name: "Hyaluronic Acid Serum",
      brand: "SkinGlow",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "skincare",
      discount: 29,
      isNew: false,
      isBestSeller: true,
      description: "Deeply hydrating serum with 2% hyaluronic acid for plump, youthful skin",
      ingredients: ["Hyaluronic Acid", "Vitamin C", "Niacinamide"],
      benefits: ["Deep hydration", "Reduces fine lines", "Improves skin texture"],
      usage: "Apply morning and evening after cleansing",
      size: "30ml",
      inStock: true
    },
    {
      id: 2,
      name: "Biotin Hair Growth Vitamins",
      brand: "HairVital",
      price: 18.50,
      originalPrice: 25.00,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "hair-care",
      discount: 26,
      isNew: true,
      isBestSeller: false,
      description: "Essential vitamins for stronger, thicker hair growth",
      ingredients: ["Biotin", "Folic Acid", "Zinc"],
      benefits: ["Promotes hair growth", "Strengthens hair", "Reduces hair loss"],
      usage: "Take 2 capsules daily with food",
      size: "60 capsules",
      inStock: true
    },
    {
      id: 3,
      name: "Omega-3 Skin Health Capsules",
      brand: "NutriSkin",
      price: 28.75,
      originalPrice: 35.00,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "supplements",
      discount: 18,
      isNew: false,
      isBestSeller: false,
      description: "Essential fatty acids for healthy skin from within",
      ingredients: ["Omega-3", "Vitamin E", "Antioxidants"],
      benefits: ["Skin hydration", "Reduces inflammation", "Anti-aging"],
      usage: "Take 2 capsules daily with meals",
      size: "90 capsules",
      inStock: true
    },
    {
      id: 4,
      name: "Gentle Cleansing Foam",
      brand: "PureFace",
      price: 15.99,
      originalPrice: 22.00,
      rating: 4.5,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "skincare",
      discount: 27,
      isNew: true,
      isBestSeller: false,
      description: "Gentle foaming cleanser for all skin types",
      ingredients: ["Glycerin", "Chamomile", "Aloe Vera"],
      benefits: ["Gentle cleansing", "Moisturizing", "Suitable for sensitive skin"],
      usage: "Use morning and evening, massage gently and rinse",
      size: "150ml",
      inStock: true
    },
    {
      id: 5,
      name: "Collagen Hair Mask",
      brand: "HairVital",
      price: 22.50,
      originalPrice: 30.00,
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "hair-care",
      discount: 25,
      isNew: false,
      isBestSeller: true,
      description: "Intensive treatment mask for damaged and weak hair"
    },
    {
      id: 6,
      name: "Probiotic Skin Support",
      brand: "GutGlow",
      price: 35.99,
      originalPrice: 45.00,
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "supplements",
      discount: 20,
      isNew: true,
      isBestSeller: false,
      description: "Probiotic blend for healthy gut and clear skin"
    },
    {
      id: 7,
      name: "Niacinamide Oil Control",
      brand: "ClearSkin",
      price: 19.99,
      originalPrice: 28.00,
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "skincare",
      discount: 29,
      isNew: false,
      isBestSeller: false,
      description: "Controls oil production and minimizes pores"
    },
    {
      id: 8,
      name: "Keratin Hair Treatment",
      brand: "HairVital",
      price: 38.00,
      originalPrice: 50.00,
      rating: 4.8,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      category: "hair-care",
      discount: 24,
      isNew: false,
      isBestSeller: true,
      description: "Professional keratin treatment for smooth, shiny hair"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'hair-care', label: 'Hair Care' },
    { value: 'supplements', label: 'Supplements' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleViewDetails = (product: Product) => {
    // In a real app, this would open a product detail modal or navigate to product page
    console.log('View product details:', product);
  };

  const handleCheckout = () => {
    openCheckout();
  };

  const handleOrderComplete = (orderData: OrderData) => {
    completeOrder(orderData);
  };

  // Show different components based on state
  if (state.isOrderConfirmationOpen && state.currentOrder) {
    return (
      <div className="min-h-screen">
        <Header />
        <OrderConfirmation 
          orderData={state.currentOrder}
          onContinueShopping={() => closeOrderConfirmation()}
        />
        <Footer />
      </div>
    );
  }

  if (state.isCheckoutOpen) {
    return (
      <div className="min-h-screen">
        <Header />
        <Checkout 
          cartItems={state.cart}
          onOrderComplete={handleOrderComplete}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-md text-gray-900">Health Marketplace</h1>
                <p className="text-gray-600 mt-1">Discover products recommended by our health experts</p>
              </div>
              
              {/* Cart Button */}
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => openCheckout()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={cartItemCount === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cartItemCount})
                </Button>
              </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{filteredProducts.length}</div>
            <div className="text-sm text-gray-600">Products Found</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">25%</div>
            <div className="text-sm text-gray-600">Avg Discount</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">Free</div>
            <div className="text-sm text-gray-600">Shipping</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onViewDetails={handleViewDetails}
              viewMode="grid"
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Shop with HealPrint?</h3>
            <p className="text-gray-600">Expert-recommended products for your health and wellness journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Approved</h4>
              <p className="text-sm text-gray-600">All products are recommended by certified health professionals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">Free shipping on orders over $50 worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Prices</h4>
              <p className="text-sm text-gray-600">Competitive pricing with regular discounts and deals</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

// Main Marketplace component with provider
const MarketplaceWithProvider = () => {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
};

export default MarketplaceWithProvider;
