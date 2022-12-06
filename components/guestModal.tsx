import { ReactNode } from 'react';

interface GuestModalProps {
  title: string;
  content: ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function GuestModal({ title, content, confirmText, cancelText, onConfirm, onCancel }: GuestModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#F6E3BD] border-2 rounded-3xl p-5 opacity-90 max-w-sm flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#573623] mb-2">{title}</h1>
        {content}
        <div className="flex justify-between w-full mt-4">
          <button
            className="w-32 h-10 px-2 border-2 border-[#573623] bg-[#9D6C3D] text-xl font-bold text-white rounded-md"
            type="button"
            onClick={() => onConfirm()}>
            {confirmText}
          </button>
          <button
            className="w-32 h-10 px-2 border-2 border-[#573623] bg-[#9D6C3D] text-xl font-bold text-white rounded-md"
            type="button"
            onClick={() => onCancel()}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
