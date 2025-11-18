'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../common/FormInputField';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { forgotPassword } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const success = await forgotPassword(data.email);
      if (success) {
        setIsEmailSent(true);
        addNotification('success', t('message.resetEmailSent'), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground-primary mb-4">
              {t('forgotPassword.checkEmail') || 'Check Your Email'}
            </h1>
            <p className="text-xl text-foreground-secondary">
              {t('forgotPassword.resetLinkSent') || 'We\'ve sent you a password reset link'}
            </p>
          </div>

          <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-8 h-8 text-green-600" />
              </div>
                <h2 className="text-2xl font-semibold text-foreground-primary mb-4">
                {t('forgotPassword.emailSent') || 'Email Sent Successfully'}
              </h2>
              <p className="text-foreground-secondary mb-6">
                {t('forgotPassword.checkInbox') || 'Please check your email inbox and follow the instructions to reset your password.'}
              </p>
              <p className="text-foreground-secondary mb-6">
                {t('forgotPassword.orUseCode') || 'Or if you have a reset code, you can use it directly:'}
              </p>
              <div className="space-y-3">
                <Link 
                  href="/auth/login" 
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors"
                >
                  {t('forgotPassword.backToLogin') || 'Back to Login'}
                </Link>
                <Link 
                  href="/auth/reset-password" 
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md font-semibold transition-colors"
                >
                  {t('forgotPassword.useResetCode') || 'Use Reset Code'}
                </Link>
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="block w-full text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t('forgotPassword.tryDifferentEmail') || 'Try a different email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground-primary mb-4">
            {t('forgotPassword.title') || 'Reset Password'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('forgotPassword.subtitle') || 'Enter your email to receive a password reset link'}
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('forgotPassword.forgotPassword') || 'Forgot Password?'}
          </h2>
          <p className="text-foreground-secondary text-center mb-8">
            {t('forgotPassword.enterEmail') || 'No worries! Enter your email address and we\'ll send you a link to reset your password.'}
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
                required: t('validation.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid')
                }
              }}
            />

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (t('forgotPassword.sending') || 'Sending...') : (t('forgotPassword.sendResetLink') || 'Send Reset Link')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground-secondary">
              {t('auth.rememberPassword') || 'Remember your password?'}{' '}
              <Link 
                href="/auth/login" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('auth.loginHere') || 'Login here'}
              </Link>
            </p>
            <p className="text-foreground-secondary">
              {t('forgotPassword.existingResetCode') || 'Do you have already a reset code?'}{' '}
              <Link 
                href="/auth/reset-password" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('forgotPassword.useResetCode') || 'Use Reset Code'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 