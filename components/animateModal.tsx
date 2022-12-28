import { cls } from '@utils/cls';
import { IAnimateModalProps } from 'types/common';

export default function AnimateModal({
  children,
  isOpen,
  setIsOpen,
  texture = 'woody',
  isAnimated = true,
}: IAnimateModalProps) {
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            className={cls(
              `bg-no-repeat bg-cover bg-center p-5 w-[480px] h-[350px]`,
              isAnimated ? 'animate-modal_topdown' : '',
              texture === 'woody'
                ? 'bg-woody_modal'
                : texture === 'dark'
                ? 'bg-dark_modal'
                : texture === 'white'
                ? 'bg-white_modal'
                : ''
            )}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
