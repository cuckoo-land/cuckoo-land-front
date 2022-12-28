import { Dispatch, SetStateAction } from 'react';
import { IChatRequest } from './websocketTypes';

export interface IModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  texture?: 'woody' | 'dark' | 'white';
}

export interface IAnimateModalProps extends IModalProps {
  isAnimated: boolean;
}

export interface IChattingModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  chatLog: any;
  handleChat: (data: IChatRequest) => void;
}
