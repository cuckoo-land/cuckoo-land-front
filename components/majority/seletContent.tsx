import Button from '@components/button';
import { ISendData } from '@utils/stomp';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ISelectContentProps {
  isStart: boolean;
  setIsStart: Dispatch<SetStateAction<boolean>>;
  publish: ({ content }: ISendData, destination: string) => void;
}

export default function SeletContent({ isStart, setIsStart, publish }: ISelectContentProps) {
  const handleSelect = () => {
    // 선택한 이미지를 서버로 전송하는 로직?
    // alert('선택 완료!');
  };

  const onStart = () => {
    publish({ asd: 123 }, '123');
    setIsStart((props) => !props);
  };

  return (
    <main>
      {isStart ? (
        <section className="bg-dark_modal bg-cover bg-center p-4 w-3/4 h-1/2 flex flex-col gap-1 mx-auto shadow-2xl">
          <Image
            onClick={handleSelect}
            className="object-cover rounded-lg hover:opacity-90 cursor-pointer"
            src="/dog.jpeg"
            width="100%"
            height="200px"
          />
          <span className="bg-woody_banner bg-cover bg-center w-1/4 mx-auto font-bold text-3xl text-white text-center">
            VS
          </span>
          <Image
            onClick={handleSelect}
            className="object-cover rounded-lg hover:opacity-90 cursor-pointer"
            src="/cat.jpeg"
            width="100%"
            height="200px"
          />
        </section>
      ) : (
        <section className="bg-dark_modal bg-cover bg-center p-4 w-3/4 h-[400px] flex flex-col justify-center items-center gap-1 mx-auto shadow-2xl">
          <div>
            <Button large text="게임 시작!" onClick={() => onStart()} />
          </div>
        </section>
      )}
    </main>
  );
}
