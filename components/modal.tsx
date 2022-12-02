import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  width?: string;
  height?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CommonModal({ children, isOpen, setIsOpen, width = '450', height = '300' }: IModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen((props) => !props)}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0, 0.5)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${
              window.innerWidth < 300 ? Number(width) * 0.6 : window.innerWidth < 500 ? Number(width) * 0.7 : width
            }px`,
            height: `${height}px`,
            backgroundColor: '#F6E3BD',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
          },
        }}>
        <div className="relative w-full">{children}</div>
      </Modal>
    </>
  );
}
