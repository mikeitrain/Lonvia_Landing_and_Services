import React from 'react';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { User } from '../../../types/user';
import { PersonalBasicInfoForm } from '../../user/user-data';
import { AddressForm } from '../../user/address';
import { Demographic } from '../../user/demographic';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';

interface PersonalInformationFormData extends User {
  day: number;
  month: number;
  year: number;
}

interface PersonalInformationProps {
  onSave?: (data: User) => void; // Make onSave optional since we'll use AuthContext
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  onSave,
}) => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      cnp: '',
      day: undefined,
      month: undefined,
      year: undefined,
    },
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

  const onSubmit = async (data: PersonalInformationFormData) => {
    // Process the form data before saving
    const processedData: User = { ...data };
    
    // Convert date of birth from day, month, year to Date object
    if (data.day && data.month && data.year) {
      // Use UTC to avoid timezone issues when the date gets serialized
      processedData.dateOfBirth = new Date(Date.UTC(data.year, data.month - 1, data.day));
    }
    
    // Convert height and weight from string to number
    if (data.height) {
      processedData.height = typeof data.height === 'string' ? parseFloat(data.height) : data.height;
    }
    if (data.weight) {
      processedData.weight = typeof data.weight === 'string' ? parseFloat(data.weight) : data.weight;
    }
    
    // Trim CNP (required)
    processedData.cnp = data.cnp?.trim() || '';
    
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
          country: data.address.country || null,
          block: data.address.block || null,
          entranceNumber: data.address.entranceNumber || null,
          floor: data.address.floor || null,
          apartmentNumber: data.address.apartmentNumber || null,
        };
      } else {
        // If required fields are missing, don't send address (keep existing address if any)
        delete processedData.address;
      }
    }
    
    // Use AuthContext updateUser if no onSave prop provided
    if (onSave) {
      onSave(processedData);
    } else {
      await updateUser(processedData);
    }
  };

  // While user data is loading or not yet available, show a neutral placeholder (avoid confusing error state)
  if (!user) {
    return ;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground-primary">
        {t('profile.personalInformation') || 'Personal Information'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {/* Personal Details */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground-primary">Personal Details</h3>
          <PersonalBasicInfoForm register={register as unknown as UseFormRegister<User>} errors={errors as unknown as FieldErrors<User>} />
        </div>

        {/* Address handled in PersonalBasicInfoForm */}
        <div className="space-y-3 md:space-y-4">
          <AddressForm register={register as unknown as UseFormRegister<User>} errors={errors as unknown as FieldErrors<User>} />
        </div>

        {/* Demographic Section */}
        <div className="space-y-3 md:space-y-4">
          <Demographic register={register} errors={errors} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-border-primary">
          <button
            type="submit"
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 md:py-2 rounded-lg font-semibold transition-colors text-base"
          >
            {t('profile.save') || 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
