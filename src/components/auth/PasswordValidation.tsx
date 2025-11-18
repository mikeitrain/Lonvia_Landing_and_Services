'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordValidationProps {
  password: string;
}

export const PasswordValidation: React.FC<PasswordValidationProps> = ({ password }) => {
  const { t } = useLanguage();

  // Password validation criteria based on Terraform password policy
  const passwordCriteria: PasswordCriteria[] = [
    {
      label: t('password.minLength') || 'At least 8 characters',
      test: (pwd: string) => pwd.length >= 8
    },
    {
      label: t('password.uppercase') || 'At least one uppercase letter',
      test: (pwd: string) => /[A-Z]/.test(pwd)
    },
    {
      label: t('password.lowercase') || 'At least one lowercase letter',
      test: (pwd: string) => /[a-z]/.test(pwd)
    },
    {
      label: t('password.number') || 'At least one number',
      test: (pwd: string) => /\d/.test(pwd)
    },
    {
      label: t('password.symbol') || 'At least one special character',
      test: (pwd: string) => /[@$!%*?&]/.test(pwd)
    }
  ];

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    const fulfilledCriteria = passwordCriteria.filter(criteria => criteria.test(pwd)).length;
    return (fulfilledCriteria / passwordCriteria.length) * 100;
  };

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="w-full rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            getPasswordStrength(password) < 40 ? 'bg-error-600' :
            getPasswordStrength(password) < 80 ? 'bg-warning-600' : 'bg-success-600'
          }`}
          style={{ width: `${getPasswordStrength(password)}%` }}
        ></div>
      </div>
      
      {/* Password Criteria */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground-secondary">
          {t('password.requirements') || 'Password Requirements:'}
        </p>
        {passwordCriteria.map((criteria, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              criteria.test(password) 
                ? 'bg-primary-600 text-white' 
                : 'bg-foreground-secondary text-foreground-secondary'
            }`}>
              {criteria.test(password) ? (
                <CheckIcon className="w-3 h-3" />
              ) : (
                <XMarkIcon className="w-3 h-3" />
              )}
            </div>
            <span className={`text-sm ${
              criteria.test(password) ? 'text-primary-600' : 'text-foreground-secondary'
            }`}>
              {criteria.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the password criteria and validation functions for use in other components
export const getPasswordCriteria = (t: (key: string) => string): PasswordCriteria[] => [
  {
    label: t('password.minLength') || 'At least 8 characters',
    test: (pwd: string) => pwd.length >= 8
  },
  {
    label: t('password.uppercase') || 'At least one uppercase letter',
    test: (pwd: string) => /[A-Z]/.test(pwd)
  },
  {
    label: t('password.lowercase') || 'At least one lowercase letter',
    test: (pwd: string) => /[a-z]/.test(pwd)
  },
  {
    label: t('password.number') || 'At least one number',
    test: (pwd: string) => /\d/.test(pwd)
  },
  {
    label: t('password.symbol') || 'At least one special character',
    test: (pwd: string) => /[@$!%*?&]/.test(pwd)
  }
];

export const getPasswordValidationPattern = () => 
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/; 