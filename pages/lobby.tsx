export default function Lobby() {
  return (
    <div className="w-full h-screen overflow-y-hidden max-w-xl mx-auto min-h-screen flex justify-center bg-[#F6E3BD]">
      {/** 헤더 * */}
      <div className="bg-white w-full h-12 max-w-xl justify-between text-lg px-10 font-medium fixed text-gray-800 border-b top-0 flex items-center">
        <div className="bg-slate-300 w-32 h-10">LOGO</div>
        <div className="flex justify-around items-center space-x-4">
          <div className="w-10 h-10 bg-slate-300">버튼</div>
          <div className="w-10 h-10 bg-slate-300">버튼</div>
          <div className="w-10 h-10 bg-slate-300">버튼</div>
        </div>
      </div>

      <div className="w-full flex justify-center flex-col bg-slate-200">
        {/** 메인화면 * */}
        <div>
          <div className="w-5/6 h-28 mx-auto bg-white p-3 border rounded-md mb-5">프로필카드</div>
          {/** 버튼모음 * */}
          <div className="w-full flex justify-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-slate-300">버튼</div>
            <div className="w-10 h-10 bg-slate-300">버튼</div>
            <div className="w-10 h-10 bg-slate-300">버튼</div>
          </div>

          {/** 방목록 * */}
          <div className="min-h-screen h-full flex flex-col justify-center space-y-2 overflow-scroll scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((room) => <div className="bg-slate-500 h-24 w-5/6 mx-auto rounded-md p-3">{room}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
