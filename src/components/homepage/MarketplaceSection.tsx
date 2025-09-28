import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from "lucide-react";

const MarketplaceSection = () => {
  const navigate = useNavigate();
  
  const products = [
    {
      id: 1,
      name: "Hyaluronic Acid Serum",
      brand: "SkinGlow",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Skincare",
      discount: 29,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 2,
      name: "Biotin Hair Growth Vitamins",
      brand: "HairVital",
      price: 18.50,
      originalPrice: 25.00,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Hair Care",
      discount: 26,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 4,
      name: "Omega-3 Skin Health Capsules",
      brand: "NutriSkin",
      price: 28.75,
      originalPrice: 35.00,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Supplements",
      discount: 18,
      isNew: false,
      isBestSeller: false
    },
    {
      id: 5,
      name: "Gentle Cleansing Foam",
      brand: "PureFace",
      price: 15.99,
      originalPrice: 22.00,
      rating: 4.5,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Skincare",
      discount: 27,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 6,
      name: "Collagen Hair Mask",
      brand: "HairVital",
      price: 22.50,
      originalPrice: 30.00,
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Hair Care",
      discount: 25,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 7,
      name: "Probiotic Skin Support",
      brand: "GutGlow",
      price: 35.99,
      originalPrice: 45.00,
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Supplements",
      discount: 20,
      isNew: true,
      isBestSeller: false
    }
  ];

  return (
    <section className="pt-8 pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-md text-gray-900 mb-4">
            Recommended Products
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto mb-8">
            Discover products recommended by our health experts for your skin and hair concerns
          </p>

        </div>

        {/* Moving Product Slider */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {/* Duplicate products for seamless loop */}
            {[...products, ...products].map((product, index) => (
              <div key={`${product.id}-${index}`} className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden bg-white transition-all duration-300 group cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer group"
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse group-hover:bg-blue-700"></div>
            <span className="group-hover:underline">Scroll to see more products</span>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse group-hover:bg-blue-700"></div>
          </button>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default MarketplaceSection;
