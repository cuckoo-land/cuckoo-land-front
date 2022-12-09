import { IGameRoomProps } from '@pages/lobby';

export default function GameRoomContainer({ ...room }: IGameRoomProps) {
  return (
    <div className="bg-woody_banner bg-no-repeat w-80 bg-cover bg-center mx-auto rounded-xl shadow-md cursor-pointer hover:opacity-90 hover:scale-[102%] hover:shadow-xl transition-all">
      <div className="flex flex-col justify-between h-full ">
        <div className="flex justify-between items-center p-5">
          <div className="font-bold text-white text-lg">{room.title}</div>
          <div className="bg-blue-200 rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
            {room.state === 'WAITING' ? '대기중' : '진행중'}
          </div>
        </div>
        <div className="px-5 py-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm text-gray-200">{room.type === 'MAFIA' ? 'Find the Cuckoo' : ''}</div>
            <div className="text-sm text-white">{`(${room.numOfPeople} / ${room.maximum}명)`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
