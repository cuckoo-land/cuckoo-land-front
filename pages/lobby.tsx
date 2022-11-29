import GameRoomContainer from '@components/game-room';
import ProfileCard from '@components/profile-card';

export default function Lobby() {
  return (
    <div className="w-full min-w-xl mx-auto h-screen overflow-hidden flex justify-center bg-[#F6E3BD]">
      {/** 헤더 * */}
      <div className=" bg-[#F6E3BD] w-full h-14 max-w-xl justify-between text-lg py-5 px-10 font-medium fixed text-gray-800 border-b top-0 flex items-center">
        <div className="bg-slate-300 w-32 h-10">LOGO</div>
        <div className="flex justify-around items-center space-x-4">
          <div className="w-10 h-10 bg-slate-300">친구</div>
          <div className="w-10 h-10 bg-slate-300">랭킹</div>
          <div className="w-10 h-10 bg-slate-300">메뉴</div>
        </div>
      </div>

      {/** 메인화면 * */}
      <div className="w-full flex justify-center flex-col h-fit mt-16">
        <div>
          <ProfileCard />
          {/** 버튼모음 * */}
          <div className="w-full flex justify-center space-x-3">
            <div className="w-32 h-10 bg-slate-300">방 만들기</div>
            <div className="w-32 h-10 bg-slate-300">참여코드 입력</div>
            <div className="w-10 h-10 bg-slate-300">새로고침</div>
          </div>

          {/** 방목록 * */}
          <div
            className="flex flex-col h-[600px]
           justify-start space-y-3 overflow-y-scroll mt-4 scrollbar-hide pb-20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <GameRoomContainer />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
