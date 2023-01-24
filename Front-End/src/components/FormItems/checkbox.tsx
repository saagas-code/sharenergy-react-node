
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types';

interface CheckboxInput {
  label?: string;
  name: string;
  register: UseFormRegister<FieldValues>
}

export const Checkbox = ({
  label,
  name,
  register
}: CheckboxInput) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          aria-describedby={name}
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          {...register(name)}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="text-gray-500 dark:text-gray-300">
          {label}
        </label>
      </div>
    </div>
  );
};
