import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  register: UseFormRegisterReturn;
  type: string;
  placeholder?: string;
}

export default function Input({ register, type, placeholder = '' }: IInputProps) {
  return (
    <input
      className="bg-white text-right appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}
