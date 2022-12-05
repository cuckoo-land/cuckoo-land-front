import { Dispatch, SetStateAction } from 'react';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AnimateModal({ children, isOpen, setIsOpen }: IModalProps) {
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            className={`bg-woody_modal bg-no-repeat bg-cover bg-center p-5 w-[480px] h-[350px]
              animate-modal_appear`}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
