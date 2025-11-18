'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/common/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Checkbox } from '@/components/common/Checkbox';
import { FormInputField } from '@/components/common/FormInputField';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Specialty } from '@/types';
import { HttpService } from '@/services/httpService';

interface SpecialtyListProps {
  specialties: Specialty[];
  onSpecialtySelect: (specialty: Specialty) => void;
  selectedSpecialty: Specialty | null;
  onSpecialtiesUpdate: () => void;
  className?: string;
}

type SpecialtyFormData = {
  nameDe: string;
  nameEn: string;
  nameRo: string;
  description: string;
  isActive: boolean;
};

const SpecialtyList: React.FC<SpecialtyListProps> = ({
  specialties,
  onSpecialtySelect,
  selectedSpecialty,
  onSpecialtiesUpdate,
  className = ''
}) => {
  const { t, language } = useLanguage();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState<Specialty | null>(null);
  const httpService = HttpService.getInstance();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<SpecialtyFormData>({
    defaultValues: {
      nameDe: '',
      nameEn: '',
      nameRo: '',
      description: '',
      isActive: true
    }
  });

  const handleEdit = (specialty: Specialty) => {
    setEditingId(specialty.id);
    reset({
      nameDe: specialty.nameDe,
      nameEn: specialty.nameEn,
      nameRo: specialty.nameRo,
      description: specialty.description || '',
      isActive: specialty.isActive
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    reset({
      nameDe: '',
      nameEn: '',
      nameRo: '',
      description: '',
      isActive: true
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    reset({
      nameDe: '',
      nameEn: '',
      nameRo: '',
      description: '',
      isActive: true
    });
  };

  const handleSave = async (data: SpecialtyFormData, specialtyId?: number) => {
    if (!data.nameDe.trim() || !data.nameEn.trim() || !data.nameRo.trim()) {
      return;
    }

    const specialtyData: Partial<Specialty> = {
      nameDe: data.nameDe.trim(),
      nameEn: data.nameEn.trim(),
      nameRo: data.nameRo.trim(),
      description: data.description.trim() || null,
      isActive: data.isActive
    };

    if (specialtyId) {
      // Update existing specialty
      await httpService.upsertSpecialty({ ...specialtyData, id: specialtyId } as Specialty);
    } else {
      // Create new specialty
      await httpService.upsertSpecialty(specialtyData as Specialty);
    }

    onSpecialtiesUpdate();
    handleCancel();
  };

  const handleDeleteClick = (specialty: Specialty) => {
    setSpecialtyToDelete(specialty);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!specialtyToDelete) return;

    try {
      await httpService.deleteSpecialty(specialtyToDelete.id.toString());
      onSpecialtiesUpdate();
    } finally {
      setDeleteModalOpen(false);
      setSpecialtyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSpecialtyToDelete(null);
  };

  const handleSpecialtyClick = (specialty: Specialty) => {
    onSpecialtySelect(specialty);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground-primary">
          {t('specialty.title')}
        </h3>
        <Button
          onClick={handleAdd}
          disabled={isAdding || editingId !== null}
          size="icon"
          className="h-8 w-8"
          title={t('specialty.add')}
        >
          <PlusIcon className="!w-6 !h-6" />
        </Button>
      </div>


      {/* Add New Specialty Form */}
      {isAdding && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground-primary mb-3">{t('specialty.addNew')}</h4>
          <form onSubmit={handleSubmit((data) => handleSave(data))} className="space-y-3">
            <FormInputField
              label={`${t('specialty.name')} (DE)`}
              name="nameDe"
              register={register}
              required
              error={errors.nameDe?.message}
              validation={{ required: 'German name is required' }}
              placeholder="Deutscher Name"
            />
            <FormInputField
              label={`${t('specialty.name')} (EN)`}
              name="nameEn"
              register={register}
              required
              error={errors.nameEn?.message}
              validation={{ required: 'English name is required' }}
              placeholder="English Name"
            />
            <FormInputField
              label={`${t('specialty.name')} (RO)`}
              name="nameRo"
              register={register}
              required
              error={errors.nameRo?.message}
              validation={{ required: 'Romanian name is required' }}
              placeholder="Nume Română"
            />
            <FormInputField
              label={t('specialty.description')}
              name="description"
              register={register}
              error={errors.description?.message}
              placeholder={t('specialty.descriptionPlaceholder')}
            />
            <Checkbox
              id="isActive"
              checked={watch('isActive')}
              onChange={(checked) => setValue('isActive', checked)}
              label={t('specialty.active')}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                size="icon"
                className="h-8 w-8 border-error-500 text-error-600 hover:bg-error-50 hover:border-error-600"
                title={t('specialty.cancel')}
              >
                <XMarkIcon className="!w-6 !h-6 text-error-600" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8"
                title={t('specialty.save')}
              >
                <CheckIcon className="!w-6 !h-6" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Specialties List */}
      <div className="space-y-2">
        {specialties.length === 0 ? (
          <div className="text-center py-8 text-foreground-tertiary">
            <p>{t('specialty.noSpecialties')}</p>
          </div>
        ) : (
          specialties.map((specialty) => (
            <div
              key={specialty.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${selectedSpecialty?.id === specialty.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-border-primary hover:border-border-secondary hover:shadow-sm'
                }`}
            >
              {editingId === specialty.id ? (
                // Edit Mode
                <form onSubmit={handleSubmit((data) => handleSave(data, specialty.id))} className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground-primary">{t('specialty.edit')}</h4>
                  <FormInputField
                    label={`${t('specialty.name')} (DE)`}
                    name="nameDe"
                    register={register}
                    required
                    error={errors.nameDe?.message}
                    validation={{ required: 'German name is required' }}
                    placeholder="Deutscher Name"
                  />
                  <FormInputField
                    label={`${t('specialty.name')} (EN)`}
                    name="nameEn"
                    register={register}
                    required
                    error={errors.nameEn?.message}
                    validation={{ required: 'English name is required' }}
                    placeholder="English Name"
                  />
                  <FormInputField
                    label={`${t('specialty.name')} (RO)`}
                    name="nameRo"
                    register={register}
                    required
                    error={errors.nameRo?.message}
                    validation={{ required: 'Romanian name is required' }}
                    placeholder="Nume Română"
                  />
                  <FormInputField
                    label={t('specialty.description')}
                    name="description"
                    register={register}
                    error={errors.description?.message}
                    placeholder={t('specialty.descriptionPlaceholder')}
                  />
                  <Checkbox
                    id={`isActive-${specialty.id}`}
                    checked={watch('isActive')}
                    onChange={(checked) => setValue('isActive', checked)}
                    label={t('specialty.active')}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-error-500 text-error-600 hover:bg-error-50 hover:border-error-600"
                      title={t('specialty.cancel')}
                    >
                      <XMarkIcon className="!w-6 !h-6 text-error-600" />
                    </Button>
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8"
                      title={t('specialty.save')}
                    >
                      <CheckIcon className="!w-6 !h-6" />
                    </Button>
                  </div>
                </form>
              ) : (
                // View Mode
                <div className="flex items-start justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleSpecialtyClick(specialty)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground-primary">
                        {language === 'de' ? specialty.nameDe :
                          language === 'ro' ? specialty.nameRo :
                            specialty.nameEn}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${specialty.isActive
                          ? 'bg-success-100 text-success-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {specialty.isActive ? t('specialty.active') : t('specialty.inactive')}
                      </span>
                    </div>
                    {specialty.description && (
                      <p className="text-sm text-foreground-secondary mb-2">
                        {specialty.description}
                      </p>
                    )}
                    <p className="text-xs text-foreground-tertiary">
                      {specialty.subspecialties?.length || 0} {t('specialty.subspecialtiesCount')}
                    </p>
                  </div>
                  <div className="flex space-x-1 ml-4">
                    <Button
                      onClick={() => handleEdit(specialty)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title={t('specialty.editTitle')}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(specialty)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-error-600 hover:text-error-800 hover:bg-error-50"
                      title={t('specialty.deleteTitle')}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={t('specialty.deleteTitle')}
        message={t('specialty.deleteConfirm')}
        confirmText={t('specialty.delete')}
        cancelText={t('specialty.cancel')}
      />
    </div>
  );
};

export default SpecialtyList;
