import { Amplify } from 'aws-amplify';

// Ensure environment variables are available
const requiredEnvVars = {
  authEndpoint: process.env.NEXT_PUBLIC_AUTH_ENDPOINT,
  userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
};

// Validate environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: NEXT_PUBLIC_${key.toUpperCase()}`);
  }
});

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolEndpoint: requiredEnvVars.authEndpoint as string,
      userPoolId: requiredEnvVars.userPoolId as string,
      userPoolClientId: requiredEnvVars.userPoolClientId as string,
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true
      }
    }
  }
}); 