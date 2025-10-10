import { config } from '../config';

/**
 * Google OAuth Service - Backend-initiated flow
 * The backend handles all Google OAuth configuration and client credentials
 */
class GoogleAuthService {
  private apiBaseUrl: string;

  constructor() {
    // Use the dedicated User/Auth API URL
    this.apiBaseUrl = config.USER_API_URL;
  }

  /**
   * Get Google OAuth URL from backend and redirect user to Google sign-in
   * The backend constructs the OAuth URL with its own client ID and credentials
   */
  async initiateGoogleLogin(): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/auth/google/url`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to get Google OAuth URL');
      }

      const data = await response.json();
      
      // Store redirect_uri from backend to use in callback
      if (data.redirect_uri) {
        sessionStorage.setItem('google_redirect_uri', data.redirect_uri);
      }
      
      // Redirect user to Google OAuth page (managed by backend)
      window.location.href = data.url;
    } catch (error) {
      console.error(' Failed to initiate Google login:', error);
      throw error;
    }
  }

  /**
   * Handle OAuth callback from Google
   * Exchanges authorization code for user data via backend
   */
  async handleCallback(code: string, state?: string): Promise<any> {
    try {
      // Use the same redirect URI that was used to initiate the OAuth flow
      const redirectUri = sessionStorage.getItem('google_redirect_uri') || 
                         import.meta.env.VITE_GOOGLE_REDIRECT_URI || 
                         'https://healprint.xyz/auth/google/callback';
      
      // Clean up stored redirect URI
      sessionStorage.removeItem('google_redirect_uri');
      
      const response = await fetch(`${this.apiBaseUrl}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          state,
          redirect_uri: redirectUri
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Google authentication failed');
      }

      return await response.json();
    } catch (error) {
      console.error(' Google callback error:', error);
      throw error;
    }
  }
}

export const googleAuthService = new GoogleAuthService();
