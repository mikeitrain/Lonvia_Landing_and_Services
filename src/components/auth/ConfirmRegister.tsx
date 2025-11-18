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

interface ConfirmFormData {
  email: string;
  code: string;
}

export const ConfirmRegister: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { confirmRegister } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<ConfirmFormData>();

  const onSubmit = async (data: ConfirmFormData) => {
    setIsLoading(true);

    try {
      const success = await confirmRegister(data.email, data.code);
      if (success) {
        addNotification('success', t('message.confirmationSuccess'), 3000);
        
        // Check if there's pending case data and redirect accordingly
        if (FormDataManager.hasPendingData()) {
          // Show notification about restored data
          addNotification('success', t('message.formDataRestored') || 'Your form data has been restored', 3000);
          // Redirect back to case creation to complete the submission
          router.push('/case/create');
        } else {
          // Redirect to login for normal flow
          router.push('/auth/login');
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
            {t('confirmRegister.title') || 'Confirm Registration'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('confirmRegister.subtitle') || 'Enter the verification code sent to your email'}
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('confirmRegister.confirmEmail') || 'Verify Your Email'}
          </h2>
          <p className="text-foreground-secondary text-center mb-8">
            {t('confirmRegister.enterCode') || 'Please enter the 6-digit verification code sent to your email address'}
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
              label={t('confirmRegister.confirmationCode') || 'Verification Code'}
              name="code"
              type="text"
              register={register}
              error={errors.code?.message}
              required
              validation={{
                required: t('validation.codeRequired'),
                pattern: {
                  value: /^\d{6}$/,
                  message: t('validation.codeMustBe6Digits')
                }
              }}
            />

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (t('confirmRegister.verifying') || 'Verifying...') : (t('confirmRegister.confirm') || 'Confirm Registration')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground-secondary">
              {t('auth.alreadyHaveAccount') || 'Already have an account?'}{' '}
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