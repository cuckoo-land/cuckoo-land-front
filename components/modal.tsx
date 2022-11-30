import Modal from 'react-modal';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function CommonModal({ children, isOpen }: IModalProps) {
  return <Modal isOpen={isOpen}>{children}</Modal>;
}
