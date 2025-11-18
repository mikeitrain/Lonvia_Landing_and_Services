'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormInputField } from '@/components/common/FormInputField';

// DemographicFormData interface is defined but not used in this component
// It's used in other components that extend the form data

interface DemographicProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export const Demographic = <T extends FieldValues>({ 
  register, 
  errors, 
  className = ''
}: DemographicProps<T>) => {
  const { t } = useLanguage();

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-base md:text-lg font-semibold text-foreground-primary">
        {t('demographic.title') || 'Demographic Information'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-heading mb-2">
            {t('demographic.gender') || 'Gender'} <span className="text-error-500 ml-1">*</span>
          </label>
          <select
            {...register('gender' as Path<T>, {
              required: t('demographic.genderRequired') || 'Gender is required'
            })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{t('demographic.selectGender') || 'Select gender'}</option>
            <option value="male">{t('demographic.male') || 'Male'}</option>
            <option value="female">{t('demographic.female') || 'Female'}</option>
            <option value="other">{t('demographic.other') || 'Other'}</option>
          </select>
        </div>

        <div>
          <label className="block text-base font-medium text-heading mb-2">
            {t('demographic.dateOfBirth') || 'Date of Birth'} <span className="text-error-500 ml-1">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              {...register('day' as Path<T>, {
                required: t('demographic.dayRequired') || 'Day is required',
                validate: (value) => {
                  const num = Number(value);
                  if (!Number.isFinite(num) || num < 1) return t('demographic.dayMin') || 'Day must be at least 1';
                  if (num > 31) return t('demographic.dayMax') || 'Day must be at most 31';
                  return true;
                },
                min: { value: 1, message: t('demographic.dayMin') || 'Day must be at least 1' },
                max: { value: 31, message: t('demographic.dayMax') || 'Day must be at most 31' }
              })}
              className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t('demographic.selectDay') || 'Day'}</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select
              {...register('month' as Path<T>, {
                required: t('demographic.monthRequired') || 'Month is required',
                validate: (value) => {
                  const num = Number(value);
                  if (!Number.isFinite(num) || num < 1) return t('demographic.monthMin') || 'Month must be at least 1';
                  if (num > 12) return t('demographic.monthMax') || 'Month must be at most 12';
                  return true;
                },
                min: { value: 1, message: t('demographic.monthMin') || 'Month must be at least 1' },
                max: { value: 12, message: t('demographic.monthMax') || 'Month must be at most 12' }
              })}
              className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t('demographic.selectMonth') || 'Month'}</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              {...register('year' as Path<T>, {
                required: t('demographic.yearRequired') || 'Year is required',
                validate: (value) => {
                  const num = Number(value);
                  if (!Number.isFinite(num) || num < 1900) return t('demographic.yearMin') || 'Year must be at least 1900';
                  if (num > new Date().getFullYear()) return t('demographic.yearMax') || 'Year cannot be in the future';
                  return true;
                },
                min: { value: 1900, message: t('demographic.yearMin') || 'Year must be at least 1900' },
                max: { value: new Date().getFullYear(), message: t('demographic.yearMax') || 'Year cannot be in the future' }
              })}
              className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t('demographic.selectYear') || 'Year'}</option>
              {Array.from({ length: 125 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {(errors.day || errors.month || errors.year) && (
            <p className="mt-2 text-sm text-error-600">
              {(errors.day?.message as string) || (errors.month?.message as string) || (errors.year?.message as string)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField
          label={t('demographic.height') || 'Height (cm)'}
          name={'height' as Path<T>}
          register={register}
          type="number"
          validation={{
            min: { value: 50, message: t('demographic.heightMin') || 'Height must be at least 50 cm' },
            max: { value: 250, message: t('demographic.heightMax') || 'Height must be at most 250 cm' }
          }}
          error={errors.height?.message as string}
        />

        <FormInputField
          label={t('demographic.weight') || 'Weight (kg)'}
          name={'weight' as Path<T>}
          register={register}
          type="number"
          validation={{
            min: { value: 20, message: t('demographic.weightMin') || 'Weight must be at least 20 kg' },
            max: { value: 500, message: t('demographic.weightMax') || 'Weight must be at most 500 kg' }
          }}
          error={errors.weight?.message as string}
        />
      </div>
    </div>
  );
};
