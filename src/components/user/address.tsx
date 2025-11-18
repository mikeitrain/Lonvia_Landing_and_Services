import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { User } from '../../types/user';
import { FormInputField } from '../common/FormInputField';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddressFormProps {
  register: UseFormRegister<User>;
  errors: FieldErrors<User>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ register, errors }) => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto space-y-3 md:space-y-4">
      {/* Hidden country field with default value */}
      <input type="hidden" {...register('address.country')} value="Romania" />

      {/* County Row */}
      <FormInputField
        label={t('address.county')}
        name="address.county"
        register={register}
        error={errors.address?.county?.message}
        required
        tooltip={t('address.countyTooltip')}
        validation={{ required: t('address.countyRequired') }}
        className="w-full"
      />

      {/* City and Postal Code Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <FormInputField
          label={t('address.city')}
          name="address.city"
          register={register}
          error={errors.address?.city?.message}
          required
          tooltip={t('address.cityTooltip')}
          validation={{ required: t('address.cityRequired') }}
        />
        <FormInputField
          label={t('address.postalCode')}
          name="address.postalCode"
          register={register}
          error={errors.address?.postalCode?.message}
          required
          tooltip={t('address.postalCodeTooltip')}
          validation={{
            required: t('address.postalCodeRequired'),
            pattern: {
              value: /^[0-9]{6}$/,
              message: t('address.postalCodeInvalid')
            }
          }}
        />
      </div>

      {/* Street and House Number Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <FormInputField
          label={t('address.street')}
          name="address.street"
          register={register}
          error={errors.address?.street?.message}
          required
          tooltip={t('address.streetTooltip')}
          validation={{ required: t('address.streetRequired') }}
        />
        <FormInputField
          label={t('address.houseNumber')}
          name="address.houseNumber"
          register={register}
          error={errors.address?.houseNumber?.message}
          required
          tooltip={t('address.houseNumberTooltip')}
          validation={{
            required: t('address.houseNumberRequired'),
            pattern: {
              value: /^[0-9]{1,9}$/,
              message: t('address.houseNumberInvalid')
            }
          }}
        />
      </div>

      {/* Block, Entrance, Floor, and Apartment Number Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <FormInputField
          label={t('address.block')}
          name="address.block"
          register={register}
          error={errors.address?.block?.message}
          tooltip={t('address.blockTooltip')}
          validation={{
            pattern: {
              value: /^[0-9]{0,9}$/,
              message: t('address.blockInvalid')
            }
          }}
        />
        <FormInputField
          label={t('address.entrance')}
          name="address.entranceNumber"
          register={register}
          error={errors.address?.entranceNumber?.message}
          tooltip={t('address.entranceTooltip')}
          validation={{
            pattern: {
              value: /^[0-9]{0,9}$/,
              message: t('address.entranceInvalid')
            }
          }}
        />
        <FormInputField
          label={t('address.floor')}
          name="address.floor"
          register={register}
          error={errors.address?.floor?.message}
          tooltip={t('address.floorTooltip')}
          validation={{
            pattern: {
              value: /^[0-9]{0,9}$/,
              message: t('address.floorInvalid')
            }
          }}
        />
        <FormInputField
          label={t('address.apartment')}
          name="address.apartmentNumber"
          register={register}
          error={errors.address?.apartmentNumber?.message}
          tooltip={t('address.apartmentTooltip')}
          validation={{
            pattern: {
              value: /^[0-9]{0,9}$/,
              message: t('address.apartmentInvalid')
            }
          }}
        />
      </div>
    </div>
  );
};
