import { UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  value: number | string;
  text: string;
};

interface ISelectProps {
  register: UseFormRegisterReturn;
  defaultValue: number | string;
  options: Option[];
}

export default function Select({ register, defaultValue, options }: ISelectProps) {
  return (
    <select
      defaultValue={defaultValue}
      className="bg-white text-right w-full px-3 py-2 border font-bold tracking-tighter border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      {...register}>
      {options.map(({ value, text }) => (
        <option key={text} value={value} className="appearance-none text-center tracking-tighter">
          {text}
        </option>
      ))}
    </select>
  );
}
