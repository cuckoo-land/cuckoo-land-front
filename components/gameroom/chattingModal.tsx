import Button from '@components/button';
import Input from '@components/input';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChattingModalProps } from 'types/common';
import { IChatResponse } from 'types/websocketTypes';
import { v4 as uuid } from 'uuid';
import Chat from './chat';

export default function ChattingModal({ isOpen, setIsOpen, chatLog, handleChat }: IChattingModalProps) {
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const router = useRouter();
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  const onValid = ({ message }: { message: string }) => {
    const chatData = { type: 'CHAT', sender: 'cuckoo123', roomId: String(router.query.id), message };
    handleChat(chatData);
    reset();
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
            className="relative bg-no-repeat bg-cover bg-center p-5 w-[400px] h-[500px] bg-woody_modal">
            <div>
              <section className="w-full h-[390px] rounded-md p-3 bg-white shadow-inner">
                {chatLog.map((el: IChatResponse) => (
                  <Chat key={uuid()} message={el.message} sender={el.sender} />
                ))}
              </section>
              <form onSubmit={handleSubmit(onValid)}>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1">
                    <Input type="text" register={register('message')} placeholder="채팅 입력하기" />
                  </div>
                  <div>
                    <Button type="submit" text="전송" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
