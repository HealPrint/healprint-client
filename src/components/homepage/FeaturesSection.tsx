import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  Search,
  UserCheck,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Symptom Analysis",
      description: "AI-powered analysis of skin and hair symptoms to identify potential health connections",
      gradient: "from-blue-500 to-purple-500",
      image: "/assets/christin-hume-0MoF-Fe0w0A-unsplash_ukakzp.jpg",
      overlay: "Upload photos and get instant AI analysis"
    },
    {
      icon: UserCheck,
      title: "Expert Matching",
      description: "Connect with certified dermatologists, nutritionists, and health coaches",
      gradient: "from-emerald-500 to-blue-500",
      image: "/assets/portrait-african-american-practitioner-doctor-working-hospital-office_eig706.jpg",
      overlay: "Connect with verified health professionals"
    },
   
    {
      icon: Search,
      title: "Product Recommendations",
      description: "Safe, personalized product suggestions based on your health profile",
      gradient: "from-orange-500 to-red-500",
      image: "/assets/woman-with-tablet-device-illustrating-min_zvux1l.jpg",
      overlay: "Get personalized product suggestions"
    },
    {
      icon: UserCheck,
      title: "Health Monitoring",
      description: "Track your wellness journey with personalized health reminders and tips",
      gradient: "from-cyan-500 to-blue-500",
      image: "/assets/retinal-biometrics-technology-with-man-s-eye-digital-remix-min_dhuks8.jpg",
      overlay: "Track your health progress"
    },
    {
      icon: Brain,
      title: "Expert Consultations",
      description: "Book direct consultations with certified health professionals",
      gradient: "from-indigo-500 to-purple-500",
      image: "/assets/medical-banner-with-doctor-wearing-goggles_uaauiy.jpg",
      overlay: "Book professional consultations"
    }
  ];

  return (
    <>
      <style>{`
        .scrollable-features::-webkit-scrollbar {
          display: none;
        }
        .scrollable-features {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <motion.section 
        className="relative pt-16 pb-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      

        {/* Modern Asymmetric Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Hero Feature - Large Card */}
          <motion.div 
            className="lg:col-span-7 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[400px] rounded-3xl overflow-hidden bg-white transition-all duration-700 cursor-pointer">
              {/* Video Background */}
              <div className="relative h-full">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                  }}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
               
              </div>
            </div>
            
            {/* Content Below Video */}
            <div className="p-6 pl-0">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{features[0].title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                {features[0].description}
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                Try AI Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Right Side Features - Scrollable */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-[500px] overflow-y-auto space-y-4 pr-2 scrollable-features">
              {/* Scrollable feature cards */}
              {features.slice(1).map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="group relative rounded-2xl overflow-hidden bg-white transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />
                  </div>

                  {/* Content Below Image */}
                  <div className="p-4 pl-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                      {feature.title === 'Expert Matching' ? 'Connect Now' :
                       feature.title === 'Health Insights' ? 'Get Insights' :
                       feature.title === 'Product Recommendations' ? 'View Products' :
                       feature.title === 'Health Monitoring' ? 'Start Tracking' :
                       feature.title === 'Expert Consultations' ? 'Book Now' : 'Learn More'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>


        {/* Modern CTA Section */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gray-100 p-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-4xl lg:text-5xl font-md text-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your
              <br />
              <span className=" text-black">
                Health Journey?
              </span>
            </motion.h3>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="black/30 text-black hover:bg-black/10 px-12 py-4 text-lg rounded-2xl font-semibold backdrop-blur-sm">
                 Download
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
    </>
  );
};

export default FeaturesSection;
