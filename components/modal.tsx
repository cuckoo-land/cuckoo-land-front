import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  width?: string;
  height?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CommonModal({ children, isOpen, setIsOpen, width = '450px', height = '300px' }: IModalProps) {
  return (
    <Modal
      isOpen={isOpen}
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
          width: `${width}`,
          height: `${height}`,
        },
      }}>
      {children}
    </Modal>
  );
}
