'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/common/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Checkbox } from '@/components/common/Checkbox';
import { FormInputField } from '@/components/common/FormInputField';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Subspecialty } from '@/types';
import { HttpService } from '@/services/httpService';

interface SubspecialtyListProps {
  subspecialties: Subspecialty[];
  specialtyId: number | null;
  onSubspecialtiesUpdate: () => void;
  className?: string;
}

type SubspecialtyFormData = {
  nameDe: string;
  nameEn: string;
  nameRo: string;
  description: string;
  isActive: boolean;
};

const SubspecialtyList: React.FC<SubspecialtyListProps> = ({
  subspecialties,
  specialtyId,
  onSubspecialtiesUpdate,
  className = ''
}) => {
  const { t, language } = useLanguage();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subspecialtyToDelete, setSubspecialtyToDelete] = useState<Subspecialty | null>(null);
  const httpService = HttpService.getInstance();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<SubspecialtyFormData>({
    defaultValues: {
      nameDe: '',
      nameEn: '',
      nameRo: '',
      description: '',
      isActive: true
    }
  });

  const handleEdit = (subspecialty: Subspecialty) => {
    setEditingId(subspecialty.id);
    reset({
      nameDe: subspecialty.nameDe,
      nameEn: subspecialty.nameEn,
      nameRo: subspecialty.nameRo,
      description: subspecialty.description || '',
      isActive: subspecialty.isActive
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    if (!specialtyId) {
      return;
    }
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

  const handleSave = async (data: SubspecialtyFormData, subspecialtyId?: number) => {
    if (!data.nameDe.trim() || !data.nameEn.trim() || !data.nameRo.trim()) {
      return;
    }

    if (!specialtyId) {
      return;
    }

    const subspecialtyData: Partial<Subspecialty> = {
      nameDe: data.nameDe.trim(),
      nameEn: data.nameEn.trim(),
      nameRo: data.nameRo.trim(),
      description: data.description.trim() || null,
      isActive: data.isActive
    };

    if (subspecialtyId) {
      // Update existing subspecialty
      await httpService.upsertSubspecialty({ ...subspecialtyData, id: subspecialtyId } as Subspecialty, specialtyId);
    } else {
      // Create new subspecialty
      await httpService.upsertSubspecialty(subspecialtyData as Subspecialty, specialtyId);
    }

    onSubspecialtiesUpdate();
    handleCancel();
  };

  const handleDeleteClick = (subspecialty: Subspecialty) => {
    setSubspecialtyToDelete(subspecialty);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!subspecialtyToDelete) return;

    try {
      await httpService.deleteSubspecialty(subspecialtyToDelete.id.toString());
      onSubspecialtiesUpdate();
    } finally {
      setDeleteModalOpen(false);
      setSubspecialtyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSubspecialtyToDelete(null);
  };

  if (!specialtyId) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-foreground-tertiary">
          <h3 className="text-lg font-semibold text-foreground-primary mb-2">
            {t('specialtyContainer.selectSpecialty')}
          </h3>
          <p className="text-sm">
            {t('specialtyContainer.selectSpecialtyMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground-primary">
          {t('subspecialty.title')}
        </h3>
        <Button
          onClick={handleAdd}
          disabled={isAdding || editingId !== null}
          size="icon"
          className="h-8 w-8"
          title={t('subspecialty.add')}
        >
          <PlusIcon className="!w-6 !h-6" />
        </Button>
      </div>


      {/* Add New Subspecialty Form */}
      {isAdding && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground-primary mb-3">{t('subspecialty.addNew')}</h4>
          <form onSubmit={handleSubmit((data) => handleSave(data))} className="space-y-3">
            <FormInputField
              label={`${t('subspecialty.name')} (DE)`}
              name="nameDe"
              register={register}
              required
              error={errors.nameDe?.message}
              validation={{ required: 'German name is required' }}
              placeholder="Deutscher Name"
            />
            <FormInputField
              label={`${t('subspecialty.name')} (EN)`}
              name="nameEn"
              register={register}
              required
              error={errors.nameEn?.message}
              validation={{ required: 'English name is required' }}
              placeholder="English Name"
            />
            <FormInputField
              label={`${t('subspecialty.name')} (RO)`}
              name="nameRo"
              register={register}
              required
              error={errors.nameRo?.message}
              validation={{ required: 'Romanian name is required' }}
              placeholder="Nume Română"
            />
            <FormInputField
              label={t('subspecialty.description')}
              name="description"
              register={register}
              error={errors.description?.message}
              placeholder={t('subspecialty.descriptionPlaceholder')}
            />
            <Checkbox
              id="isActive"
              checked={watch('isActive')}
              onChange={(checked) => setValue('isActive', checked)}
              label={t('subspecialty.active')}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                size="icon"
                className="h-8 w-8 border-error-500 text-error-600 hover:bg-error-50 hover:border-error-600"
                title={t('subspecialty.cancel')}
              >
                <XMarkIcon className="!w-6 !h-6 text-error-600" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8"
                title={t('subspecialty.save')}
              >
                <CheckIcon className="!w-6 !h-6" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Subspecialties List */}
      <div className="space-y-2">
        {subspecialties.length === 0 ? (
          <div className="text-center py-8 text-foreground-tertiary">
            <p>{t('subspecialty.noSubspecialties')}</p>
          </div>
        ) : (
          subspecialties.map((subspecialty) => (
            <div
              key={subspecialty.id}
              className="border border-border-primary rounded-lg p-4 hover:border-border-secondary hover:shadow-sm transition-all duration-200"
            >
              {editingId === subspecialty.id ? (
                // Edit Mode
                <form onSubmit={handleSubmit((data) => handleSave(data, subspecialty.id))} className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground-primary">{t('subspecialty.edit')}</h4>
                  <FormInputField
                    label={`${t('subspecialty.name')} (DE)`}
                    name="nameDe"
                    register={register}
                    required
                    error={errors.nameDe?.message}
                    validation={{ required: 'German name is required' }}
                    placeholder="Deutscher Name"
                  />
                  <FormInputField
                    label={`${t('subspecialty.name')} (EN)`}
                    name="nameEn"
                    register={register}
                    required
                    error={errors.nameEn?.message}
                    validation={{ required: 'English name is required' }}
                    placeholder="English Name"
                  />
                  <FormInputField
                    label={`${t('subspecialty.name')} (RO)`}
                    name="nameRo"
                    register={register}
                    required
                    error={errors.nameRo?.message}
                    validation={{ required: 'Romanian name is required' }}
                    placeholder="Nume Română"
                  />
                  <FormInputField
                    label={t('subspecialty.description')}
                    name="description"
                    register={register}
                    error={errors.description?.message}
                    placeholder={t('subspecialty.descriptionPlaceholder')}
                  />
                  <Checkbox
                    id={`isActive-${subspecialty.id}`}
                    checked={watch('isActive')}
                    onChange={(checked) => setValue('isActive', checked)}
                    label={t('subspecialty.active')}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-error-500 text-error-600 hover:bg-error-50 hover:border-error-600"
                      title={t('subspecialty.cancel')}
                    >
                      <XMarkIcon className="!w-6 !h-6 text-error-600" />
                    </Button>
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8"
                      title={t('subspecialty.save')}
                    >
                      <CheckIcon className="!w-6 !h-6" />
                    </Button>
                  </div>
                </form>
              ) : (
                // View Mode
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground-primary">
                        {language === 'de' ? subspecialty.nameDe :
                          language === 'ro' ? subspecialty.nameRo :
                            subspecialty.nameEn}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${subspecialty.isActive
                          ? 'bg-success-100 text-success-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {subspecialty.isActive ? t('subspecialty.active') : t('subspecialty.inactive')}
                      </span>
                    </div>
                    {subspecialty.description && (
                      <p className="text-sm text-foreground-secondary">
                        {subspecialty.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-1 ml-4">
                    <Button
                      onClick={() => handleEdit(subspecialty)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title={t('subspecialty.editTitle')}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(subspecialty)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-error-600 hover:text-error-800 hover:bg-error-50"
                      title={t('subspecialty.deleteTitle')}
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
        title={t('subspecialty.deleteTitle')}
        message={t('subspecialty.deleteConfirm')}
        confirmText={t('subspecialty.delete')}
        cancelText={t('subspecialty.cancel')}
      />
    </div>
  );
};

export default SubspecialtyList;
