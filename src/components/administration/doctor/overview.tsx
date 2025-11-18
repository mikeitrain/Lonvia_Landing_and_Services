'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorDetails from './doctor-details';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Button } from '@/components/common/Button';
import { UserPlusIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { DoctorProfile, Specialty } from '@/types';
import { HttpService } from '@/services/httpService';

interface DoctorOverviewProps {
  className?: string;
  specialties?: Specialty[];
  onSpecialtiesUpdate?: () => void;
}

const DoctorOverview: React.FC<DoctorOverviewProps> = ({ className = '', specialties: propSpecialties, onSpecialtiesUpdate }) => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [specialties, setSpecialties] = useState<Specialty[]>(propSpecialties || []);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const httpService = HttpService.getInstance();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load doctors
        const doctorsResponse = await httpService.getAllDoctors({});
        setDoctors(doctorsResponse.doctors || []);

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
    };

    loadData();
  }, [httpService, propSpecialties]);

  const handleDoctorClick = (doctor: DoctorProfile) => {
    setSelectedDoctor(doctor);
  };

  const handleDoctorDoubleClick = (doctor: DoctorProfile) => {
    setSelectedDoctor(doctor);
    setIsEditing(true);
    setShowDoctorDetails(true);
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsEditing(false);
    setShowDoctorDetails(true);
  };

  const handleDeleteDoctor = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteDoctor = async () => {
    if (selectedDoctor) {
      await httpService.deleteDoctor(selectedDoctor.id?.toString() || '');
      setDoctors(doctors.filter(d => d.id !== selectedDoctor.id));
      setSelectedDoctor(null);
    }
    setShowDeleteConfirmation(false);
  };

  const handleSaveDoctor = async (doctorData: Partial<DoctorProfile>) => {
    setIsSaving(true);
    try {
      // For new doctor creation, pass email as query parameter
      const queryParams = !isEditing && doctorData.user?.email ?
        { email: doctorData.user.email } :
        undefined;

      const savedDoctor = await httpService.upsertDoctor(doctorData as DoctorProfile, queryParams);

      if (isEditing && selectedDoctor) {
        // Update existing doctor in local state
        setDoctors(doctors.map(d =>
          d.id === selectedDoctor.id
            ? savedDoctor
            : d
        ));
      } else {
        // Add new doctor to local state
        setDoctors([...doctors, savedDoctor]);
      }

      setShowDoctorDetails(false);
      setSelectedDoctor(null);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setShowDoctorDetails(false);
    setSelectedDoctor(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-foreground-tertiary">
          <h3 className="text-lg font-semibold text-foreground-primary mb-2">
            {t('doctor.overview.loading')}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground-primary">
          {t('doctor.overview.title')}
        </h2>
        <div className="flex space-x-3">
          <Button onClick={handleAddDoctor} className="flex items-center">
            <UserPlusIcon className="w-5 h-5 mr-2" />
            {t('doctor.overview.add')}
          </Button>
          <Button
            onClick={handleDeleteDoctor}
            disabled={!selectedDoctor}
            variant="destructive"
            className="flex items-center"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            {t('doctor.overview.delete')}
          </Button>
        </div>
      </div>

      {/* Doctor List */}
      {!doctors || doctors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-foreground-tertiary">
            <UserIcon className="mx-auto h-16 w-16 text-foreground-tertiary mb-4" />
            <h3 className="text-lg font-semibold text-foreground-primary mb-2">
              {t('doctor.overview.noDoctors')}
            </h3>
            <p className="text-sm text-foreground-secondary">
              {t('doctor.overview.noDoctorsDescription')}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {(doctors || []).map((doctor) => (
            <div
              key={doctor.id}
              className={`bg-background-primary border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${selectedDoctor?.id === doctor.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-border-primary hover:border-border-secondary'
                }`}
              onClick={() => handleDoctorClick(doctor)}
              onDoubleClick={() => handleDoctorDoubleClick(doctor)}
            >
              <div className="flex items-start justify-between">
                {/* Left side - Doctor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm ${doctor.isActive
                        ? 'bg-success-100 text-success-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {doctor.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-foreground-secondary">
                      {doctor.title}
                    </span>
                  </div>

                  <div className="text-lg font-semibold text-foreground-primary mb-2">
                    {doctor.user?.firstName} {doctor.user?.lastName}
                  </div>

                  {doctor.bio && (
                    <div className="text-sm text-foreground-secondary mb-3">
                      {doctor.bio.length > 150
                        ? `${doctor.bio.substring(0, 150)}...`
                        : doctor.bio
                      }
                    </div>
                  )}

                  {/* Additional doctor details */}
                  <div className="flex items-center space-x-6 text-sm text-foreground-secondary">
                    {doctor.licenseNumber && (
                      <div>
                        <span className="font-medium">License:</span> {doctor.licenseNumber}
                      </div>
                    )}
                    {doctor.consultationFee && (
                      <div>
                        <span className="font-medium">Fee:</span> LEI {doctor.consultationFee}
                      </div>
                    )}
                    {doctor.specialties && doctor.specialties.length > 0 && (
                      <div>
                        <span className="font-medium">Specialties:</span> {doctor.specialties.map(spec => {
                          const specialtyName = language === 'de' ? spec.specialty.nameDe :
                            language === 'ro' ? spec.specialty.nameRo :
                              spec.specialty.nameEn;

                          const subspecialtyName = spec.subspecialty ?
                            (language === 'de' ? spec.subspecialty.nameDe :
                              language === 'ro' ? spec.subspecialty.nameRo :
                                spec.subspecialty.nameEn) :
                            null;

                          return subspecialtyName ? `${specialtyName} - ${subspecialtyName}` : specialtyName;
                        }).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - License Expiry */}
                {doctor.licenseExpiryDate && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="text-sm text-foreground-tertiary text-right">
                      <div className="font-medium text-foreground-primary">
                        License Expires
                      </div>
                      <div className="text-foreground-tertiary">
                        {formatDate(doctor.licenseExpiryDate)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Details Modal */}
      {showDoctorDetails && (
        <DoctorDetails
          doctor={selectedDoctor}
          isEditing={isEditing}
          onSave={handleSaveDoctor}
          onCancel={handleCancel}
          isLoading={isSaving}
          availableSpecialties={specialties}
          onSpecialtiesUpdate={onSpecialtiesUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteDoctor}
        title={t('doctor.delete.title')}
        message={t('doctor.delete.message')}
        confirmText={t('doctor.delete.confirm')}
        cancelText={t('doctor.delete.cancel')}
      />
    </div>
  );
};

export default DoctorOverview;
