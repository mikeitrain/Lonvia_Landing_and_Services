import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { User } from '../../types/user';
import { FormInputField } from '../common/FormInputField';
import { useLanguage } from '@/contexts/LanguageContext';


interface PersonalBasicInfoFormProps {
    register: UseFormRegister<User>;
    errors: FieldErrors<User>;
  }
  
  export const PersonalBasicInfoForm: React.FC<PersonalBasicInfoFormProps> = ({ register, errors }) => {
    const { t } = useLanguage();
  
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <FormInputField
            label={t('auth.firstName') || 'First Name'}
            name="firstName"
            register={register}
            error={errors.firstName?.message}
            required
            validation={{ required: (t('auth.firstName') || 'First Name') + ' is required' }}
          />
          <FormInputField
            label={t('auth.lastName') || 'Last Name'}
            name="lastName"
            register={register}
            error={errors.lastName?.message}
            required
            validation={{ required: (t('auth.lastName') || 'Last Name') + ' is required' }}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          <FormInputField
            label="CNP"
            name="cnp"
            register={register}
            error={errors.cnp?.message}
            required
            validation={{
              required: t('validation.cnpRequired') || 'CNP is required',
              pattern: {
                value: /^[1-9][0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])(?:0[1-9]|[1-3][0-9]|4[0-6]|51|52)[0-9]{4}$/,
                message: t('validation.cnpInvalid') || 'Invalid CNP format'
              }
            }}
            type="text"
          />
        </div>
      </div>
    );
  };
  