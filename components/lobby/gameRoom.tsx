import AnimateModal from '@components/animateModal';
import Button from '@components/button';
import Input from '@components/input';
import { IGameRoomProps } from '@pages/lobby';
import { api } from 'api/core/instance';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface IPasswordSubmit {
  password: string;
}

export default function GameRoomContainer({ ...room }: IGameRoomProps) {
  const { title, visibility, state, type, numOfPeople, maximum, id } = room;
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<IPasswordSubmit>();
  const router = useRouter();
  const onClick = () => {
    if (!visibility) {
      setIsOpen((props) => !props);
      return;
    }
    if (type === 'MAJORITY') router.push(`/majority/${id}`);
    if (type === 'MAFIA') router.push(`/gameroom/${id}`);
  };
  const onValid = async ({ password }: IPasswordSubmit) => {
    const response = await api.post('/rooms/pwcheck', { password, roomId: id });
    if (response?.status === 200) {
      router.push(`/gameroom/${id}`);
      return;
    }
    Swal.fire({
      icon: 'error',
      title: '비밀번호가 틀렸습니다.',
      text: '비밀번호를 확인해주세요.',
      confirmButtonText: '확인',
    });
  };
  return (
    <>
      <div
        onClick={onClick}
        role="presentation"
        className="bg-woody_banner bg-no-repeat w-80 bg-cover bg-center mx-auto rounded-xl shadow-md cursor-pointer hover:opacity-90 hover:scale-[102%] hover:shadow-xl transition-all">
        <div className="flex flex-col justify-between h-full ">
          <div className="flex justify-between items-center p-5">
            <div className="font-bold text-white text-lg">
              {title}
              <span className=" inline-block text-center ml-3">
                {!visibility ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </span>
            </div>
            <div className="bg-blue-200 rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
              {state === 'WAITING' ? '대기중' : '진행중'}
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-sm text-gray-200">
                {type === 'MAFIA' ? 'Find the Cuckoo' : "Cuckoo's Pick"}
              </div>
              <div className="text-sm text-white">{`(${numOfPeople} / ${maximum}명)`}</div>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <AnimateModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col items-center justify-between h-full">
            <div className="flex items-center justify-center w-full text-gray-900">
              <div className="mb-3 text-3xl font-bold tracking-wider text-white">비밀번호 입력</div>
            </div>
            <Image src="/image/cuckoo_character.png" height={130} width={130} />
            <div className="flex items-center justify-center w-full">
              <div className="w-2/3">
                <Input textAlign="center" placeholder="비밀번호 입력" type="password" register={register('password')} />
              </div>
            </div>
            <div className="flex items-center justify-between w-5/6">
              <div>
                <Button text="취소" onClick={() => setIsOpen((props) => !props)} />
              </div>
              <div>
                <Button text="입장" type="submit" />
              </div>
            </div>
          </form>
        </AnimateModal>
      ) : null}
    </>
  );
}
