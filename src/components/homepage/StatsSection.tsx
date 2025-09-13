import { Heart, UserCheck, Trophy } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-3">50,000+</div>
              <div className="text-blue-100 text-lg">Health Insights Generated</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-3">10,000+</div>
              <div className="text-blue-100 text-lg">Users Helped</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl font-bold mb-3">95%</div>
              <div className="text-blue-100 text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
