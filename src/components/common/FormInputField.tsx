import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormInputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  required?: boolean;
  tooltip?: string;
  validation?: RegisterOptions<T>;
  className?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  placeholder?: string;
}

export const FormInputField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  tooltip,
  validation = {},
  className = '',
  type = 'text',
  placeholder
}: FormInputFieldProps<T>) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center gap-1">
        <label className="block text-base font-medium text-heading mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <div className="relative group">
            <span className="cursor-help text-foreground-tertiary hover:text-foreground-secondary">
              <ExclamationCircleIcon className="w-4 h-4" />
            </span>
            <div className="absolute z-10 invisible group-hover:visible bg-neutral-900 text-white text-sm rounded p-2 bottom-full mb-1 w-48">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className="input-field"
      />
      {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
    </div>
  );
};