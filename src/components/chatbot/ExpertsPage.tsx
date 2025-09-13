import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ExpertsPage = () => (
  <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Expert Banner with Image Overlay */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Expert Health Consultations
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with certified dermatologists, nutritionists, and health coaches for personalized guidance and professional care.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-2xl shadow-lg font-semibold">
                  Book Consultation
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-2xl font-semibold">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Commission Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Commission-Free Expert Marketplace</h3>
        <p className="text-gray-600 leading-relaxed">
          Connect directly with certified experts. HealPrint earns a small commission to keep the platform running while ensuring you get the best care.
        </p>
      </div>
      
      {/* Available Specialists */}
      <div className="space-y-8">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Specialists</h2>
          <p className="text-gray-600 max-w-2xl">Connect with certified health professionals for personalized care</p>
        </div>
        
        <div className="space-y-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Sarah Chen</h3>
                  <p className="text-sm text-gray-600 mb-2">Dermatologist • 15 years experience</p>
                  <p className="text-gray-600 leading-relaxed mb-4">Specializes in hormonal acne and skin health connections</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">4.9/5</span>
                    </div>
                    <span className="text-sm text-gray-500">$50/session</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Maria Rodriguez</h3>
                  <p className="text-sm text-gray-600 mb-2">Nutritionist • 12 years experience</p>
                  <p className="text-gray-600 leading-relaxed mb-4">Expert in nutrition for healthy skin and hair from within</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">4.8/5</span>
                    </div>
                    <span className="text-sm text-gray-500">$35/session</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">James Wilson</h3>
                  <p className="text-sm text-gray-600 mb-2">Health Coach • 8 years experience</p>
                  <p className="text-gray-600 leading-relaxed mb-4">Holistic wellness coaching for stress and lifestyle management</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">4.7/5</span>
                    </div>
                    <span className="text-sm text-gray-500">$40/session</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default ExpertsPage;
