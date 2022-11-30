import Button from '@components/button';
import GameRoomContainer from '@components/lobby/gameRoom';
import IconButton from '@components/iconButton';
import CommonModal from '@components/modal';
import ProfileCard from '@components/lobby/profileCard';
import { useState } from 'react';

export default function Lobby() {
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenInviteCode, setIsOpenInviteCode] = useState(false);

  return (
    <>
      <div className="w-full min-w-md mx-auto h-screen overflow-hidden flex justify-center bg-[#F6E3BD]">
        {/** 헤더 * */}
        <div className=" bg-[#F6E3BD] w-5/6 h-14 mx-auto justify-between text-lg py-5 font-medium fixed text-gray-800 border-b top-0 flex items-center">
          <div className="bg-slate-300 w-32 h-10">LOGO</div>
          <div className="flex justify-around items-center space-x-4">
            <IconButton
              onClick={() => {
                console.log('hi');
              }}>
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
                  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                />
              </svg>
            </IconButton>
            <IconButton onClick={() => console.log('hi')}>
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </IconButton>
            <IconButton onClick={() => console.log('hi')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </IconButton>
          </div>
        </div>

        {/** 메인화면 * */}
        <div className="w-full flex justify-center flex-col h-fit mt-20">
          <div>
            <ProfileCard />
            {/** 버튼모음 * */}
            <div className="w-full flex justify-center space-x-3">
              <div className="w-32 h-10 ">
                <Button text="방 만들기" onClick={() => setIsOpenCreateRoom((props) => !props)} />
              </div>
              <div className="w-32 h-10">
                <Button text="참여코드 검색" onClick={() => setIsOpenInviteCode((props) => !props)} />
              </div>
              <IconButton onClick={() => console.log('hi')}>
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
            </div>

            {/** 방목록 * */}
            <div
              className="flex flex-col h-[600px]
           justify-start space-y-3 overflow-y-scroll mt-4 scrollbar-hide pb-80">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <GameRoomContainer />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOpenCreateRoom ? (
        <CommonModal isOpen={isOpenCreateRoom} setIsOpen={setIsOpenCreateRoom}>
          <div>CreateRoom</div>
        </CommonModal>
      ) : null}
      {isOpenInviteCode ? (
        <CommonModal isOpen={isOpenInviteCode} setIsOpen={setIsOpenInviteCode}>
          <div>InviteCode</div>
        </CommonModal>
      ) : null}
    </>
  );
}
