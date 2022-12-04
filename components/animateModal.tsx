import { Dispatch, SetStateAction } from 'react';
import backgroundImage from 'public/image/modal_background.png';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  width?: string;
  height?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AnimateModal({ children, isOpen, setIsOpen, width = '450px', height = '300px' }: IModalProps) {
  return (
    <>
      {isOpen ? (
        <div
          //   onClick={() => setIsOpen((props) => !props)}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`bg-woody bg-no-repeat bg-cover bg-center p-5 w-[450px]
              animate-modal_appear`}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
