import { cls } from '@utils/cls';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  register: UseFormRegisterReturn;
  type: string;
  placeholder?: string;
  textAlign?: 'right' | 'center' | 'left';
}

export default function Input({ register, type, textAlign = 'right', placeholder = '' }: IInputProps) {
  return (
    <input
      className={cls(
        `bg-white text-${textAlign} appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500`
      )}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}
