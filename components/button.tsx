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
        'w-full tracking-tighter font-bold whitespace-nowrap flex justify-center items-center bg-cover bg-no-repeat hover:scale-105 text-[#33200d]  px-4 border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#DC8A39] focus:outline-none',
        large ? 'py-3 text-base' : 'py-2 text-sm ',
        texture === 'white'
          ? 'bg-white_banner'
          : texture === 'woody'
          ? 'bg-woody_banner'
          : texture === 'dark'
          ? 'bg-dark_banner'
          : ''
      )}>
      {text}
    </button>
  );
}
