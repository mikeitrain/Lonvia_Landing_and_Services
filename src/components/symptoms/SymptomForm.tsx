'use client';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Case } from '@/types/case';
// Buttons will be rendered by the wizard; this component exposes submit/reset APIs

interface SymptomFormProps {
  onCaseDataSubmit: (caseData: { has_diagnosis: boolean; symptoms: Array<{ description: string; duration: string; severity: string; }>; formData: Case }) => void;
  savedFormData?: Case | null;
  registerExternal?: (api: { submit: () => void; reset: () => void }) => void;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ onCaseDataSubmit, savedFormData, registerExternal }) => {
  const { t } = useLanguage();

  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm<Case>({
    defaultValues: savedFormData || {
      description: '',
      duration: '',
      severity: '',
    }
  });

  React.useEffect(() => {
    if (savedFormData) {
      setValue('description', savedFormData.description || '');
      setValue('duration', savedFormData.duration || '');
      setValue('severity', savedFormData.severity || '');
    }
  }, [savedFormData, setValue]);

  const onSubmit = useCallback(async (data: Case) => {
    onCaseDataSubmit({
      has_diagnosis: false,
      symptoms: [{
        description: data.description!,
        duration: data.duration!,
        severity: data.severity!,
      }],
      formData: data
    });
  }, [onCaseDataSubmit]);

  React.useEffect(() => {
    if (registerExternal) {
      registerExternal({
        submit: () => handleSubmit(onSubmit)(),
        reset: () => reset(),
      });
    }
  }, [registerExternal, handleSubmit, onSubmit, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Symptoms Description */}
      <div>
        <label className="block text-base font-medium text-heading mb-2">
          {t('symptoms.description')}
          <span className="text-error-500 ml-1">*</span>
        </label>
        <textarea
          {...register('description', {
            required: (t('symptoms.required') as unknown as string),
            maxLength: {
              value: 2000,
              message: t('symptoms.maxLengthExceeded')
            }
          })}
          rows={4}
          maxLength={2000}
          className="input-field resize-none"
          placeholder={t('symptoms.placeholder')}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className="text-sm text-error-600">{errors.description.message}</p>
          )}
          <span className="text-sm text-body-secondary ml-auto">
            {watch('description')?.length || 0}/2000
          </span>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-base font-medium text-heading mb-2">
          {t('symptoms.duration')}
          <span className="text-error-500 ml-1">*</span>
        </label>
        <select
          {...register('duration', {
            required: (t('symptoms.durationRequired') as unknown as string)
          })}
          className="input-field"
        >
          <option value="">{t('symptoms.selectDuration')}</option>
          <option value="less_than_24h">{t('symptoms.lessThan24h')}</option>
          <option value="1_to_3_days">{t('symptoms.1to3Days')}</option>
          <option value="3_to_7_days">{t('symptoms.3to7Days')}</option>
          <option value="1_to_2_weeks">{t('symptoms.1to2Weeks')}</option>
          <option value="more_than_2_weeks">{t('symptoms.moreThan2Weeks')}</option>
        </select>
        {errors.duration && (
          <p className="mt-2 text-sm text-error-600">{errors.duration.message}</p>
        )}
      </div>

      {/* Severity */}
      <div>
        <label className="block text-base font-medium text-heading mb-2">
          {t('symptoms.severity')}
          <span className="text-error-500 ml-1">*</span>
        </label>
        <select
          {...register('severity', {
            required: (t('symptoms.severityRequired') as unknown as string)
          })}
          className="input-field"
        >
          <option value="">{t('symptoms.selectSeverity')}</option>
          <option value="mild">{t('symptoms.mild')}</option>
          <option value="moderate">{t('symptoms.moderate')}</option>
          <option value="severe">{t('symptoms.severe')}</option>
        </select>
        {errors.severity && (
          <p className="mt-2 text-sm text-error-600">{errors.severity.message}</p>
        )}
      </div>

      {/* Navigation buttons are handled by the wizard */}
    </form>
  );
};