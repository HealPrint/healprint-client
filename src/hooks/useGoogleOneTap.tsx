import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GoogleOneTapConfig {
  client_id: string;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: 'signin' | 'signup' | 'use';
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

export const useGoogleOneTap = (enabled: boolean = true) => {
  const { handleGoogleAuthSuccess, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't show One Tap if user is already authenticated
    if (!enabled || isAuthenticated) {
      return;
    }

    // Load Google One Tap script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google) {
        // Get client ID from environment or use a default
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        
        if (!clientId) {
          console.warn('Google Client ID not found. One Tap disabled.');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            try {
              // Send the credential (JWT) to your backend
              const res = await fetch(`${import.meta.env.VITE_USER_API_URL || 'https://healprint-server-auth.onrender.com'}/auth/google/token`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: response.credential,
                }),
              });

              if (res.ok) {
                const userData = await res.json();
                handleGoogleAuthSuccess(userData);
                navigate('/chat');
              }
            } catch (error) {
              console.error('One Tap authentication failed:', error);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin',
        });

        // Display the One Tap prompt
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log('One Tap not displayed:', notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.log('One Tap skipped:', notification.getSkippedReason());
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: cancel One Tap and remove script
      if (window.google?.accounts.id) {
        window.google.accounts.id.cancel();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [enabled, isAuthenticated, handleGoogleAuthSuccess, navigate]);
};

