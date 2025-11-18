'use client';

import React, { useState, useCallback } from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { Case } from '@/types/case';
import { PersonalBasicInfoForm } from '../user/user-data';
import { AddressForm } from '../user/address';
import { Demographic } from '../user/demographic';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { HttpService } from '@/services/httpService';
import { useErrorHandler, NotificationCodes } from '@/contexts/ErrorHandlerContext';
import { Button } from '../common/Button';
import DiagnosisForm from '@/components/symptoms/DiagnosisForm';
import { SymptomForm } from '@/components/symptoms/SymptomForm';
import Divider from '../common/Divider';


interface PersonalInformationFormData extends User {
  day: number;
  month: number;
  year: number;
}

interface CreateCaseWizardProps {
  user: User;
}

export const CreateCaseWizard: React.FC<CreateCaseWizardProps> = ({ user }) => {
  const router = useRouter();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
  const { handleCustomError } = useErrorHandler();
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [symptomFormData, setSymptomFormData] = useState<Case | null>(null);
  const [hasDiagnosis, setHasDiagnosis] = useState<boolean>(false);
  const [diagnosisAttachments, setDiagnosisAttachments] = useState<{ id: number; originalName?: string; type: { name: string } }[]>([]);
  const formSubmitRef = React.useRef<(() => void) | null>(null);
  const formResetRef = React.useRef<(() => void) | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PersonalInformationFormData>({
    defaultValues: user ? {
      ...user,
      day: user.dateOfBirth ? new Date(user.dateOfBirth).getDate() : undefined,
      month: user.dateOfBirth ? new Date(user.dateOfBirth).getMonth() + 1 : undefined,
      year: user.dateOfBirth ? new Date(user.dateOfBirth).getFullYear() : undefined,
    } : {
      id: '',
      firstName: '',
      lastName: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      address: undefined,
      day: undefined,
      month: undefined,
      year: undefined,
    },
    mode: 'onChange',
  });

  // Reset form with user data when user prop changes
  React.useEffect(() => {
    if (user) {
      reset({
        ...user,
        day: user.dateOfBirth ? new Date(user.dateOfBirth).getDate() : undefined,
        month: user.dateOfBirth ? new Date(user.dateOfBirth).getMonth() + 1 : undefined,
        year: user.dateOfBirth ? new Date(user.dateOfBirth).getFullYear() : undefined,
      });
    }
  }, [user, reset]);

  const handleCaseDataSubmit = useCallback(async (payload: { has_diagnosis: boolean; symptoms: Array<{ description: string; duration: string; severity: string; }>; formData: Case }) => {
    setCaseData(payload.formData);
    setSymptomFormData(payload.formData);
    setHasDiagnosis(payload.has_diagnosis);
    setCurrentStep(2); // Move to user data step
  }, []);

  const handleUserDataSubmit = async (data: PersonalInformationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Process the form data before saving
      const processedData: User = { ...data };
      
      // Convert date of birth from day, month, year to Date object
      if (data.day && data.month && data.year) {
        // Use UTC to avoid timezone issues when the date gets serialized
        processedData.dateOfBirth = new Date(Date.UTC(data.year, data.month - 1, data.day));
      }
      
      // Normalize optional numeric fields: empty string/undefined -> null, strings -> numbers
      const toNullableNumber = (value: unknown): number | null => {
        if (value === '' || value === undefined || value === null) return null;
        if (typeof value === 'number') return Number.isFinite(value) ? value : null;
        if (typeof value === 'string') {
          const trimmed = value.trim();
          if (trimmed === '') return null;
          const num = Number(trimmed);
          return Number.isFinite(num) ? num : null;
        }
        return null;
      };

      processedData.height = toNullableNumber(data.height as unknown);
      processedData.weight = toNullableNumber(data.weight as unknown);
      
      // Remove the day, month, year fields as they're not part of the User type
      delete (processedData as unknown as Record<string, unknown>).day;
      delete (processedData as unknown as Record<string, unknown>).month;
      delete (processedData as unknown as Record<string, unknown>).year;
      
      // Handle address data: only include if all required fields are provided
      if (data.address) {
        const { county, city, postalCode, street, houseNumber } = data.address;
        
        // Check if all required address fields are provided
        if (county && city && postalCode && street && houseNumber) {
          // Keep the address object as is - backend will handle creation/update
          processedData.address = {
            ...data.address,
            // Convert empty strings to null for optional fields (backend expectation)
            country: (data.address.country && data.address.country.trim() !== '') ? data.address.country : 'România',
            block: data.address.block || null,
            entranceNumber: data.address.entranceNumber || null,
            floor: data.address.floor || null,
            apartmentNumber: data.address.apartmentNumber || null,
          };
        } else {
          // If required fields are missing, don't send address
          delete processedData.address;
        }
      }
      
      // Update user data first
      await updateUser(processedData);
      
      addNotification('success', t('profile.userDataSaved') || 'User data updated successfully', 3000);
      
      // Now create the case
      const httpService = HttpService.getInstance();

      // Defensive check for non-diagnosis path
      if (!hasDiagnosis && (!caseData || !caseData.description || !caseData.duration || !caseData.severity)) {
        handleCustomError(
          NotificationCodes.VALIDATION_ERROR,
          t('symptoms.required') || 'Please fill in all required fields'
        );
        setIsSubmitting(false);
        return;
      }

      // Create the case data in the format expected by the API
      const caseToCreate: {
        has_diagnosis: boolean;
        symptoms: Array<{ description: string; duration: string; severity: string; custom_notes?: string | null }>;
        custom_notes: string | null;
        attachments?: Array<{ id: number; originalName?: string | null; type: { name: string }; is_diagnosis: boolean }>;
      } = hasDiagnosis ? {
        has_diagnosis: true,
        symptoms: [],
        custom_notes: null,
        attachments: diagnosisAttachments.map(a => ({ id: a.id, originalName: a.originalName || null, type: { name: a.type.name }, is_diagnosis: true })),
      } : {
        has_diagnosis: false,
        symptoms: [{
          description: caseData!.description!,
          duration: caseData!.duration!,
          severity: caseData!.severity!,
        }],
        custom_notes: null,
      };

      await httpService.createCase(caseToCreate);

      addNotification('success', t('symptoms.submitted'), 5000);

      // Redirect to the created case or show success message
      router.push('/user/profile'); // or wherever you want to redirect
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };


  // Check if step 2 is valid (personal info and address)
  const isStep2Valid = () => {
    const watchedValues = watch();
    return !!(
      watchedValues.firstName &&
      watchedValues.lastName &&
      watchedValues.address?.county &&
      watchedValues.address?.city &&
      watchedValues.address?.postalCode &&
      watchedValues.address?.street &&
      watchedValues.address?.houseNumber
    );
  };

  // Check if step 3 is valid (demographic info)
  const isStep3Valid = () => {
    const watched = watch() as unknown as { gender?: string; day?: number | string; month?: number | string; year?: number | string };
    const hasGender = !!watched.gender;
    const hasDay = !!watched.day;
    const hasMonth = !!watched.month;
    const hasYear = !!watched.year;
    const hasFieldErrors = Boolean((errors as unknown as Record<string, unknown>).gender || errors.day || errors.month || errors.year);
    return hasGender && hasDay && hasMonth && hasYear && !hasFieldErrors;
  };

  return (
    <div className="min-h-screen bg-background-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card-elevated">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-heading mb-2">
              {t('wizard.createCase')}
            </h1>
            <p className="text-body">
              {t('wizard.createCaseDescription')}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1 ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">{t('symptoms.title') || 'Symptoms'}</span>
              </div>
              <div className={`w-16 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2 ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">{t('wizard.personalInfo')}</span>
              </div>
              <div className={`w-16 h-0.5 mx-4 ${currentStep >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 3 ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium">{t('wizard.demographic')}</span>
              </div>
            </div>
          </div>

          <Divider marginClass="my-1" />

          {/* Step 1: Symptoms or Diagnosis Upload */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {hasDiagnosis ? (t('case.details.documents') || 'Documents') : t('symptoms.title')}
              </h3>
              {/* Has Diagnosis Toggle */}
              <div className="flex items-center p-3 bg-neutral-50 rounded-md border border-border-primary">
                <label htmlFor="hasDiagnosis" className="flex items-center gap-3 cursor-pointer">
                  <input
                    id="hasDiagnosis"
                    type="checkbox"
                    className="sr-only"
                    checked={hasDiagnosis}
                    onChange={(e) => setHasDiagnosis(e.target.checked)}
                  />
                  <div className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${hasDiagnosis ? 'bg-primary-600' : 'bg-neutral-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${hasDiagnosis ? 'translate-x-5' : 'translate-x-0'}`}></span>
                  </div>
                  <span className="text-sm text-foreground-primary">{t('case.create.hasDiagnosis') || 'I already have a diagnosis'}</span>
                </label>
              </div>
              {hasDiagnosis ? (
                <DiagnosisForm
                  attachments={diagnosisAttachments.map(a => ({ id: a.id, originalName: a.originalName, type: { name: a.type.name } }))}
                  onAddDetailed={({ id, originalName, typeName }) => {
                    setDiagnosisAttachments(prev => {
                      // If we already have an entry for this upload session, keep the originalName if present
                      const existsIdx = prev.findIndex(x => x.originalName === originalName || x.id === id);
                      if (existsIdx >= 0) {
                        const next = [...prev];
                        next[existsIdx] = { id, originalName: next[existsIdx].originalName || originalName, type: { name: typeName } };
                        return next;
                      }
                      return [...prev, { id, originalName, type: { name: typeName } }];
                    });
                  }}
                  onDelete={(id) => setDiagnosisAttachments(prev => prev.filter(x => x.id !== id))}
                />
              ) : (
                <SymptomForm
                  onCaseDataSubmit={handleCaseDataSubmit}
                  savedFormData={symptomFormData}
                  registerExternal={({ submit, reset }) => {
                    // Render buttons below and hook into form handlers
                    formSubmitRef.current = submit;
                    formResetRef.current = reset;
                  }}
                />
              )}

              <Divider marginClass="my-1" />
              
              <div className="flex justify-end gap-4 pt-4">
                {!hasDiagnosis && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => formResetRef.current?.()}
                    className="bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200 hover:text-neutral-800"
                  >
                    {t('symptoms.reset')}
                  </Button>
                )}
                
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    if (hasDiagnosis) {
                      if (diagnosisAttachments.length > 0) {
                        setCurrentStep(2);
                      }
                    } else {
                      formSubmitRef.current?.();
                    }
                  }}
                  disabled={hasDiagnosis && diagnosisAttachments.length === 0}
                  className="bg-primary-600 hover:bg-primary-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information and Address */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit(handleUserDataSubmit)} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('profile.personalInformation')}
              </h3>
              
              {/* Personal Details */}
              <div className="space-y-4">
                <PersonalBasicInfoForm register={register as unknown as UseFormRegister<User>} errors={errors as unknown as FieldErrors<User>} />
              </div>

              {/* Address */}
              <div className="space-y-4">
                <AddressForm register={register as unknown as UseFormRegister<User>} errors={errors as unknown as FieldErrors<User>} />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  className="bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200 hover:text-neutral-800"
                >
                  {t('common.back')}
                </Button>
                
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid()}
                  className="bg-primary-600 hover:bg-primary-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.next')}
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Demographic Information */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit(handleUserDataSubmit)} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('wizard.demographic')}
              </h3>
              
              <Demographic register={register} errors={errors} />

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  className="bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200 hover:text-neutral-800"
                >
                  {t('common.back')}
                </Button>
                
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting || !isStep3Valid()}
                  className="bg-primary-600 hover:bg-primary-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('common.loading') : t('wizard.saveAndSubmit')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
