type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface IIconButtonProps extends ButtonTypes {
  onClick: () => void;
  children: React.ReactNode;
}

export default function IconButton({ children, onClick }: IIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 bg-dark_banner bg-no-repeat bg-cover hover:scale-105 rounded-md shadow-xl flex justify-center items-center text-white">
      {children}
    </button>
  );
}
