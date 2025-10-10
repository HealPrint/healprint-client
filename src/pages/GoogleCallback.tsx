import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleAuthService } from '../services/googleAuthService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const GoogleCallback: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleGoogleAuthSuccess } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsLoading(true);
        
        // Extract authorization code and state from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error_param = urlParams.get('error');
        
        if (error_param) {
          throw new Error(`OAuth error: ${error_param}`);
        }
        
        if (!code) {
          throw new Error('No authorization code received from Google');
        }
        
        // Exchange code for user data via backend
        const userData = await googleAuthService.handleCallback(code, state || undefined);
        
        // Store the JWT token and user data
        handleGoogleAuthSuccess(userData);
        
        toast({
          title: "Success",
          description: "Logged in with Google successfully!",
        });
        
        // Navigate to chat
        navigate('/chat');
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Google authentication failed';
        setError(errorMessage);
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        // Navigate back to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [navigate, handleGoogleAuthSuccess, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Google Sign-In</h2>
          <p className="text-gray-600">Please wait while we process your authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;
