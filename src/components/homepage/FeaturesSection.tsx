import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  Search,
  UserCheck,
  Brain,
  DollarSign,
  Shield,
  Send
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Symptom Analysis",
      description: "AI-powered analysis of skin and hair symptoms to identify potential health connections",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: UserCheck,
      title: "Expert Matching",
      description: "Connect with certified dermatologists, nutritionists, and health coaches",
      gradient: "from-emerald-500 to-blue-500"
    },
    {
      icon: Brain,
      title: "Health Insights",
      description: "Deep analysis connecting external symptoms to internal health conditions",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "Product Recommendations",
      description: "Safe, personalized product suggestions based on your health profile",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Health Monitoring",
      description: "Track your wellness journey with personalized health reminders and tips",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Send,
      title: "Expert Consultations",
      description: "Book direct consultations with certified health professionals",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Health AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Six specialized AI-powered features working together to provide comprehensive health insights and guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
            Explore All Features
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
