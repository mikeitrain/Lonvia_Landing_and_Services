'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button';
import { DoctorProfile, Specialty } from '@/types';
import { HttpService } from '@/services/httpService';
import { useNotifications } from '@/contexts/NotificationContext';
import DoctorFormFields, { DoctorFormData } from './DoctorFormFields';

const DoctorDetailsForm: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const httpService = React.useMemo(() => HttpService.getInstance(), []);
  
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [specialties, setSpecialties] = useState<DoctorProfile['specialties']>([]);
  const [availableSpecialties, setAvailableSpecialties] = useState<Specialty[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // For additional specialties section
  const [additionalSpecialtyId, setAdditionalSpecialtyId] = useState<number | ''>('');
  const [additionalSubspecialtyId, setAdditionalSubspecialtyId] = useState<number | ''>('');

  const { register, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm<DoctorFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      licenseNumber: '',
      licenseExpiryDate: '',
      bio: '',
      consultationFee: 0,
      lan: 'de',
      firstName: '',
      lastName: '',
      specialtyId: 0,
      subspecialtyId: 0
    }
  });

  const watchedSpecialtyId = watch('specialtyId');

  // Load doctor profile and specialties
  useEffect(() => {
    const loadData = async () => {     
      // Load specialties first
      const specialtiesData = await httpService.getAllSpecialties();
      setAvailableSpecialties(specialtiesData);
      
      // Load doctor profile
      const doctorsResponse = await httpService.getDoctorSelf();

      if (doctorsResponse) {
        setDoctor(doctorsResponse);
      }
    };

    loadData();
  }, [httpService]);

  // Initialize form when doctor data is loaded
  useEffect(() => {
    if (doctor && availableSpecialties.length > 0) {
      let matchedSpecialtyId = 0;
      let matchedSubspecialtyId = 0;
      let additionalSpecialties: DoctorProfile['specialties'] = [];
      
      if (doctor.specialties && doctor.specialties.length > 0) {
        const primarySpecialty = doctor.specialties.find(spec => spec.isPrimary);
        if (primarySpecialty) {
          matchedSpecialtyId = primarySpecialty.specialty.id;
          matchedSubspecialtyId = primarySpecialty.subspecialty?.id || 0;
          additionalSpecialties = doctor.specialties.filter(spec => !spec.isPrimary);
        }
      }

      reset({
        title: doctor.title || '',
        licenseNumber: doctor.licenseNumber || '',
        licenseExpiryDate: doctor.licenseExpiryDate || '',
        bio: doctor.bio || '',
        consultationFee: doctor.consultationFee || 0,
        lan: doctor.lan || 'de',
        firstName: doctor.user?.firstName || '',
        lastName: doctor.user?.lastName || '',
        specialtyId: matchedSpecialtyId,
        subspecialtyId: matchedSubspecialtyId
      });
      setSpecialties(additionalSpecialties);
    }
  }, [doctor, reset, availableSpecialties]);

  // Reset subspecialty when specialty changes
  useEffect(() => {
    if (watchedSpecialtyId && watchedSpecialtyId > 0) {
      const currentValues = watch();
      reset({ ...currentValues, subspecialtyId: 0 });
    }
  }, [watchedSpecialtyId, reset, watch]);

  const getAvailableSubspecialties = (specialtyId: number) => {
    if (!specialtyId || specialtyId === 0) return [];
    const specialty = availableSpecialties.find(s => s.id === specialtyId);
    return specialty?.subspecialties || [];
  };

  const handleAddSpecialty = () => {
    if (additionalSpecialtyId) {
      const selectedSpecialty = availableSpecialties.find(spec => spec.id === Number(additionalSpecialtyId));
      if (selectedSpecialty) {
        const selectedSubspecialty = additionalSubspecialtyId ? 
          getAvailableSubspecialties(Number(additionalSpecialtyId)).find(sub => sub.id === Number(additionalSubspecialtyId)) : 
          null;
        
        const isDuplicate = specialties?.some(spec => 
          spec.specialty.id === Number(additionalSpecialtyId) && 
          spec.subspecialty?.id === (selectedSubspecialty?.id || null)
        );
        
        if (!isDuplicate) {
          const newSpecialty = {
            id: 0,
            doctorProfileId: 0,
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

  const onSubmit = async (data: DoctorFormData) => {
    setIsSaving(true);
    try {
      const specialtyId = Number(data.specialtyId);
      const subspecialtyId = Number(data.subspecialtyId);
      const consultationFee = Number(data.consultationFee) || 0;
      
      let allSpecialties = [...(specialties || [])];
      
      if (specialtyId && specialtyId > 0) {
        const selectedSpecialty = availableSpecialties.find(s => s.id === specialtyId);
        
        if (selectedSpecialty) {
          const selectedSubspecialty = subspecialtyId && subspecialtyId > 0 ? 
            getAvailableSubspecialties(specialtyId).find(sub => sub.id === subspecialtyId) : 
            null;
          
          const primarySpecialty = {
            id: 0,
            doctorProfileId: 0,
            specialty: selectedSpecialty,
            subspecialty: selectedSubspecialty || undefined,
            isPrimary: true,
            createdAt: new Date()
          };
          
          allSpecialties = [primarySpecialty, ...allSpecialties];
        }
      }

      const doctorData: Partial<DoctorProfile> = {
        title: data.title,
        licenseNumber: data.licenseNumber,
        licenseExpiryDate: data.licenseExpiryDate,
        isActive: doctor?.isActive ?? true, // Keep existing isActive status
        bio: data.bio,
        consultationFee: consultationFee,
        lan: data.lan,
        userId: doctor?.userId || user?.id || '',
        specialties: allSpecialties,
        user: {
          ...doctor?.user,
          firstName: data.firstName,
          lastName: data.lastName,
          id: doctor?.user?.id || user?.id || ''
          // Note: Email is not included as doctors cannot change it
        }
      };

      const cleanedDoctorData = removeNullValues(doctorData) as Partial<DoctorProfile>;
      const updatedDoctor = await httpService.upsertDoctor(cleanedDoctorData as DoctorProfile);
      
      setDoctor(updatedDoctor);
      addNotification('success', 'Profile updated successfully');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <DoctorFormFields
          register={register}
          errors={errors}
          watch={watch}
          availableSpecialties={availableSpecialties}
          specialties={specialties || []}
          additionalSpecialtyId={additionalSpecialtyId}
          additionalSubspecialtyId={additionalSubspecialtyId}
          onAdditionalSpecialtyChange={setAdditionalSpecialtyId}
          onAdditionalSubspecialtyChange={setAdditionalSubspecialtyId}
          onAddSpecialty={handleAddSpecialty}
          onRemoveSpecialty={handleRemoveSpecialty}
          showEmailField={false}
          showIsActiveField={false}
        />

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border-primary">
          <Button
            type="submit"
            disabled={isSaving || !isValid || !watchedSpecialtyId || watchedSpecialtyId === 0}
          >
            {isSaving ? t('common.working') : t('doctor.details.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DoctorDetailsForm;
