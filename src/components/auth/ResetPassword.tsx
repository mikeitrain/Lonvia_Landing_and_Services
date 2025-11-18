'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../common/FormInputField';
import { Button } from '../common/Button';
import { PasswordValidation, getPasswordValidationPattern } from './PasswordValidation';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckIcon } from '@heroicons/react/24/outline';

interface ResetPasswordFormData {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { resetPassword } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      const success = await resetPassword(data.email, data.code, data.newPassword);
      
      if (success) {
        setIsPasswordReset(true);
        addNotification('success', t('message.passwordResetSuccess'), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isPasswordReset) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground-primary mb-4">
              {t('resetPassword.success') || 'Password Reset Successful'}
            </h1>
            <p className="text-xl text-foreground-secondary">
              {t('resetPassword.passwordUpdated') || 'Your password has been successfully updated'}
            </p>
          </div>

          <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground-primary mb-4">
                {t('resetPassword.resetComplete') || 'Reset Complete'}
              </h2>
              <p className="text-foreground-secondary mb-6">
                {t('resetPassword.canLoginNow') || 'You can now log in with your new password.'}
              </p>
              <Link 
                href="/auth/login" 
                className="block w-full bg-[#35ae2a] hover:bg-[#2d9624] text-white py-3 px-4 rounded-md font-semibold transition-colors"
              >
                {t('resetPassword.loginNow') || 'Login Now'}
              </Link>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('resetPassword.title') || 'Reset Password'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('resetPassword.subtitle') || 'Enter your email, reset code, and new password'}
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('resetPassword.resetPassword') || 'Reset Password'}
          </h2>
          <p className="text-foreground-secondary text-center mb-8">
            {t('resetPassword.enterDetails') || 'Please enter your email, the reset code you received, and your new password.'}
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

            <FormInputField
              label={t('resetPassword.resetCode') || 'Reset Code'}
              name="code"
              type="text"
              register={register}
              error={errors.code?.message}
              required
              validation={{
                required: t('validation.resetCodeRequired'),
                minLength: {
                  value: 6,
                  message: t('validation.resetCodeMinLength')
                }
              }}
            />
            
            <div className="space-y-2">
              <FormInputField
                label={t('resetPassword.newPassword') || 'New Password'}
                name="newPassword"
                type="password"
                register={register}
                error={errors.newPassword?.message}
                required
                validation={{
                  required: t('validation.newPasswordRequired'),
                  minLength: {
                    value: 8,
                    message: t('validation.passwordMinLength')
                  },
                  pattern: {
                    value: getPasswordValidationPattern(),
                    message: t('validation.passwordComplexity')
                  }
                }}
              />
              
              {/* Password Strength Indicator */}
              {newPassword && <PasswordValidation password={newPassword} />}
            </div>

            <FormInputField
              label={t('resetPassword.confirmPassword') || 'Confirm New Password'}
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
              required
              validation={{
                required: t('validation.confirmPasswordRequired'),
                validate: (value: string) => 
                  value === newPassword || t('validation.passwordsDoNotMatch')
              }}
            />

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (t('resetPassword.resetting') || 'Resetting password...') : (t('resetPassword.resetPassword') || 'Reset Password')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground-secondary">
              {t('resetPassword.needResetCode') || 'Need a reset code?'}{' '}
              <Link 
                href="/auth/forgot-password" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('resetPassword.requestCode') || 'Request one here'}
              </Link>
            </p>
            <p className="text-foreground-secondary mt-2">
              {t('auth.rememberPassword') || 'Remember your password?'}{' '}
              <Link 
                href="/auth/login" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('auth.loginHere') || 'Login here'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 