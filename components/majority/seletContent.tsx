import Button from '@components/button';
import { ISendData } from '@utils/stomp';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface ISelectContentProps {
  isStart: boolean;
  onStart: () => void;
}

export default function SeletContent({ isStart, onStart }: ISelectContentProps) {
  const handleSelect = () => {
    // 선택한 이미지를 서버로 전송하는 로직?
    // alert('선택 완료!');
  };

  return (
    <main className="h-[70vh]">
      {isStart ? (
        <section className="flex flex-col w-3/4 h-full gap-1 p-4 mx-auto bg-center bg-cover shadow-2xl bg-dark_modal">
          <Image
            onClick={handleSelect}
            className="object-cover rounded-lg cursor-pointer hover:opacity-90"
            src="/dog.jpeg"
            width="100%"
            height="200px"
          />
          <span className="w-1/4 mx-auto text-3xl font-bold text-center text-white bg-center bg-cover bg-woody_banner">
            VS
          </span>
          <Image
            onClick={handleSelect}
            className="object-cover rounded-lg cursor-pointer hover:opacity-90"
            src="/cat.jpeg"
            width="100%"
            height="200px"
          />
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center w-3/4 h-full gap-1 p-4 mx-auto bg-center bg-cover shadow-2xl bg-dark_modal">
          <div>
            <Button large text="게임 시작!" onClick={() => onStart()} />
          </div>
        </section>
      )}
    </main>
  );
}
