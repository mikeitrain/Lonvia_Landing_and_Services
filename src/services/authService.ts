// Authentication service interface
export interface AuthService {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  confirmRegister: (email: string, code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  forceChangePassword: (newPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
}

import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, confirmSignIn } from 'aws-amplify/auth';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

// AWS Amplify implementation
class AmplifyAuthService implements AuthService {
  async login(email: string, password: string): Promise<boolean> {
    const result = await signIn({ username: email, password });
    // Amplify v6 returns nextStep when additional action is required
    const signInStep = (result as unknown as { nextStep?: { signInStep?: string } }).nextStep?.signInStep;
    if (signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
      // Return false and let caller redirect to force-change-password page
      throw Object.assign(new Error('FORCE_CHANGE_PASSWORD'), { name: 'ForceChangePassword' });
    }
    return true;
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<boolean> {
    await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          'given_name': firstName,
          'family_name': lastName
        }
      }
    });
    return true;
  }

  async confirmRegister(email: string, code: string): Promise<boolean> {
    await confirmSignUp({
      username: email,
      confirmationCode: code
    });
    return true;
  }

  async forgotPassword(email: string): Promise<boolean> {
    await resetPassword({ username: email });
    return true;
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<boolean> {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword
    });
    return true;
  }

  async forceChangePassword(newPassword: string): Promise<boolean> {
    await confirmSignIn({
      challengeResponse: newPassword
    });
    return true;
  }

  async logout(): Promise<void> {
    await signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    await getCurrentUser();
    return true;
  }
}

// Export a singleton instance
export const authService = new AmplifyAuthService(); 