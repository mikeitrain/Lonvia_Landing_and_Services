'use client'

import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormInputField } from '@/components/common/FormInputField';
import { CurrencyInputField } from '@/components/common/CurrencyInputField';
import { Button } from '@/components/common/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Specialty, Subspecialty } from '@/types';

export type DoctorFormData = {
  title: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  bio: string;
  consultationFee: number;
  lan: string;
  firstName: string;
  lastName: string;
  email?: string;
  specialtyId: number;
  subspecialtyId: number;
};

interface DoctorFormFieldsProps {
  register: UseFormRegister<DoctorFormData>;
  errors: FieldErrors<DoctorFormData>;
  watch: UseFormWatch<DoctorFormData>;
  availableSpecialties: Specialty[];
  specialties: Array<{
    id: number;
    doctorProfileId: number;
    specialty: Specialty;
    subspecialty?: Subspecialty;
    isPrimary: boolean;
    createdAt: Date;
  }>;
  additionalSpecialtyId: number | '';
  additionalSubspecialtyId: number | '';
  onAdditionalSpecialtyChange: (specialtyId: number | '') => void;
  onAdditionalSubspecialtyChange: (subspecialtyId: number | '') => void;
  onAddSpecialty: () => void;
  onRemoveSpecialty: (specialtyId: number) => void;
  showEmailField?: boolean;
  showIsActiveField?: boolean;
  isActive?: boolean;
  onIsActiveChange?: (isActive: boolean) => void;
}

