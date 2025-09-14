import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings & Profile</h1>
              <p className="text-gray-600">Manage your account, preferences, and health profile</p>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      
      <div className="grid gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="25" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Health Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Health Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skinType">Skin Type</Label>
                <Input id="skinType" placeholder="Oily, Dry, Combination, Sensitive" />
              </div>
              <div>
                <Label htmlFor="hairType">Hair Type</Label>
                <Input id="hairType" placeholder="Curly, Straight, Wavy, Coily" />
              </div>
              <div>
                <Label htmlFor="concerns">Main Concerns</Label>
                <Input id="concerns" placeholder="Acne, Hair loss, Dryness, etc." />
              </div>
              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input id="allergies" placeholder="Any known allergies or sensitivities" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Health Profile</Button>
          </CardContent>
        </Card>

        {/* Subscription & Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Free Plan</h3>
                <p className="text-sm text-gray-600">Basic health insights and chat access</p>
              </div>
              <Button variant="outline">Upgrade to Premium</Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Premium: $3-5/month for deeper analysis, expert booking, and priority support
            </p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Health reminders</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Expert session reminders</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Weekly wellness tips</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Data sharing for research</span>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Two-factor authentication</span>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
};

export default SettingsPage;
