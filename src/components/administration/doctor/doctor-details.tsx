'use client';

import React, { useState, useEffect } from 'react';
import { useForm, UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { DoctorProfile, Subspecialty, Specialty } from '@/types';
import DoctorFormFields, { DoctorFormData } from '../../doctor/DoctorFormFields';

interface DoctorDetailsProps {
  doctor?: DoctorProfile | null;
  isEditing: boolean;
  onSave: (doctorData: Partial<DoctorProfile>) => void;
  onCancel: () => void;
  availableSubspecialties?: Subspecialty[];
  availableSpecialties?: Specialty[];
  isLoading?: boolean;
  onSpecialtiesUpdate?: () => void;
}

type AdminDoctorFormData = DoctorFormData & {
  isActive: boolean;
  email: string;
};

const DoctorDetails: React.FC<DoctorDetailsProps> = ({
  doctor,
  isEditing,
  onSave,
  onCancel,
  availableSubspecialties: _availableSubspecialties = [], // eslint-disable-line @typescript-eslint/no-unused-vars
  availableSpecialties = [],
  isLoading = false,
}) => {
  const { t } = useLanguage();
  const [specialties, setSpecialties] = useState<DoctorProfile['specialties']>([]);
  
  // For additional specialties section
  const [additionalSpecialtyId, setAdditionalSpecialtyId] = useState<number | ''>('');
  const [additionalSubspecialtyId, setAdditionalSubspecialtyId] = useState<number | ''>('');

  const { register, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm<AdminDoctorFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      licenseNumber: '',
      licenseExpiryDate: '',
      isActive: true,
      bio: '',
      consultationFee: 0,
      lan: 'de',
      firstName: '',
      lastName: '',
      email: '',
      specialtyId: 0,
      subspecialtyId: 0
    }
  });

  const watchedSpecialtyId = watch('specialtyId');

  useEffect(() => {
    if (doctor) {
      // Try to match existing specialty and subspecialty
      let matchedSpecialtyId = 0;
      let matchedSubspecialtyId = 0;
      let additionalSpecialties: DoctorProfile['specialties'] = [];
      
      if (doctor.specialties && doctor.specialties.length > 0) {
        // Find the primary specialty (isPrimary = true)
        const primarySpecialty = doctor.specialties.find(spec => spec.isPrimary);
        if (primarySpecialty) {
          matchedSpecialtyId = primarySpecialty.specialty.id;
          matchedSubspecialtyId = primarySpecialty.subspecialty?.id || 0;
          // Set additional specialties (non-primary ones)
          additionalSpecialties = doctor.specialties.filter(spec => !spec.isPrimary);
        }
      }

      reset({
        title: doctor.title || '',
        licenseNumber: doctor.licenseNumber || '',
        licenseExpiryDate: doctor.licenseExpiryDate || '',
        isActive: doctor.isActive ?? true,
        bio: doctor.bio || '',
        consultationFee: doctor.consultationFee || 0,
        lan: doctor.lan || 'de',
        firstName: doctor.user?.firstName || '',
        lastName: doctor.user?.lastName || '',
        email: '', // Email is not stored in doctor profile, only used for creation
        specialtyId: matchedSpecialtyId,
        subspecialtyId: matchedSubspecialtyId
      });
      setSpecialties(additionalSpecialties);
    } else {
      reset({
        title: '',
        licenseNumber: '',
        licenseExpiryDate: '',
        isActive: true,
        bio: '',
        consultationFee: 0,
        lan: 'de',
        firstName: '',
        lastName: '',
        email: '',
        specialtyId: 0,
        subspecialtyId: 0
      });
      setSpecialties([]);
      setAdditionalSpecialtyId('');
      setAdditionalSubspecialtyId('');
    }
  }, [doctor, reset, availableSpecialties]);

  // Reset subspecialty when specialty changes
  useEffect(() => {
    if (watchedSpecialtyId && watchedSpecialtyId > 0) {
      const currentValues = watch();
      reset({ ...currentValues, subspecialtyId: 0 });
    }
  }, [watchedSpecialtyId, reset, watch]);

  const handleAddSpecialty = () => {
    if (additionalSpecialtyId) {
      const selectedSpecialty = availableSpecialties.find(spec => spec.id === Number(additionalSpecialtyId));
      if (selectedSpecialty) {
        const selectedSubspecialty = additionalSubspecialtyId ? 
          selectedSpecialty.subspecialties?.find(sub => sub.id === Number(additionalSubspecialtyId)) : 
          null;
        
        // Check if this exact specialty-subspecialty combination already exists
        const isDuplicate = specialties?.some(spec => 
          spec.specialty.id === Number(additionalSpecialtyId) && 
          spec.subspecialty?.id === (selectedSubspecialty?.id || null)
        );
        
        if (!isDuplicate) {
          const newSpecialty = {
            id: 0, // This will be set by the backend
            doctorProfileId: 0, // This will be set by the backend
            specialty: selectedSpecialty,
            subspecialty: selectedSubspecialty || undefined,
            isPrimary: false,
            createdAt: new Date()
          };
          
          setSpecialties(prev => [...(prev || []), newSpecialty]);
          setAdditionalSubspecialtyId('');
          setAdditionalSpecialtyId('');
        }
      }
    }
  };

  const handleRemoveSpecialty = (specialtyIdToRemove: number) => {
    setSpecialties(prev => (prev || []).filter(spec => spec.specialty.id !== specialtyIdToRemove));
  };

  // Helper function to remove null/undefined values from an object
  const removeNullValues = (obj: unknown): unknown => {
    if (obj === null || obj === undefined) return undefined;
    if (Array.isArray(obj)) {
      return obj.map(removeNullValues).filter(item => item !== undefined);
    }
    if (typeof obj === 'object' && obj !== null) {
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        const cleanedValue = removeNullValues(value);
        if (cleanedValue !== undefined && cleanedValue !== null) {
          cleaned[key] = cleanedValue;
        }
      }
      return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }
    return obj;
  };

  const onSubmit = (data: AdminDoctorFormData) => {
    // Convert string values to numbers for backend compatibility
    const specialtyId = Number(data.specialtyId);
    const subspecialtyId = Number(data.subspecialtyId);
    const consultationFee = Number(data.consultationFee) || 0;
    
    // Start with additional specialties
    let allSpecialties = [...(specialties || [])];
    
    // Always add a primary specialty entry
      if (specialtyId && specialtyId > 0) {
        // Get the selected specialty data
        const selectedSpecialty = availableSpecialties.find(s => s.id === specialtyId);
        
        if (selectedSpecialty) {
          // Get the selected subspecialty if one is chosen
          const selectedSubspecialty = subspecialtyId && subspecialtyId > 0 ? 
            selectedSpecialty.subspecialties?.find(sub => sub.id === subspecialtyId) : 
            null;
          
          // Create the primary specialty entry
          const primarySpecialty = {
            id: 0, // Will be set by backend
            doctorProfileId: 0, // Will be set by backend
            specialty: selectedSpecialty,
            subspecialty: selectedSubspecialty || undefined,
            isPrimary: true,
            createdAt: new Date()
          };
          
          // Add primary specialty to the beginning
          allSpecialties = [primarySpecialty, ...allSpecialties];
        }
      }

    const doctorData: Partial<DoctorProfile> = {
      title: data.title,
      licenseNumber: data.licenseNumber,
      licenseExpiryDate: data.licenseExpiryDate,
      isActive: data.isActive,
      bio: data.bio,
      consultationFee: consultationFee,
      lan: data.lan,
      userId: doctor?.userId,
      specialties: allSpecialties,
      user: {
        ...doctor?.user,
        firstName: data.firstName,
        lastName: data.lastName,
        id: doctor?.user?.id || '',
        email: data.email // Include email for new doctor creation
      }
    };

    // Remove null/undefined values to match API Gateway schema requirements
    const cleanedDoctorData = removeNullValues(doctorData) as Partial<DoctorProfile>;
    onSave(cleanedDoctorData);
  };


  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={isEditing ? t('doctor.details.edit') : t('doctor.details.create')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <DoctorFormFields
          register={register as unknown as UseFormRegister<DoctorFormData>}
          errors={errors as unknown as FieldErrors<DoctorFormData>}
          watch={watch as unknown as UseFormWatch<DoctorFormData>}
          availableSpecialties={availableSpecialties}
          specialties={specialties || []}
          additionalSpecialtyId={additionalSpecialtyId}
          additionalSubspecialtyId={additionalSubspecialtyId}
          onAdditionalSpecialtyChange={setAdditionalSpecialtyId}
          onAdditionalSubspecialtyChange={setAdditionalSubspecialtyId}
          onAddSpecialty={handleAddSpecialty}
          onRemoveSpecialty={handleRemoveSpecialty}
          showEmailField={!isEditing}
          showIsActiveField={true}
          isActive={watch('isActive')}
          onIsActiveChange={(checked) => {
            const currentValues = watch();
            reset({ ...currentValues, isActive: checked });
          }}
        />

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border-primary">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            disabled={isLoading}
          >
            {t('doctor.details.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !isValid || !watchedSpecialtyId || watchedSpecialtyId === 0}
          >
            {isLoading ? t('common.working') : t('doctor.details.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DoctorDetails;