const DoctorFormFields: React.FC<DoctorFormFieldsProps> = ({
  register,
  errors,
  watch,
  availableSpecialties,
  specialties,
  additionalSpecialtyId,
  additionalSubspecialtyId,
  onAdditionalSpecialtyChange,
  onAdditionalSubspecialtyChange,
  onAddSpecialty,
  onRemoveSpecialty,
  showEmailField = false,
  showIsActiveField = false,
  isActive = true,
  onIsActiveChange
}) => {
  const { t, language } = useLanguage();
  
  const watchedSpecialtyId = watch('specialtyId');
  const watchedSubspecialtyId = watch('subspecialtyId');

  const getAvailableSubspecialties = (specialtyId: number) => {
    if (!specialtyId || specialtyId === 0) return [];
    const specialty = availableSpecialties.find(s => s.id === specialtyId);
    return specialty?.subspecialties || [];
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField
          label={t('doctor.details.firstName')}
          name="firstName"
          register={register}
          required
          error={errors.firstName?.message}
          validation={{ required: 'First name is required' }}
        />
        <FormInputField
          label={t('doctor.details.lastName')}
          name="lastName"
          register={register}
          required
          error={errors.lastName?.message}
          validation={{ required: 'Last name is required' }}
        />
      </div>

      {/* Email field - only shown for new doctor creation */}
      {showEmailField && (
        <div>
          <FormInputField
            label={t('doctor.details.email')}
            name="email"
            type="email"
            register={register}
            required
            error={errors.email?.message}
            validation={{ 
              required: 'Email is required for new doctor creation',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            placeholder="doctor@example.com"
          />
        </div>
      )}

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground-primary mb-2">
          {t('doctor.details.language')} *
        </label>
        <select
          {...register('lan', { required: 'Language is required' })}
          className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="de">{t('language.german')}</option>
          <option value="en">{t('language.english')}</option>
          <option value="ro">{t('language.romanian')}</option>
        </select>
        {errors.lan && <p className="mt-2 text-sm text-error-600">{errors.lan.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField
          label={t('doctor.details.titleField')}
          name="title"
          register={register}
          required
          error={errors.title?.message}
          validation={{ required: 'Title is required' }}
          placeholder="e.g., Dr. med., Prof., Dr. med. dent."
        />
        <FormInputField
          label={t('doctor.details.licenseNumber')}
          name="licenseNumber"
          register={register}
          error={errors.licenseNumber?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField
          label={t('doctor.details.licenseExpiry')}
          name="licenseExpiryDate"
          register={register}
          type="date"
          error={errors.licenseExpiryDate?.message}
        />
        <CurrencyInputField
          label={t('doctor.details.consultationFee')}
          name="consultationFee"
          register={register}
          error={errors.consultationFee?.message}
          placeholder="Enter consultation fee"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-foreground-primary mb-2">
          {t('doctor.details.bio')}
        </label>
        <textarea
          {...register('bio')}
          rows={4}
          className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter doctor's biography..."
        />
        {errors.bio && <p className="mt-2 text-sm text-error-600">{errors.bio.message}</p>}
      </div>

      {/* Specialty and Subspecialty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground-primary mb-2">
            Specialty *
          </label>
          <select
            {...register('specialtyId', { required: 'Specialty is required', min: { value: 1, message: 'Please select a specialty' } })}
            className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value={0}>Select specialty...</option>
            {availableSpecialties.map(specialty => (
              <option key={specialty.id} value={specialty.id}>
                {language === 'de' ? specialty.nameDe : 
                 language === 'ro' ? specialty.nameRo : 
                 specialty.nameEn}
              </option>
            ))}
          </select>
          {errors.specialtyId && <p className="mt-2 text-sm text-error-600">{errors.specialtyId.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground-primary mb-2">
            Subspecialty
          </label>
          <select
            {...register('subspecialtyId')}
            className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={!watchedSpecialtyId || watchedSpecialtyId === 0}
          >
            <option value={0}>Select subspecialty...</option>
            {getAvailableSubspecialties(Number(watchedSpecialtyId))
              .filter(sub => {
                const isAlreadySelected = specialties?.some(selected => selected.subspecialty?.id === sub.id);
                return !isAlreadySelected;
              })
              .map(subspecialty => (
                <option key={subspecialty.id} value={subspecialty.id}>
                  {language === 'de' ? subspecialty.nameDe : 
                   language === 'ro' ? subspecialty.nameRo : 
                   subspecialty.nameEn}
                </option>
              ))}
          </select>
          {errors.subspecialtyId && <p className="mt-2 text-sm text-error-600">{errors.subspecialtyId.message}</p>}
        </div>
      </div>

      {/* Additional Specialties */}
      <div>
        <label className="block text-sm font-medium text-foreground-primary mb-2">
          Additional Specialties
        </label>
        <div className="space-y-3">
          {/* Add new specialty row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-1">
                Specialty
              </label>
              <select
                value={additionalSpecialtyId}
                onChange={(e) => {
                  const newSpecialtyId = e.target.value ? Number(e.target.value) : '';
                  onAdditionalSpecialtyChange(newSpecialtyId);
                  onAdditionalSubspecialtyChange('');
                }}
                className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select specialty...</option>
                {availableSpecialties.map(specialty => (
                  <option key={specialty.id} value={specialty.id}>
                    {language === 'de' ? specialty.nameDe : 
                     language === 'ro' ? specialty.nameRo : 
                     specialty.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-1">
                Subspecialty
              </label>
              <select
                value={additionalSubspecialtyId}
                onChange={(e) => onAdditionalSubspecialtyChange(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={!additionalSpecialtyId || additionalSpecialtyId === 0}
              >
                <option value="">Select subspecialty...</option>
                {getAvailableSubspecialties(Number(additionalSpecialtyId))
                  .filter(sub => {
                    const isAlreadySelected = specialties?.some(selected => 
                      selected.specialty.id === Number(additionalSpecialtyId) && 
                      selected.subspecialty?.id === sub.id
                    );
                    const isPrimarySubspecialty = watchedSubspecialtyId && watchedSubspecialtyId > 0 && sub.id === watchedSubspecialtyId;
                    return !isAlreadySelected && !isPrimarySubspecialty;
                  })
                  .map(subspecialty => (
                    <option key={subspecialty.id} value={subspecialty.id}>
                      {language === 'de' ? subspecialty.nameDe : 
                       language === 'ro' ? subspecialty.nameRo : 
                       subspecialty.nameEn}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <Button
                type="button"
                onClick={onAddSpecialty}
                disabled={!additionalSpecialtyId}
                className="w-full"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Display selected specialties */}
          {specialties && specialties.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {specialties.map((doctorSpecialty) => {
                const specialtyName = language === 'de' ? doctorSpecialty.specialty.nameDe : 
                  language === 'ro' ? doctorSpecialty.specialty.nameRo : 
                  doctorSpecialty.specialty.nameEn;
                
                const subspecialtyName = doctorSpecialty.subspecialty ? 
                  (language === 'de' ? doctorSpecialty.subspecialty.nameDe : 
                   language === 'ro' ? doctorSpecialty.subspecialty.nameRo : 
                   doctorSpecialty.subspecialty.nameEn) : 
                  null;
                
                return (
                  <span
                    key={doctorSpecialty.specialty.id}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {specialtyName}
                    {subspecialtyName && ` - ${subspecialtyName}`}
                    <Button
                      type="button"
                      onClick={() => onRemoveSpecialty(doctorSpecialty.specialty.id)}
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-primary-600 hover:text-primary-800 h-6 w-6"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Active Status - only shown in admin context */}
      {showIsActiveField && (
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => onIsActiveChange?.(e.target.checked)}
              className="mr-2"
            />
            {t('doctor.details.isActive')}
          </label>
        </div>
      )}
    </div>
  );
};

export default DoctorFormFields;
