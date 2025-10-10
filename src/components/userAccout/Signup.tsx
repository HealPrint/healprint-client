import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import HealthProfileOnboarding from './HealthProfileOnboarding';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1); // 1 for email, 2 for password, 3 for name, 4 for health profile
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHealthProfile, setShowHealthProfile] = useState(false);
  
  const { signup, googleLogin, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handlePasswordContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setStep(3);
    }
  };

  const handleNameSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      if (!name.trim()) {
        toast({
          title: "Error",
          description: "Name is required for signup",
          variant: "destructive",
        });
        return;
      }
      await signup({ email, password, name });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      setShowHealthProfile(true);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Signup failed',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Redirect to backend-initiated Google OAuth flow
      await googleLogin();
      // User will be redirected to Google, no need for toast or profile here
      // The callback will handle navigation after successful auth
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Google signup failed',
        variant: "destructive",
      });
    }
  };

  const handleHealthProfileComplete = (profile: any) => {
    // Save health profile to user context or API
    console.log('Health profile saved:', profile);
    navigate('/chat');
  };

  const handleHealthProfileSkip = () => {
    navigate('/chat');
  };

  const handleBackToEmail = () => {
    setStep(1);
  };

  const handleBackToPassword = () => {
    setStep(2);
  };

  // Show health profile onboarding after successful signup
  if (showHealthProfile) {
    return (
      <HealthProfileOnboarding
        onComplete={handleHealthProfileComplete}
        onSkip={handleHealthProfileSkip}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Healprint Logo - Top Left */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <h1 className="text-xl font-bold text-black hover:text-gray-800 transition-colors cursor-pointer">Healprint</h1>
        </Link>
      </div>

      <div className="w-full max-w-md">

        {/* Main Content Block */}
        <div className="bg-white p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-sm text-black mb-3">Create an account</h2>
            <p className="text-gray-600 text-base">Enter your details to sign up for this app</p>
          </div>

          {/* Step-by-step Form */}
          {step === 1 ? (
            <form onSubmit={handleEmailContinue} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Continue
              </Button>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handlePasswordContinue} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleNameSignup} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : 'Sign up'}
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Signup Button */}
          <Button
            onClick={handleGoogleSignup}
            variant="outline"
            className="w-full h-12 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-center space-x-3">
              {/* Google Logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-black font-medium">Google</span>
            </div>
          </Button>

          {/* Back Navigation and Links */}
          <div className="mt-6 text-center space-y-2">
            {step === 2 && (
              <button
                onClick={handleBackToEmail}
                className="text-sm text-purple-600 hover:underline"
              >
                ← Back to email
              </button>
            )}
            {step === 3 && (
              <button
                onClick={handleBackToPassword}
                className="text-sm text-purple-600 hover:underline"
              >
                ← Back to password
              </button>
            )}
            {step === 1 && (
              <p className="text-xs text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
            {step === 3 && (
              <p className="text-xs text-gray-500">
                By clicking sign up, you agree to our{' '}
                <a href="#" className="text-black font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-black font-semibold hover:underline">
                  Privacy Policy
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
