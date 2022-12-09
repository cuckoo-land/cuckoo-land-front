import React, { useState } from 'react';
import { useQuery } from 'react-query/react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Button from '@components/button';
import GameRoomContainer from '@components/lobby/gameRoom';
import IconButton from '@components/iconButton';
import ProfileCard from '@components/lobby/profileCard';
import Input from '@components/input';
import Select from '@components/select';
import AnimateModal from '@components/animateModal';
import Layout from '@components/layout';
import { api } from 'api/core/instance';

interface ICreateRoomRequest {
  title: string;
  password?: string;
  type: number;
  maximum: number;
  visibility: boolean;
}

interface ICreateRoomRequestAddUser extends ICreateRoomRequest {
  hostId: string;
}

export interface IGameRoomProps {
  code: string;
  hostId: string;
  id: number;
  maximum: number;
  numOfPeople: number;
  state: string;
  title: string;
  type: string;
  visibility: boolean;
}

const SELECT_PEOPLE = Array.from({ length: 9 }, (_, k) => ({ value: k + 2, text: `${k + 2}명` }));
const GAME_TYPE = [{ value: 'Find the Cuckoo', text: 'Find the Cuckoo' }];

export default function Lobby() {
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenInviteCode, setIsOpenInviteCode] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const { register, handleSubmit, reset } = useForm<ICreateRoomRequest>();

  const { isLoading, data: gameRooms, refetch } = useQuery('gamerooms', () => api.get('/rooms'));
  const onValid = async (data: ICreateRoomRequest) => {
    const dataAddHostId: ICreateRoomRequestAddUser = {
      ...data,
      maximum: Number(data.maximum),
      type: 0,
      hostId: 'bird1',
    };

    await api.post('/rooms', dataAddHostId);

    setIsOpenCreateRoom((props) => !props);
    reset();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };
  const onClick = async () => {
    const response = await api.get(`/rooms/code/${inviteCode}`);
    console.log(response);
    setIsOpenInviteCode((props) => !props);
  };

  return (
    <>
      <Layout seoTitle="게임 로비">
        {/** 메인화면 * */}
        <div className="relative flex flex-col justify-center w-full mt-20 h-fit">
          <div className="flex flex-col items-center justify-center">
            <ProfileCard />
            {/** 버튼모음 * */}
            <div className="flex justify-center space-x-3 max-w-80">
              <div className="w-1/5">
                <Button text="방 만들기" onClick={() => setIsOpenCreateRoom((props) => !props)} />
              </div>
              <div className="w-1/4">
                <Button text="참여코드 입력" onClick={() => setIsOpenInviteCode((props) => !props)} />
              </div>
              <div className="w-1/4">
                <Button text="대기중인 방" />
              </div>
              <label htmlFor="my-drawer-4">
                <IconButton onClick={() => refetch()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </IconButton>
              </label>
            </div>

            {/** 방목록 * */}
            <div
              className="w-full flex flex-col max-h-[65vh] pb-16
           justify-start space-y-3 overflow-y-scroll mt-8 scrollbar-hide">
              {gameRooms?.data.map((gameRoom: IGameRoomProps) => (
                <GameRoomContainer key={gameRoom.id} {...gameRoom} />
              ))}
            </div>
          </div>
        </div>
      </Layout>

      {isOpenCreateRoom ? (
        <AnimateModal isOpen={isOpenCreateRoom} setIsOpen={setIsOpenCreateRoom}>
          <div className="flex flex-col justify-around h-full">
            <div className="flex items-center justify-center w-full text-gray-900">
              <div className="text-3xl font-bold tracking-wider text-white">게임 생성</div>
            </div>
            <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
              <div className="flex items-center justify-between w-full">
                <div className="w-1/4 text-lg font-bold text-white whitespace-nowrap">방 제목</div>
                <div className="w-2/3">
                  <Input type="text" register={register('title', { required: true })} />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="w-1/4 text-lg font-bold text-white whitespace-nowrap">비밀번호</div>
                <div className="w-2/3">
                  <Input
                    type="password"
                    placeholder="비밀번호 없음"
                    register={register('password', { required: true })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="w-1/4 text-lg font-bold text-white whitespace-nowrap">게임유형</div>
                <div className="w-2/3">
                  <Select
                    defaultValue={GAME_TYPE[0].value}
                    options={GAME_TYPE}
                    register={register('type', { required: true })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-lg font-bold text-white whitespace-nowrap">인원 수</div>
                <div className="w-1/4">
                  <Select
                    defaultValue={SELECT_PEOPLE[0].value}
                    options={SELECT_PEOPLE}
                    register={register('maximum', { required: true })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-lg font-bold text-white whitespace-nowrap">비공개 여부</div>
                <div>
                  <input
                    {...register('visibility')}
                    id="checked-checkbox"
                    type="checkbox"
                    className=" w-8 h-8 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 " />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <Button text="취소" onClick={() => setIsOpenCreateRoom((props) => !props)} />
                </div>
                <div>
                  <Button text="생성" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </AnimateModal>
      ) : null}
      {isOpenInviteCode ? (
        <AnimateModal isOpen={isOpenInviteCode} setIsOpen={setIsOpenInviteCode}>
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex items-center justify-center w-full text-gray-900">
              <div className="mb-3 text-3xl font-bold tracking-wider text-white">참여코드 입력</div>
            </div>
            <Image src="/image/cuckoo_character.png" height={130} width={130} />
            <div className="flex items-center justify-center w-full">
              <div className="w-2/3">
                <input
                  value={inviteCode}
                  onChange={onChange}
                  type="text"
                  placeholder="전달받은 코드를 입력해주세요."
                  className='w-full px-3 py-2 text-sm tracking-tighter text-center placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500"'
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-5/6">
              <div>
                <Button text="취소" onClick={() => setIsOpenInviteCode((props) => !props)} />
              </div>
              <div>
                <Button text="생성" onClick={onClick} type="submit" />
              </div>
            </div>
          </div>
        </AnimateModal>
      ) : null}
    </>
  );
}
