'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../common/FormInputField';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { FormDataManager } from '../../lib/formDataManager';
import { routeToBasePage } from '@/lib/utils';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        addNotification('success', t('message.loggedIn'), 3000);
        
        // Check if there's pending case data and redirect accordingly
        if (FormDataManager.hasPendingData()) {
          // Show notification about restored data
          addNotification('success', t('message.formDataRestored') || 'Your form data has been restored', 3000);
          // Redirect back to case creation to complete the submission
          router.push('/case/create');
        } else {
          // Redirect based on group after successful login
          try {
            const session = await (await import('aws-amplify/auth')).fetchAuthSession();
            const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
            const groups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
            router.push(routeToBasePage(groups));
          } catch {
            router.push('/user/profile');
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground-primary mb-4">
            {t('login.title') || 'Welcome Back'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('login.subtitle') || 'Sign in to access your account'}
          </p>
        </div>

        <div className="max-w-md mx-auto bg-background-primary rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('login.signIn') || 'Sign In'}
          </h2>
          <p className="text-foreground-secondary text-center mb-8">
            {t('login.enterCredentials') || 'Enter your credentials to continue'}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              label={t('auth.email') || 'Email Address'}
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              required
              validation={{
                required: (t('auth.email') || 'Email') + ' is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid')
                }
              }}
            />
            
            <FormInputField
              label={t('auth.password') || 'Password'}
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
              required
              validation={{
                required: (t('auth.password') || 'Password') + ' is required',
                minLength: {
                  value: 8,
                  message: t('validation.passwordMinLength')
                }
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-border-primary rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground-secondary">
                  {t('login.rememberMe') || 'Remember me'}
                </label>
              </div>

              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('auth.forgotPassword') || 'Forgot password?'}
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (t('login.signingIn') || 'Signing in...') : (t('nav.login') || 'Sign In')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground-secondary">
              {t('auth.dontHaveAccount') || "Don't have an account?"}{' '}
              <Link 
                href="/auth/register" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('auth.registerHere') || 'Register here'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 