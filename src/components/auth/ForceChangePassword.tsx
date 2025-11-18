'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormInputField } from '@/components/common/FormInputField';
import { Button } from '@/components/common/Button';
import { PasswordValidation, getPasswordValidationPattern } from '@/components/auth/PasswordValidation';
import { useNotifications } from '@/contexts/NotificationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { routeToBasePage } from '@/lib/utils';

interface ForceChangePasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}

export const ForceChangePassword: React.FC = () => {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { forceChangePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ForceChangePasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ForceChangePasswordFormData) => {
    setIsLoading(true);
    try {
      const success = await forceChangePassword(data.newPassword);
      if (success) {
        addNotification('success', t('message.passwordChanged') || 'Password changed successfully', 3000);
        // Redirect based on user groups after successful password change
        try {
          const session = await (await import('aws-amplify/auth')).fetchAuthSession();
          const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
          const groups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
          router.push(routeToBasePage(groups));
        } catch {
          router.push('/user/profile');
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
            {t('auth.forceChangePasswordTitle') || 'Update your password'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('auth.forceChangePasswordSubtitle') || 'You need to set a new password before continuing.'}
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('auth.setNewPassword') || 'Set a new password'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormInputField
                label={t('auth.newPassword') || 'New Password'}
                name="newPassword"
                type="password"
                register={register}
                error={errors.newPassword?.message}
                required
                validation={{
                  required: t('validation.passwordRequired'),
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
              label={t('auth.confirmPassword') || 'Confirm New Password'}
              name="confirmNewPassword"
              type="password"
              register={register}
              error={errors.confirmNewPassword?.message}
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
              {isLoading ? (t('auth.updatingPassword') || 'Updating password...') : (t('auth.updatePassword') || 'Update Password')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};


