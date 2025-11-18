'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Specialty } from '@/types';
import { HttpService } from '@/services/httpService';
import SpecialtyList from './specialty-list';
import SubspecialtyList from './subspecialty-list';

interface SpecialtiesContainerProps {
  className?: string;
  specialties?: Specialty[];
  onSpecialtiesUpdate?: () => void;
}

const SpecialtiesContainer: React.FC<SpecialtiesContainerProps> = ({ className = '', specialties: propSpecialties, onSpecialtiesUpdate }) => {
  const { t } = useLanguage();
  const [specialties, setSpecialties] = useState<Specialty[]>(propSpecialties || []);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const httpService = HttpService.getInstance();

  const loadSpecialties = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use passed specialties or load them if not provided
      if (propSpecialties) {
        setSpecialties(propSpecialties);
      } else {
        const specialtiesData = await httpService.getAllSpecialties();
        setSpecialties(specialtiesData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [httpService, propSpecialties]);

  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  // Update local specialties when propSpecialties change
  useEffect(() => {
    if (propSpecialties) {
      setSpecialties(propSpecialties);
    }
  }, [propSpecialties]);

  const handleSpecialtySelect = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
  };

  const handleSpecialtiesUpdate = () => {
    if (onSpecialtiesUpdate) {
      onSpecialtiesUpdate();
    } else {
      loadSpecialties();
    }
  };

  const handleSubspecialtiesUpdate = async () => {
    // Always reload specialties to get updated subspecialties
    const updatedSpecialties = await httpService.getAllSpecialties();
    setSpecialties(updatedSpecialties);

    // Update the selected specialty with fresh subspecialty data
    if (selectedSpecialty) {
      const updatedSpecialty = updatedSpecialties.find(s => s.id === selectedSpecialty.id);
      if (updatedSpecialty) {
        setSelectedSpecialty(updatedSpecialty);
      }
    }

    // Also call the parent callback if provided
    if (onSpecialtiesUpdate) {
      onSpecialtiesUpdate();
    }
  };


  if (isLoading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-foreground-tertiary">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-foreground-primary mb-2">
            {t('specialtyContainer.loading')}
          </h3>
          <p className="text-sm">{t('specialtyContainer.loadingMessage')}</p>
        </div>
      </div>
    );
  }


  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground-primary">
          {t('specialtyContainer.title')}
        </h2>
        <p className="text-sm text-foreground-secondary mt-1">
          {t('specialtyContainer.subtitle')}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specialties Panel */}
        <div className="space-y-4">
          <div className="bg-background-primary border border-border-primary rounded-lg p-4">
            <SpecialtyList
              specialties={specialties}
              onSpecialtySelect={handleSpecialtySelect}
              selectedSpecialty={selectedSpecialty}
              onSpecialtiesUpdate={handleSpecialtiesUpdate}
            />
          </div>
        </div>

        {/* Subspecialties Panel */}
        <div className="space-y-4">
          <div className="bg-background-primary border border-border-primary rounded-lg p-4">
            <SubspecialtyList
              subspecialties={selectedSpecialty?.subspecialties || []}
              specialtyId={selectedSpecialty?.id || null}
              onSubspecialtiesUpdate={handleSubspecialtiesUpdate}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default SpecialtiesContainer;
