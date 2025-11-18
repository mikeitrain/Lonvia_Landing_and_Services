import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface BaseCurrencyInputFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
  className?: string;
  currency?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface ReactHookFormProps<T extends FieldValues> extends BaseCurrencyInputFieldProps {
  name: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
}

interface ControlledInputProps extends BaseCurrencyInputFieldProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// React Hook Form version
export const CurrencyInputField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  tooltip,
  validation = {},
  className = '',
  currency = 'LEI',
  placeholder,
  disabled = false
}: ReactHookFormProps<T>) => {
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
      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, {
            min: { value: 0, message: 'Amount must be positive' },
            ...(validation || {})
          })}
          className="w-full input-field [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="absolute top-2 right-0 flex items-center pr-3">
          <div className="h-6 border-l border-slate-200 mr-2"></div>
          <span className="h-full text-sm flex justify-center items-center text-slate-700 focus:outline-none">
            {currency}
          </span>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
    </div>
  );
};

// Controlled input version
export const CurrencyInputFieldControlled = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  tooltip,
  className = '',
  currency = 'LEI',
  placeholder,
  disabled = false
}: ControlledInputProps) => {
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
      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={name}
          className="w-full input-field [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="absolute top-2 right-0 flex items-center pr-3">
          <div className="h-6 border-l border-slate-200 mr-2"></div>
          <span className="h-full text-sm flex justify-center items-center text-slate-700 focus:outline-none">
            {currency}
          </span>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
    </div>
  );
};
