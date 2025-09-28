import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, CreditCard, CheckCircle, User, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

const ExpertsPage = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
    preferredDate: '',
    preferredTime: '',
    sessionType: 'video',
    notes: ''
  });

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Dermatologist",
      experience: "15 years",
      rating: 4.9,
      price: 50,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      description: "Specializes in hormonal acne and skin health connections",
      availability: ["Mon", "Wed", "Fri"],
      languages: ["English", "Mandarin"]
    },
    {
      id: 2,
      name: "James Wilson",
      specialty: "Health Coach",
      experience: "8 years",
      rating: 4.7,
      price: 40,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      description: "Holistic wellness coaching for stress and lifestyle management",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      languages: ["English"]
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', { expert: selectedExpert, data: bookingData });
    setBookingStep(3); // Confirmation step
  };

  const resetBooking = () => {
    setSelectedExpert(null);
    setBookingStep(1);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      concern: '',
      preferredDate: '',
      preferredTime: '',
      sessionType: 'video',
      notes: ''
    });
  };

  return (
  <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
    <div className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6 space-y-8">
        {/* Booking Flow */}
        {bookingStep === 1 && (
          <>
            {/* Expert Banner - Only show on step 1 */}
      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden mb-6 lg:mb-8 shadow-xl">
        <div className="relative h-64 sm:h-72 lg:h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>
          
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-md text-white mb-4 sm:mb-6 leading-tight">
                Expert Health Consultations
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Connect with certified dermatologists, nutritionists, and health coaches for personalized guidance and professional care.
              </p>
              </div>
            </div>
          </div>
        </div>
          <div className="space-y-6">
          
      
            <div className="grid gap-4">
              {experts.map((expert) => (
                <Card key={expert.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <img 
                          src={expert.image} 
                          alt={expert.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
        </div>
        
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{expert.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{expert.specialty} • {expert.experience} experience</p>
                            <p className="text-gray-700 mb-3">{expert.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{expert.rating}/5</span>
                    </div>
                              <Badge variant="secondary" className="text-xs">
                                Available: {expert.availability.join(", ")}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {expert.languages.join(", ")}
                              </Badge>
                  </div>
                </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <div className="text-right">
                              <span className="text-2xl font-bold text-blue-600">${expert.price}</span>
                              <span className="text-sm text-gray-500">/session</span>
                            </div>
                            <Button 
                              onClick={() => {
                                setSelectedExpert(expert);
                                setBookingStep(2);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                            >
                              Book Consultation
                </Button>
                          </div>
                        </div>
                      </div>
              </div>
            </CardContent>
          </Card>
              ))}
            </div>
          </div>

          {/* Commission Info - Only show on step 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-blue-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Transparent Pricing</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Connect directly with certified experts. HealPrint earns a small commission to keep the platform running while ensuring you get the best care at fair prices.
            </p>
          </div>
          </>
        )}

        {bookingStep === 2 && selectedExpert && (
          <div className="space-y-6">
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Book with {selectedExpert.name}</h2>
              <p className="text-gray-600">{selectedExpert.specialty} • ${selectedExpert.price}/session</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionType">Session Type *</Label>
                      <Select value={bookingData.sessionType} onValueChange={(value) => setBookingData({...bookingData, sessionType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="chat">Text Chat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="concern">Health Concern *</Label>
                    <Textarea
                      id="concern"
                      value={bookingData.concern}
                      onChange={(e) => setBookingData({...bookingData, concern: e.target.value})}
                      placeholder="Describe your health concern or what you'd like to discuss..."
                      rows={3}
                      required
                    />
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.preferredDate}
                        onChange={(e) => setBookingData({...bookingData, preferredDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
              </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select value={bookingData.preferredTime} onValueChange={(value) => setBookingData({...bookingData, preferredTime: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      placeholder="Any additional information you'd like to share..."
                      rows={2}
                    />
                </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setBookingStep(1)}
                      className="w-full sm:w-auto"
                    >
                      Back to Experts
                    </Button>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Confirm Booking
                </Button>
              </div>
                </form>
            </CardContent>
          </Card>
        </div>
        )}

        {bookingStep === 3 && (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Your consultation with {selectedExpert?.name} has been scheduled.
              </p>
              <p className="text-sm text-gray-500">
                You'll receive a confirmation email with meeting details shortly.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Expert:</span>
                  <span className="font-medium">{selectedExpert?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{bookingData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{bookingData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium capitalize">{bookingData.sessionType} Call</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">${selectedExpert?.price}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetBooking} variant="outline">
                Book Another Consultation
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View My Bookings
              </Button>
        </div>
      </div>
        )}

    </div>
  </div>
);
};

export default ExpertsPage;
