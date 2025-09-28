import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface HealthProfileOnboardingProps {
  onComplete: (profile: HealthProfile) => void;
  onSkip: () => void;
}

interface HealthProfile {
  skinType: string;
  hairType: string;
  mainConcerns: string;
  knownAllergies: string;
}

const HealthProfileOnboarding: React.FC<HealthProfileOnboardingProps> = ({ onComplete, onSkip }) => {
  const [profile, setProfile] = useState<HealthProfile>({
    skinType: '',
    hairType: '',
    mainConcerns: '',
    knownAllergies: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleSave = () => {
    if (profile.skinType && profile.hairType && profile.mainConcerns) {
      onComplete(profile);
      setIsCompleted(true);
    }
  };

  const skinTypes = [
    { value: 'oily', label: 'Oily' },
    { value: 'dry', label: 'Dry' },
    { value: 'combination', label: 'Combination' },
    { value: 'sensitive', label: 'Sensitive' }
  ];

  const hairTypes = [
    { value: 'curly', label: 'Curly' },
    { value: 'straight', label: 'Straight' },
    { value: 'wavy', label: 'Wavy' },
    { value: 'coily', label: 'Coily' }
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-md text-gray-900 mb-2">Profile Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your health profile has been saved. You can now access personalized recommendations.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue to HealPrint
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-md text-gray-900">Health Profile</CardTitle>
          <p className="text-gray-600">Help us personalize your experience</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skinType">Skin Type *</Label>
            <Select value={profile.skinType} onValueChange={(value) => setProfile({...profile, skinType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your skin type" />
              </SelectTrigger>
              <SelectContent>
                {skinTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hairType">Hair Type *</Label>
            <Select value={profile.hairType} onValueChange={(value) => setProfile({...profile, hairType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your hair type" />
              </SelectTrigger>
              <SelectContent>
                {hairTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainConcerns">Main Concerns *</Label>
            <Textarea
              id="mainConcerns"
              value={profile.mainConcerns}
              onChange={(e) => setProfile({...profile, mainConcerns: e.target.value})}
              placeholder="Acne, Hair loss, Dryness, etc."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="knownAllergies">Known Allergies</Label>
            <Input
              id="knownAllergies"
              value={profile.knownAllergies}
              onChange={(e) => setProfile({...profile, knownAllergies: e.target.value})}
              placeholder="Any known allergies or sensitivities"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onSkip}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleSave}
              disabled={!profile.skinType || !profile.hairType || !profile.mainConcerns}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Save Health Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthProfileOnboarding;
