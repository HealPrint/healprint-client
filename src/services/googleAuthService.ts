import { config } from '../config';

// Declare global Google types
declare global {
  interface Window {
    google: any;
  }
}

// Google OAuth Service
class GoogleAuthService {
  signInWithGoogle() {
    throw new Error('Method not implemented.');
  }
  private clientId: string;
  private apiBaseUrl: string;
  private isInitialized: boolean = false;

  constructor() {
    // Get Google Client ID from environment variables with fallback
    this.clientId = config.GOOGLE_CLIENT_ID;
    // Use the dedicated User/Auth API URL
    this.apiBaseUrl = config.USER_API_URL;
    
    if (!this.clientId || this.clientId === 'your-google-client-id-here') {
      console.warn('⚠️ Google Client ID not properly configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file');
    }
  }

  // Initialize Google Identity Services
  async initializeGoogleAuth(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    return new Promise((resolve, reject) => {
      if (!this.clientId) {
        reject(new Error('Google Client ID not configured'));
        return;
      }

      // Check if Google script is already loaded
      if (window.google && window.google.accounts) {
        this.setupGoogleAuth();
        this.isInitialized = true;
        resolve();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        try {
          this.setupGoogleAuth();
          this.isInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services'));
      };
      
      document.head.appendChild(script);
    });
  }

  private setupGoogleAuth(): void {
    if (!window.google || !window.google.accounts) {
      throw new Error('Google Identity Services not available');
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }

  // Handle Google credential response
  private async handleCredentialResponse(response: any): Promise<any> {
    try {
      
      // Send the credential to our backend
      const backendResponse = await fetch(`${this.apiBaseUrl}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential
        }),
      });

      if (!backendResponse.ok) {
        const error = await backendResponse.json();
        throw new Error(error.detail || 'Google authentication failed');
      }

      const userData = await backendResponse.json();
      
      return userData;
    } catch (error) {
      console.error('❌ Google authentication error:', error);
      throw error;
    }
  }

  // Render Google Sign-In button
  renderButton(elementId: string, onSuccess: (userData: any) => void, onError: (error: any) => void): void {
    if (!this.clientId) {
      onError(new Error('Google Client ID not configured'));
      return;
    }

    if (!window.google || !window.google.accounts) {
      onError(new Error('Google Identity Services not loaded'));
      return;
    }

    try {
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '100%'
        }
      );

      // Override the callback to use our custom handler
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: async (response: any) => {
          try {
            const userData = await this.handleCredentialResponse(response);
            onSuccess(userData);
          } catch (error) {
            onError(error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });
    } catch (error) {
      console.error(' Error rendering Google button:', error);
      onError(error);
    }
  }

  // One-tap sign-in
  async promptOneTap(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.clientId) {
        reject(new Error('Google Client ID not configured'));
        return;
      }

      if (!window.google || !window.google.accounts) {
        reject(new Error('Google Identity Services not loaded'));
        return;
      }

      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // One-tap was not displayed or was skipped
            reject(new Error('One-tap sign-in not available'));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const googleAuthService = new GoogleAuthService();
