import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
      image: "/assets/product1.jpg",
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
      image: "/assets/product2.jpg",
      category: "Hair Care",
      discount: 26,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 3,
      name: "Omega-3 Skin Health Capsules",
      brand: "NutriSkin",
      price: 28.75,
      originalPrice: 35.00,
      rating: 4.7,
      reviews: 156,
      image: "/assets/product3.jpg",
      category: "Supplements",
      discount: 18,
      isNew: false,
      isBestSeller: false
    },
    {
      id: 4,
      name: "Gentle Cleansing Foam",
      brand: "PureFace",
      price: 15.99,
      originalPrice: 22.00,
      rating: 4.5,
      reviews: 78,
      image: "/assets/product4.jpg",
      category: "Skincare",
      discount: 27,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 5,
      name: "Collagen Hair Mask",
      brand: "HairVital",
      price: 22.50,
      originalPrice: 30.00,
      rating: 4.8,
      reviews: 92,
      image: "/assets/product5.jpg",
      category: "Hair Care",
      discount: 25,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 6,
      name: "Probiotic Skin Support",
      brand: "GutGlow",
      price: 35.99,
      originalPrice: 45.00,
      rating: 4.6,
      reviews: 134,
      image: "/assets/product6.jpg",
      category: "Supplements",
      discount: 20,
      isNew: true,
      isBestSeller: false
    }
  ];

  return (
    <motion.section 
      className="pt-8 pb-24 bg-gradient-to-br from-gray-50 to-blue-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-md text-gray-900 mb-4">
            Recommended Products
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto mb-8">
            Discover products recommended by our health experts for your skin and hair concerns
          </p>
        </motion.div>

        {/* Moving Product Slider */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex animate-scroll space-x-6"
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Duplicate products for seamless loop */}
            {[...products, ...products].map((product, index) => (
              <motion.div 
                key={`${product.id}-${index}`} 
                className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden bg-white transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div> 
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button 
            onClick={() => {
              navigate('/marketplace');
              // Scroll to top after navigation
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#2F4F5F] hover:bg-[#1e3a47] text-white rounded-full transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-semibold text-base group-hover:text-gray-100 transition-colors">
              see more products
            </span>
          </motion.button>
        </motion.div>
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
    </motion.section>
  );
};

export default MarketplaceSection;
