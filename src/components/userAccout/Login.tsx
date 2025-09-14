import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      await login({ email, password });
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Login failed',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Coming Soon",
      description: "Google authentication will be available soon!",
    });
  };

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
            <h2 className="text-4xl font-sm text-black mb-3">Welcome back</h2>
            <p className="text-gray-600 text-base">Enter your credentials to access your account</p>
          </div>

          {/* Step-by-step Login Form */}
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
          ) : (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : 'Log in'}
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Button */}
          <Button
            onClick={handleGoogleAuth}
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

          {/* Navigation Links */}
          <div className="mt-6 text-center space-y-2">
            {step === 2 && (
              <button
                onClick={handleBackToEmail}
                className="text-sm text-purple-600 hover:underline"
              >
                ← Back to email
              </button>
            )}
            {step === 1 && (
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot your password?
              </a>
            )}
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;