import { Control, UseFormRegister } from "react-hook-form/dist/types";
import { FieldValues, Controller } from 'react-hook-form';
import InputMask  from 'react-input-mask';
import { onlyNumbers } from "../../helpers/Formats/onlyNumbers";

interface InputProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string
  authError?: string
  small?: boolean
  register: UseFormRegister<FieldValues>
  control?: Control
  mask?: string
}

export const Input = ({type, label, name, placeholder, error, authError, small, register, mask, control }: InputProps) => {

  return (
    <div
      className={`${small ? 'w-[47.9%]' : 'w-full'}`}
    >
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {!mask && !control &&
        <input
          type={type}
          id={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg ${error ? 'border-red-500' : (authError ? 'border-red-500' : 'focus:ring-primary-600 focus:border-primary-600')}  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder={placeholder}
          required
          {...register(name)}
        />
      }
      {mask && control &&
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({ field: { value, onChange } }) => (
            <InputMask
              mask={mask}
              maskChar={""}
              placeholder={placeholder}
              className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg ${error ? 'border-red-500' : (authError ? 'border-red-500' : 'focus:ring-primary-600 focus:border-primary-600')}  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              value={value}
              onChange={(e) => {onChange(onlyNumbers(e.target.value))}}
            />
          )}
        />

      }
      <p
       className="text-red-400"
      >
        {error}
        {!error && authError &&
          <>
            {authError}
          </>
        }
      </p>
    </div>
  );
};
