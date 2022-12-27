import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query/react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
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
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useGetGameRooms from '@hooks/useGetGameRooms';

interface ICreateRoomRequest {
  title: string;
  password?: string;
  type: string;
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

// CONSTANT
const SELECT_PEOPLE = Array.from({ length: 6 }, (_, k) => ({ value: k + 5, text: `${k + 5}명` }));
const GAME_TYPE = [
  { value: 0, text: 'Find the Cuckoo' },
  { value: 1, text: "Cuckoo's Pick" },
];

export default function Lobby() {
  const router = useRouter();
  // State Control
  const [isSearch, setIsSearch] = useState(false);

  // Modal Control
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenInviteCode, setIsOpenInviteCode] = useState(false);
  const [isOpenSearchRoom, setIsOpenSearchRoom] = useState(false);

  // Input Control
  const [inviteCode, setInviteCode] = useState('');
  const [serachRoom, setSearchRoom] = useState('');
  const { register, handleSubmit, reset } = useForm<ICreateRoomRequest>();

  // intersection-observer
  const { ref, inView } = useInView();

  // GameRoom Data Fetching
  const { gameRooms, fetchNextPage, isFetchingNextPage, refetch } = useGetGameRooms();
  const { data: searchedGameRooms, refetch: searchedGameRoomsRefetch } = useQuery(
    ['gamerooms'],
    () => api.get(`/auth/rooms/search/${serachRoom}`),
    {
      enabled: !!isSearch,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  // onClick & onChange Method
  const onValid = async (data: ICreateRoomRequest) => {
    const dataAddHostId: ICreateRoomRequestAddUser = {
      ...data,

      visibility: data?.password?.length === 0,
      maximum: Number(data.maximum),
      type: data.type,
      hostId: 'bird1',
    };

    const {
      data: { id },
    } = await api.post('/auth/rooms', dataAddHostId);
    setIsOpenCreateRoom((props) => !props);
    reset();
    if (data?.type === '1') router.push(`/majority/${id}`);
    if (data?.type === '0') router.push(`/gameroom/${id}`);
  };
  const onChangeInviteCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };
  const onChangeSearchRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRoom(e.target.value);
  };
  const onEnterWithInviteCode = async () => {
    const response = await api.get(`/auth/rooms/code/${inviteCode}`);
    if (response?.status === 200) {
      router.push(`/gameroom/${response?.data?.id}`);
      return;
    }
    Swal.fire({
      icon: 'error',
      title: '유효하지 않는 초대코드입니다.',
      text: '초대코드를 확인해주세요.',
      confirmButtonText: '확인',
    });
    setInviteCode('');
    setIsOpenInviteCode((props) => !props);
  };
  const onSearchRoom = () => {
    setIsSearch((props) => !props);
    setIsOpenSearchRoom((props) => !props);
    setTimeout(() => {
      searchedGameRoomsRefetch();
    }, 100);
  };
  const onRefresh = () => {
    setIsSearch(false);
    refetch();
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
              <div className="w-1/4">
                <Button text="방 만들기" onClick={() => setIsOpenCreateRoom((props) => !props)} />
              </div>
              <div className="w-1/3">
                <Button text="참여코드 입력" onClick={() => setIsOpenInviteCode((props) => !props)} />
              </div>
              <label htmlFor="my-drawer-4">
                <IconButton onClick={() => onRefresh()}>
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
              <IconButton onClick={() => setIsOpenSearchRoom((props) => !props)}>
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </IconButton>
            </div>

            {/** 방목록 * */}
            <div
              className="w-full flex flex-col max-h-[65vh] pb-16
           justify-start space-y-3 overflow-y-scroll mt-8 scrollbar-hide">
              {!isSearch &&
                gameRooms?.pages?.map((page) => (
                  <React.Fragment key={uuid()}>
                    {page?.content?.map((gameRoom: IGameRoomProps) => (
                      <GameRoomContainer key={gameRoom.id} {...gameRoom} />
                    ))}
                  </React.Fragment>
                ))}
              {isSearch &&
                searchedGameRooms?.data?.map((gameRoom: IGameRoomProps) => (
                  <GameRoomContainer key={gameRoom.id} {...gameRoom} />
                ))}
              {isFetchingNextPage && !isSearch ? <div>Loading...</div> : <div className="w-full h-10" ref={ref} />}
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
                  <Input type="password" placeholder="비밀번호 없음" register={register('password')} />
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
                  onChange={onChangeInviteCode}
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
                <Button text="입장" onClick={onEnterWithInviteCode} type="submit" />
              </div>
            </div>
          </div>
        </AnimateModal>
      ) : null}
      {isOpenSearchRoom ? (
        <AnimateModal isOpen={isOpenSearchRoom} setIsOpen={setIsOpenSearchRoom}>
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex items-center justify-center w-full text-gray-900">
              <div className="mb-3 text-3xl font-bold tracking-wider text-white">방 이름 검색하기</div>
            </div>
            <Image src="/image/cuckoo_character.png" height={130} width={130} />
            <div className="flex items-center justify-center w-full">
              <div className="w-2/3">
                <input
                  value={serachRoom}
                  onChange={onChangeSearchRoom}
                  type="text"
                  minLength={2}
                  placeholder="검색할 키워드를 검색해주세요.(두 글자 이상)"
                  className='w-full px-3 py-2 text-sm tracking-tighter text-center placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500"'
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-5/6">
              <div>
                <Button text="취소" onClick={() => setIsOpenSearchRoom((props) => !props)} />
              </div>
              <div>
                <Button text="검색" onClick={onSearchRoom} type="submit" />
              </div>
            </div>
          </div>
        </AnimateModal>
      ) : null}
    </>
  );
}
