export default function GameRoomContainer() {
  return (
    <div className="bg-white w-5/6 mx-auto rounded-xl shadow-md cursor-pointer hover:scale-[102%] hover:shadow-xl transition-all">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center p-5">
          <div className="font-bold text-lg text-gray-900">방 이름입니다.</div>
          <div className="bg-blue-200 rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
            대기중
          </div>
        </div>
        <div className="border-solid border-t border-gray-500 px-5 py-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm text-gray-600">Find the Cuckoo</div>
            <div className="text-sm">(1 / 10명)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
