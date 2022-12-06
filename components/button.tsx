/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cls } from '@utils/cls';

interface ButtonProps {
  large?: boolean;
  text: string;
  texture?: 'woody' | 'dark' | 'white';
  [key: string]: any;
}

export default function Button({ large = false, onClick, texture = 'white', text, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cls(
        'w-full tracking-tighter font-bold whitespace-nowrap flex justify-center items-center bg-cover bg-no-repeat hover:scale-105 px-4 border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#DC8A39] focus:outline-none',
        large ? 'py-3 text-base' : 'py-2 text-sm ',
        texture === 'white'
          ? 'bg-white_banner text-black'
          : texture === 'woody'
          ? 'bg-woody_banner text-white'
          : texture === 'dark'
          ? 'bg-dark_banner text-white'
          : ''
      )}>
      {text}
    </button>
  );
}
