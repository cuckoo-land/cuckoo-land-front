import { cls } from '@utils/cls';

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({ large = false, onClick, text, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cls(
        'w-full tracking-tighter whitespace-nowrap flex justify-center items-center bg-[#DC8A39] hover:bg-[#df9c58] text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-[#DC8A39] focus:outline-none',
        large ? 'py-3 text-base' : 'py-2 text-sm '
      )}>
      {text}
    </button>
  );
}
