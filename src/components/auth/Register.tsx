'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormInputField } from '../common/FormInputField';
import { Button } from '../common/Button';
import { PasswordValidation, getPasswordValidationPattern } from './PasswordValidation';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}



export const Register: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    const success = await registerUser(
      data.email, 
      data.password, 
      data.firstName, 
      data.lastName
    );
    
    if (success) {
      addNotification('success', t('message.registrationSuccess'), 3000);
      router.push('/auth/register-confirm');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground-primary mb-4">
            {t('register.title') || 'Create Account'}
          </h1>
          <p className="text-xl text-foreground-secondary">
            {t('register.subtitle') || 'Join us and start your healthcare journey'}
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-lg shadow-box p-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6 text-center">
            {t('register.createAccount') || 'Create Account'}
          </h2>
          <p className="text-foreground-secondary text-center mb-8">
            {t('register.fillDetails') || 'Please fill in your details below'}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormInputField
                label={t('auth.firstName') || 'First Name'}
                name="firstName"
                type="text"
                register={register}
                error={errors.firstName?.message}
                required
                validation={{
                  required: t('validation.firstNameRequired'),
                  minLength: {
                    value: 2,
                    message: t('validation.firstNameMinLength')
                  }
                }}
              />
              
              <FormInputField
                label={t('auth.lastName') || 'Last Name'}
                name="lastName"
                type="text"
                register={register}
                error={errors.lastName?.message}
                required
                validation={{
                  required: t('validation.lastNameRequired'),
                  minLength: {
                    value: 2,
                    message: t('validation.lastNameMinLength')
                  }
                }}
              />
            </div>

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
            
            <div className="space-y-2">
              <FormInputField
                label={t('auth.password') || 'Password'}
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
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
              {password && <PasswordValidation password={password} />}
            </div>

            <FormInputField
              label={t('auth.confirmPassword') || 'Confirm Password'}
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
              required
                              validation={{
                  required: t('validation.confirmPasswordRequired'),
                  validate: (value: string) => 
                    value === password || t('validation.passwordsDoNotMatch')
                }}
            />

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (t('register.creatingAccount') || 'Creating account...') : (t('register.createAccount') || 'Create Account')}
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