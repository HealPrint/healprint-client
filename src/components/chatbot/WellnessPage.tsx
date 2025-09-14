import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WellnessPage = () => (
  <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
    <div className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6 space-y-8">
      {/* Health Insights Section */}
      <div className="space-y-8">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Connection Insights</h2>
          <p className="text-gray-600 max-w-2xl">Evidence-based connections between internal health and external appearance</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Hormonal Balance & Skin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                <span className="font-semibold text-blue-600">72%</span> of people with recurring acne have gut or hormonal imbalances contributing to flare-ups.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read More
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Nutrition & Hair Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over <span className="font-semibold text-blue-600">80%</span> of women experience hair thinning, with more than half linked to internal health issues.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read More
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Stress & Skin Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chronic stress can trigger inflammatory skin conditions and disrupt natural healing processes.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read More
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900">Gut Health Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                The gut-skin axis shows how digestive health directly impacts skin clarity and overall appearance.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Read More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default WellnessPage;
